import React, { useEffect } from "react";
import CarForm from "../components/CarForm";
import Layouts from "../components/Layout";

const EditCar = () => {
  useEffect(() => {
    document.title = "BCR Admin - Edit Car";
  }, []);
  return (
    <>
      <Layouts>
        <CarForm pageName="editCar" />
      </Layouts>
    </>
  );
};

export default EditCar;
