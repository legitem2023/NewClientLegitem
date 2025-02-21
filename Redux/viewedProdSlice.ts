import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*type ViewedProduct = {
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
};*/
type SubImageFieldOut = {
  ImagePath: string;
  id: string;
  subImageRelationChild: string | null;
  subImageRelationParent: string | null;
};

type View = {
  [key: string]: any; // Replace `any` with the actual type if known
};

type Rating = {
  [key: string]: any; // Replace `any` with the actual type if known
};

type ViewedProduct = {
  TotalRatings: number;
  TotalSoldItems: number;
  Views: View[];
  Ratings: Rating[];
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
  price: number; // Changed from `string` to `number` for consistency
  productCode: string;
  productType: string;
  size: string;
  stock: number; // Changed from `string` to `number` for consistency
  subImageFieldOut: SubImageFieldOut; // Updated with proper type
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
