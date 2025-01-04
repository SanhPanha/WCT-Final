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

// Async thunk to fetch cart data from Firebase
export const fetchCartData = createAsyncThunk("cart/fetchCartData", async () => {
  const cartRef = ref(db, "carts");
  const snapshot = await get(cartRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return data || [];
  }
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductType>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity =
          (state.products[existingProductIndex].quantity || 0) + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // Update Firebase
      const productRef = ref(db, `carts/${action.payload.id}`);
      update(productRef, { ...action.payload, quantity: 1 }).catch(console.error);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index >= 0) {
        state.products.splice(index, 1);
      }

      // Remove from Firebase
      const productRef = ref(db, `carts/${action.payload.id}`);
      remove(productRef).catch(console.error);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 0) + 1;

        // Update Firebase
        const productRef = ref(db, `carts/${product.id}`);
        update(productRef, { quantity: product.quantity }).catch(console.error);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product && (product.quantity || 0) > 1) {
        product.quantity = (product.quantity || 0) - 1;

        // Update Firebase
        const productRef = ref(db, `carts/${product.id}`);
        update(productRef, { quantity: product.quantity }).catch(console.error);
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Export selectors
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) =>
  state.cart.products.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

export default cartSlice.reducer;
