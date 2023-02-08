import { combineReducers } from "@reduxjs/toolkit";
import searchCar from "./searchCarSlice";
import searchCars from "./searchCarsSlice";

const rootReducer = combineReducers({
  searchCar,
  searchCars,
});

export default rootReducer;
