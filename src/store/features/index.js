import { combineReducers } from "@reduxjs/toolkit";
import searchCars from "./searchCarsSlice";

const rootReducer = combineReducers({
  searchCars,
});

export default rootReducer;
