'use client'
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import nameSortReducer from './nameSortSlice';
import categoryDataReducer from './categoryDataSlice';
import productTypeDataReducer from './productTypeDataSlice';
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import drawerReducer from "./drawerSlice"
import viewedReducer from "./viewedSlice"
import prodctTypeReducer from './productTypeSlice'
import activeIndexReducer from './activeIndexSlice';
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
import messageNotificationReducer from './messageNotificationSlice';
import messagecountReducer from './messagecountSlice'
import recieverReducer from './recieverSlice'
import orderStageReducer from './orderStageSlice'
import streamingReducer from './streamingSlice'
import ipReducer from './IpSlice'
import suggestedItemReducer from './suggestedItemSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer, // Add category slice to the store
    categoryData: categoryDataReducer,
    productTypeData:productTypeDataReducer,
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
    messageNotification:messageNotificationReducer,
    reciever:recieverReducer,
    orderStage:orderStageReducer,
    streaming:streamingReducer,
    ipAddress:ipReducer,
    suggestedItems:suggestedItemReducer,
    activeIndex:activeIndexReducer,
    sort:nameSortReducer
  },
});

export default store;
