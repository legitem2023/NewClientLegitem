import { ReactComponentElement, ReactElement, ReactNode } from "react"

export type CartItem = {
    id: string, // You can change this to number if IDs are numeric
    productCode: string,
    image:string,
    name: string,
    color:string,
    size:string,
    price: number,
    quantity: number
  }
  
export type ReusableCenterLayoutProps = {
        child1:() => ReactElement,
        child2:() => ReactElement,
        child3:() => ReactElement,
        child4:() => ReactElement,
        children?: ReactNode; // Optional
}

export type ReusableMainLayoutProps = {
  childA:() => ReactElement,
  childB:() => ReactElement,
  childC:() => ReactElement,
  children?: ReactNode; // Optional
}


  export type PropsQuantity = {
    id:string,
    qty:number
  }


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

export type ViewedProduct = {
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

export type SuggestedItems = {
  brandname: string;
  category: string;
  id: string;
  name: string;
  productCode: string;
  productType: string;
};

  export type CartItemWithFunc = {
    id: string, // You can change this to number if IDs are numeric
    productCode: string,
    image:string,
    name: string,
    color:string,
    size:string,
    price: number,
    quantity: number,
    clearItem:() => void,
    removeItem: () => void
    // Add any other properties that your cart items might have
  }
