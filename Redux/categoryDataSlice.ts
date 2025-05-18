// store/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryData {
  __typename: string;
  Name: string;
  icon: string | null;
  id: string;
  image: string;
  status: string | null;
}

interface CategoryState {
  getCategoryData: CategoryData[];
}

const initialState: CategoryState = {
  getCategoryData: [],
};

const categoryDataSlice = createSlice({
  name: 'categoryData',
  initialState,
  reducers: {
    setCategoryData(state, action: PayloadAction<CategoryData[]>) {
      state.getCategoryData = action.payload;
    },
    clearCategoryData(state) {
      state.getCategoryData = [];
    },
  },
});

export const { setCategoryData, clearCategoryData } = categoryDataSlice.actions;
export default categoryDataSlice.reducer;
