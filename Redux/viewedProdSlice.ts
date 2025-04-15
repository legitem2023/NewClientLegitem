import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SubImageFieldOut = {
  ImagePath: string;
  id: string;
  subImageRelationChild: string | null;
  subImageRelationParent: string | null;
};

type View = {
  [key: string]: any; // Replace `any` with the actual type if known
};

type Ratings = {
      Ratings:string
      productCode:string
      id:string
      Comment:string
      By:string
      Attachment:string
}

type ViewedProduct = {
  TotalRatings: number;
  TotalSoldItems: number;
  productDescription: string;
  Views: View[];
  Ratings: Ratings[];
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
