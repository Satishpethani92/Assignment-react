import { createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "./store";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    perPage: 10,
    currentPage: 0,
    lastPage: 0,
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.currentPage;
    },
    setInitialState(state, action) {
      state.currentPage = action.payload.currentPage;
      state.lastPage = action.payload.lastPage;
    },
  },
});

export const PerPage = (state: ReduxState) => {
  return state?.page.perPage;
};
export const CurrentPage = (state: ReduxState) => {
  return state?.page.currentPage;
};
export const { changeCurrentPage, setInitialState } = pageSlice.actions;

export default pageSlice.reducer;
