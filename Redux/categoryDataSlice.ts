// store/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  __typename: string;
  Name: string;
  icon: string | null;
  id: string;
  image: string;
  status: string | null;
}

interface CategoryState {
  getCategory: Category[];
}

const initialState: CategoryState = {
  getCategory: [],
};

const categoryDataSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.getCategory = action.payload;
    },
    clearCategories(state) {
      state.getCategory = [];
    },
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categoryDataSlice.reducer;
