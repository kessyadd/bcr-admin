import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  car: [],
  searchName: "",
  category: "",
  page: 1,
  totalCar: 0,
  status: "loading",
};

const searchCarSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCar: (state, action) => {
      state.car = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCar: (state, action) => {
      state.totalCar = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCar, setSearchName, setCategory, setPage, setTotalCar, setStatus } = searchCarSlice.actions;
export default searchCarSlice.reducer;
