// redux/productTypeDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductType = {
  id: string;
  Category: string;
  Name: string;
  __typename?: string;
};

interface ProductTypeDataState {
  productTypeData: ProductType[];
}

const initialState: ProductTypeDataState = {
  productTypeData: [],
};

const productTypeDataSlice = createSlice({
  name: 'productTypeData',
  initialState,
  reducers: {
    setProductTypeData: (state, action: PayloadAction<ProductType[]>) => {
      state.productTypeData = action.payload;
    },
    addProductTypeData: (state, action: PayloadAction<ProductType>) => {
      state.productTypeData.push(action.payload);
    },
    clearProductTypeData: (state) => {
      state.productTypeData = [];
    },
  },
});

export const {
  setProductTypeData,
  addProductTypeData,
  clearProductTypeData,
} = productTypeDataSlice.actions;

export default productTypeDataSlice.reducer;
