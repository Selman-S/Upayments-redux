import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import categorySlice from "../features/categorySlice/categorySlice";
import productSlice from "../features/productSlice/productSlice";



const store = configureStore({
  reducer: {
    category:categorySlice,
    product:productSlice
  },
});

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootStore> = useSelector