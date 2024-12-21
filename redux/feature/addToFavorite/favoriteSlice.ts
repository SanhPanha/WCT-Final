import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { FavoriteType } from "@/lib/constans";

const initialState = {
  favorites: [] as FavoriteType[],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      const exists = state.favorites.some(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite } = favoriteSlice.actions;

// Export reducer
export default favoriteSlice.reducer;

// Create selectors
export const selectFavorites = (state: RootState) => state.favorite.favorites;
