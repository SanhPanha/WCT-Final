import { configureStore } from "@reduxjs/toolkit";
import couterSlice from "./feature/counter/couterSlice";
import tokenSlice from "./feature/auth/authSlice";
import cartSlice from "./feature/addToCart/cartSlice";
import favoriteSlice from "./feature/addToFavorite/favoriteSlice";
import userSlice from "./feature/userProfile/userSlice";

// Create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: couterSlice,
      auth: tokenSlice,
      cart: cartSlice,
      userProfile: userSlice,
      favorite: favoriteSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
