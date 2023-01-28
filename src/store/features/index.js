import { combineReducers } from "@reduxjs/toolkit";
import carFormData from "./carFormDataSlice";

const rootReducer = combineReducers({
  carFormData,
});

export default rootReducer;
