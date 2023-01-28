import React, { useEffect } from "react";
import CarForm from "../components/CarForm";

const AddNewCar = () => {
  useEffect(() => {
    document.title = "BCR Admin - Add New Car";
  }, []);
  return (
    <>
      <CarForm pageName="addCar" />
    </>
  );
};

export default AddNewCar;
