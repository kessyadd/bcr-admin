import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carFormData: [],
};

const carFormDataSlice = createSlice({
  name: "carFormData",
  initialState,
  reducers: {
    carForm: (state, action) => {
      state.carFormData.pop();
      state.carFormData.push(action.payload);
    },
  },
});

export const { carForm } = carFormDataSlice.actions;
export default carFormDataSlice.reducer;
