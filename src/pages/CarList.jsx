import React, { useEffect, useState } from "react";
import AddNewCarButton from "../components/AddNewCarButton";
import { Col, message, Pagination, Radio, Row, Space, Typography } from "antd";
import CarCard from "../components/CarCard";
import APICar from "../apis/APICar.js";
import "../assets/css/carList.css";

const { Title } = Typography;

const CarList = () => {
  const [car, setCar] = useState();
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalCar, setTotalCar] = useState(0);

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
      page: page,
      pageSize: 8,
    });
    setCar(res.data);
    setTotalCar(res.data.count);
    setPage(page);
  };

  const handlePagination = (currPage) => {
    setPage(currPage);
    console.log(page);
  };

  const RenderCarList = () => {
    <>
      <Row>{car ? <CarCard carData={car.cars} /> : <p>Loading...</p>}</Row>
      <Row id="row-pagination">
        <Col>
          <Pagination defaultCurrent={1} total={totalCar} defaultPageSize={8} onChange={handlePagination} />
        </Col>
      </Row>
    </>;
  };

  useEffect(() => {
    fetchCarData(category, page).catch(console.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);
  return (
    <>
      <Row id="row-title" align="middle">
        <Col span={12}>
          <Title level={3} style={{ margin: 0 }}>
            List Car
          </Title>
        </Col>
        <Col className="btn-add-new" span={12}>
          <AddNewCarButton />
        </Col>
      </Row>
      <Row id="row-category">
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
      <Row id="row-pagination">
        <Col>
          <Pagination defaultCurrent={1} total={totalCar} defaultPageSize={8} onChange={handlePagination} />
        </Col>
      </Row>
    </>
  );
};

export default CarList;
