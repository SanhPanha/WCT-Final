import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "@/lib/constans";
import type { RootState } from "@/redux/store";


const initialState = {
  products: [] as CartProductType[],
  totalPrice: 0 as number,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductType>) => {
   
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
       );
      
       if (existingProductIndex >= 0) {
        
        state.products[existingProductIndex].quantity = (state.products[existingProductIndex].quantity || 0) + 1;
       } else {

        state.products.push({ ...action.payload, quantity: 1 });
       }
      
      state.totalPrice = Number(state.totalPrice) + Number(action.payload.price);
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; quantity?: number }>) => {

      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
         if (action.payload.quantity) {
        
         product.quantity = Math.max(0, (product.quantity || 0) - action.payload.quantity);
         state.totalPrice -= product.price * action.payload.quantity;
         } else {
        
         state.totalPrice -= product.price * (product.quantity || 0);
         state.products = state.products.filter((product) => product.id !== action.payload.id);
         }
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
        state.totalPrice = Number(state.totalPrice) + Number(product.price);
      }
       },

       decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product  && (product.quantity || 0) > 1) {
        product.quantity = (product.quantity || 0) - 1;
         
         state.totalPrice = Number(state.totalPrice) - Number(product.price);
      }
       },
  },
});

// export actions
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;


