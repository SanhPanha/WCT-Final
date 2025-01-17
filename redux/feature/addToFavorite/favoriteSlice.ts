import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { FavoriteType } from "@/lib/constans";
import { getDatabase, ref, set, push, get, update, remove } from "firebase/database";
import app from "@/lib/firebase/firebaseConfiguration";

const db = getDatabase(app);

const initialState = {
  favorites: [] as FavoriteType[],
};



// Async thunk to fetch cart data for the current user
export const fetchFavorites = createAsyncThunk(
  "favourite/fetchFavouriteData",
  async (uid: string) => {
    const cartRef = ref(db, `favorites/${uid}`);
    const snapshot = await get(cartRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data || [];
    }
    return [];
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {

    addFavorite: (
      state,
      action: PayloadAction<{ uid: string; product: FavoriteType }>
    ) => {
      const { uid, product } = action.payload;

      const existingProductIndex = state.favorites.findIndex(
        (p) => p.slug === product.slug
      );

      if (existingProductIndex >= 0) {
        state.favorites[existingProductIndex] =
          (state.favorites[existingProductIndex]);
      } else {
        state.favorites.push({ ...product});
      }

      // Update Firebase for the current user
      const favouriteRef = ref(db, `favorites/${uid}/${product.slug}`);
      update(favouriteRef, { ...product}).catch(console.error);
    },
    removeFromFavorite: (
      state,
      action: PayloadAction<{ uid: string; id: string }>
    ) => {
      const { uid, id } = action.payload;
      const index = state.favorites.findIndex((p) => p.slug === id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      }

      // Remove from Firebase for the current user
      const favouriteRef = ref(db, `favorites/${uid}/${id}`);
      remove(favouriteRef).catch(console.error);
    },
  
  },
});

// Export actions
export const { addFavorite, } = favoriteSlice.actions;
export default favoriteSlice.reducer;

// Create selectors
export const selectFavorites = (state: RootState) => state.favorite.favorites;
