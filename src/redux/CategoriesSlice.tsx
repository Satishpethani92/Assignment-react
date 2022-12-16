import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { ProductDto } from "src/services/auth";
import { ReduxState } from "./store";

export declare type CategoryDto = {
  categoryList: string[];
  products: ProductDto[];
  cartList: ProductDto[];
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoryList: [],
    products: [],
    cartList: [],
  } as CategoryDto,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categoryList = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductDto[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductDto>) => {
      state.cartList.push(action.payload);
      console.log("added successfully");
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.cartList.splice(action.payload, 1);
      console.log("remove successfully");
    },
  },
});

export const Category = (state: ReduxState) => {
  return state?.categories.categoryList;
};
export const Products = (state: ReduxState) => {
  return state?.categories.products;
};
export const CartList = (state: ReduxState) => {
  return state?.categories.cartList;
};

export const { setCategories, setProduct, addToCart, removeFromCart } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
