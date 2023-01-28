import React, { useEffect } from "react";
import CarForm from "../components/CarForm";
import Layouts from "../components/Layout";

const AddNewCar = () => {
  useEffect(() => {
    document.title = "BCR Admin - Add New Car";
  }, []);
  return (
    <>
      <Layouts>
        <CarForm pageName="addCar" />
      </Layouts>
    </>
  );
};

export default AddNewCar;
