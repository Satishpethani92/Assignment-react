import { useDispatch } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer, { CategoryDto } from "./CategoriesSlice";
import pageReducer from "./pageAction";

export declare type ReduxState = {
  categories: CategoryDto;
  page: any;
};

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    page: pageReducer,
  },
});
