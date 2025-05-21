import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductType {
  id: string;
  Category: string;
  Name: string;
  __typename: string;
}

interface ProductTypesDataState {
  selected: ProductType | null;
}

const initialState: ProductTypesDataState = {
  selected: null,
};

const productTypesDataSlice = createSlice({
  name: 'productTypesData',
  initialState,
  reducers: {
    setProductTypesData(state, action: PayloadAction<ProductType>) {
      state.selected = action.payload;
    },
    clearProductTypesData(state) {
      state.selected = null;
    },
  },
});

export const { setProductTypesData, clearProductTypesData } = productTypesDataSlice.actions;
export default productTypesDataSlice.reducer;
