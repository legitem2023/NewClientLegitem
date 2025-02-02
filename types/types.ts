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