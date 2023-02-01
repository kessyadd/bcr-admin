import React, { useEffect, useState } from "react";
import AddNewCarButton from "../components/AddNewCarButton";
import { Col, Radio, Row, Space, Typography } from "antd";
import CarCard from "../components/CarCard";
import APICar from "../apis/APICar.js";

const { Title } = Typography;

const CarList = () => {
  const [car, setCar] = useState();
  const [category, setCategory] = useState("");

  const options = [
    {
      label: "All",
      value: "",
    },
    {
      label: "2-4 people",
      value: "small",
    },
    {
      label: "4-6 people",
      value: "medium",
    },
    {
      label: "6-8 people",
      value: "large",
    },
  ];

  const onChange = ({ target: { value } }) => {
    fetchCarData(value);
    setCategory(value);
  };

  const fetchCarData = async (category) => {
    const res = await APICar.getCarList({
      category: category,
      page: "",
      pageSize: "",
    });
    setCar(res.data);
  };

  useEffect(() => {
    fetchCarData(category).catch(console.error);
  }, [category]);
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
      <Row style={{ marginBottom: "40px" }}>
        <Col>
          <Space>
            <Radio.Group
              options={options}
              onChange={onChange}
              value={category}
              optionType="button"
              buttonStyle="solid"
            />
          </Space>
        </Col>
      </Row>
      <Row>{car ? <CarCard carData={car.cars} /> : <p>Loading...</p>}</Row>
    </>
  );
};

export default CarList;
