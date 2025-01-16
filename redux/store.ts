import { configureStore } from "@reduxjs/toolkit";
import couterSlice from "./feature/counter/couterSlice";
import cartSlice from "./feature/addToCart/cartSlice";
import favoriteSlice from "./feature/addToFavorite/favoriteSlice";


// Create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: couterSlice,
      cart: cartSlice,
      favorite: favoriteSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
