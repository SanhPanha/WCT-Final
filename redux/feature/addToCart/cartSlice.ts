import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "@/lib/constans";
import type { RootState } from "@/redux/store";
import { getDatabase, ref, set, update, remove, get } from "firebase/database";
import app from "@/lib/firebase/firebaseConfiguration";

const db = getDatabase(app);

const initialState = {
  products: [] as CartProductType[],
  totalPrice: 0,
};

// Async thunk to fetch cart data for the current user
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (uid: string) => {
    const cartRef = ref(db, `carts/${uid}`);
    const snapshot = await get(cartRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data || [];
    }
    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ uid: string; product: CartProductType }>
    ) => {
      const { uid, product } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (p) => p.slug === product.slug
      );

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity =
          (state.products[existingProductIndex].quantity || 0) + 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      // Update Firebase for the current user
      const productRef = ref(db, `carts/${uid}/${product.slug}`);
      update(productRef, { ...product, quantity: 1 }).catch(console.error);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ uid: string; id: string }>
    ) => {
      const { uid, id } = action.payload;
      const index = state.products.findIndex((p) => p.slug === id);
      if (index >= 0) {
        state.products.splice(index, 1);
      }

      // Remove from Firebase for the current user
      const productRef = ref(db, `carts/${uid}/${id}`);
      remove(productRef).catch(console.error);
    },
  
  },
});

// Export actions
export const {
  addToCart,
} = cartSlice.actions;

// Export selectors
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) =>
  state.cart.products.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),
    0
  );

export default cartSlice.reducer;
