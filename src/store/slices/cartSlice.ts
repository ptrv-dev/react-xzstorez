import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  size?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [{ _id: '6409dfdec0262397e9abedab', size: '123', quantity: 1 }],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (
      state,
      action: PayloadAction<{ _id: string; size?: string }>
    ) => {
      const item = state.items.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (!item) return;
      item.quantity++;
    },
    decrease: (
      state,
      action: PayloadAction<{ _id: string; size?: string }>
    ) => {
      const item = state.items.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (!item || item.quantity <= 1) return;
      item.quantity--;
    },
    add: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (item) {
        const item = state.items.find(
          (item) =>
            item._id === action.payload._id && item.size === action.payload.size
        );
        if (!item) return;
        item.quantity++;
      } else state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<{ _id: string; size?: string }>) => {
      console.log('IMP', action.payload);
      const product = state.items.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      state.items = state.items.filter((item) => item !== product);
    },
  },
});

export const { increase, decrease, add, remove } = cartSlice.actions;

export default cartSlice.reducer;
