import React, { useEffect, useState } from "react";
import APICar from "../apis/APICar";
import CarForm from "../components/CarForm";

const EditCar = () => {
  const [car, setCar] = useState();
  const [carIds, setCarIds] = useState();

  useEffect(() => {
    const url = window.location.href;
    const urlSplit = url.split("/");
    const id = urlSplit[urlSplit.length - 1];

    const fetchData = async () => {
      const res = await APICar.getCarById(id);
      setCar(res.data);
      setCarIds(id);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  return <>{car ? <CarForm pageName="editCar" carId={carIds} carData={car} /> : <p>Loading...</p>}</>;
};

export default EditCar;
