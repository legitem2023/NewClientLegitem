'use client'
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import drawerReducer from "./drawerSlice"
import viewedReducer from "./viewedSlice"
import prodctTypeReducer from './productTypeSlice'
import activeSliceReducer from './activeSliceIndex';
import sortByReducer from './sortBySlice'
import sortDirectionReducer from './sortDirectionSlice'
import discountedReducer from './discountedSlice'
import collectionItemReducer from './collectionItemSlice'
import modalReducer from './modalSlice'
import newReducer from './newSlice'
import viewedProdReducer from './viewedProdSlice'
import currentPageReducer from './currentPageSlice'

import cookieActiveUserReducer from './cookieActiveUserSlice'
import cookieEmailAddressReducer from './cookieEmailAddressSlice'
import cookieUserLevelReducer from './cookieUserLevelSlice'
import cookieReducer from './cookieSlice'

import messagecountReducer from './messagecountSlice'
import recieverReducer from './recieverSlice'
import orderStageReducer from './orderStageSlice'
import streamingReducer from './streamingSlice'
import ipReducer from './IpSlice'
import suggestedItemReducer from './suggestedItemSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer, // Add category slice to the store
    cart: cartReducer,
    search:searchReducer,
    drawer:drawerReducer,
    viewed:viewedReducer,
    productType:prodctTypeReducer,
    sortBy:sortByReducer,
    sortDirection:sortDirectionReducer,
    discounted:discountedReducer,
    collectionIten:collectionItemReducer,
    modal:modalReducer,
    new:newReducer,
    viewedProd:viewedProdReducer,
    currentPage:currentPageReducer,
    cookie:cookieReducer,
    messagecount:messagecountReducer,
    reciever:recieverReducer,
    orderStage:orderStageReducer,
    streaming:streamingReducer,
    ipAddress:ipReducer,
    suggestedItems:suggestedItemReducer,
    activeIndex:activeSliceReducer
  },
});

export default store;
