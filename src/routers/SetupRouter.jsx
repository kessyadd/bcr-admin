import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewCar from "../pages/AddNewCar";
import CarList from "../pages/CarList";
import Dashboard from "../pages/Dashboard";
import EditCar from "../pages/EditCar";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/car-list">
            <Route index element={<CarList />} />
            <Route path="/car-list/add-car" element={<AddNewCar />} />
            <Route path="/car-list/edit-car/:carId" element={<EditCar />} />
          </Route>
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SetupRouter;
