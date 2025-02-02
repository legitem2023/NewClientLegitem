import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewedProduct = {
  TotalRatings: number;
  TotalSoldItems: number;
  Views: Array<{
    [key: string]: any; // Replace `any` with the actual type of the objects in the `Views` array if known
  }>;
  Ratings: Array<{
    [key: string]: any; // Replace `any` with the actual type of the objects in the `Views` array if known
  }>;
  agentEmail: string;
  brandname: string;
  category: string;
  color: string;
  dateCreated: string; // Assuming timestamp is represented as a string
  dateUpdated: string; // Assuming timestamp is represented as a string
  discount: number;
  id: string;
  model: string | null;
  name: string;
  price: string; // Consider changing to `number` if price is numeric
  productCode: string;
  productType: string;
  size: string;
  stock: string; // Consider changing to `number` if stock is numeric
  subImageFieldOut: unknown; // Replace `unknown` with the actual type if known
  thumbnail: string | null;
};

interface ViewedState {
  viewedProd: ViewedProduct[];
}

const initialState: ViewedState = {
  viewedProd: [],
};

const viewedProdSlice = createSlice({
  name: "viewedProd",
  initialState,
  reducers: {
    setViewedProd: (state, action: PayloadAction<ViewedProduct[]>) => {
      state.viewedProd = action.payload;
    },
  },
});

export const { setViewedProd } = viewedProdSlice.actions;

export default viewedProdSlice.reducer;
