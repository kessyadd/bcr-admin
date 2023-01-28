import React, { useEffect } from "react";
import CarForm from "../components/CarForm";

const EditCar = () => {
  useEffect(() => {
    document.title = "BCR Admin - Edit Car";
  }, []);
  return (
    <>
      <CarForm pageName="editCar" />
    </>
  );
};

export default EditCar;
