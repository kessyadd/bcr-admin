import React, { useEffect, useState } from "react";
import AddNewCarButton from "../components/AddNewCarButton";
import { Col, Row, Typography } from "antd";
import CarCard from "../components/CarCard";
import APICar from "../apis/APICar.js";

const { Title } = Typography;

const CarList = () => {
  const [car, setCar] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await APICar.getCarList({
        name: "",
        category: "",
        isRented: "",
        minPrice: "",
        maxPrice: "",
        page: "",
        pageSize: "",
      });
      setCar(res.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  // const carId = "";
  return (
    <>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Title level={3} style={{ margin: 0 }}>
            List Car
          </Title>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <AddNewCarButton />
        </Col>
      </Row>
      <Row>{car ? <CarCard carData={car.cars} /> : <p>Loading...</p>}</Row>
    </>
  );
};

export default CarList;
