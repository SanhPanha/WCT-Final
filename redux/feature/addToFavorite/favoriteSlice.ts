import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { FavoriteType } from "@/lib/constans";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "@/lib/firebase/firebaseConfiguration";

const db = getDatabase(app);

const initialState = {
  favorites: [] as FavoriteType[],
};

// Async thunk to fetch cart data from Firebase
export const fetchFavorites = createAsyncThunk("favorite/fetchFavorites", async () => {
  const favoritesRef = ref(db, "favorites");
  const snapshot = await get(favoritesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data) || [];
  }
  return [];
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      const exists = state.favorites.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);

        // Store in Firebase
        const favoriteRef = ref(db, "favorites");
        set(favoriteRef, state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );

      // Update Firebase
      const favoriteRef = ref(db, "favorites");
      set(favoriteRef, state.favorites);
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

// Create selectors
export const selectFavorites = (state: RootState) => state.favorite.favorites;
