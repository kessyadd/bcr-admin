import React, { useEffect } from "react";
import AddNewCarButton from "../components/AddNewCarButton";
import { Col, Pagination, Radio, Result, Row, Space, Spin, Typography } from "antd";
import CarCard from "../components/CarCard";
import "../assets/css/carList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchCars,
  searchPayloadSearchCars,
  selectSearchCars,
  setPayload,
} from "../store/features/searchCarsSlice";

const { Title } = Typography;

const CarList = () => {
  const dispatch = useDispatch();
  const searchCarsData = useSelector(selectSearchCars);
  const payload = useSelector(searchPayloadSearchCars);
  const status = searchCarsData.status;
  const page = searchCarsData.payload.page;
  const totalCar = searchCarsData.totalCar;
  const category = searchCarsData.payload.category;
  const options = [
    {
      label: "All",
      value: "",
    },
    {
      label: "2-4 persons",
      value: "small",
    },
    {
      label: "4-6 persons",
      value: "medium",
    },
    {
      label: "6-8 persons",
      value: "large",
    },
  ];

  const onChange = ({ target: { value } }) => {
    dispatch(setPayload({ ...payload, category: value }));
  };

  const handlePagination = (currPage) => {
    dispatch(setPayload({ ...payload, page: currPage }));
  };

  const RenderCarList = () => {
    if (searchCarsData.data) {
      if (status === "loading") {
        return (
          <Spin id="spin-car" tip="Loading" size="large">
            <div className="content" />
          </Spin>
        );
      }
      if (status === "succeeded" && searchCarsData.data.cars.length > 0) {
        return (
          <>
            <Row>
              <CarCard carData={searchCarsData.data.cars} />
            </Row>
            <Row id="row-pagination">
              <Col>
                <Pagination defaultCurrent={page} total={totalCar} defaultPageSize={8} onChange={handlePagination} />
              </Col>
            </Row>
          </>
        );
      }
      if (status === "failed" || searchCarsData.data.cars.length === 0) {
        return (
          <>
            <Result
              status="error"
              title="Car not found!"
              subTitle="Please try another car name or category or another page."
            ></Result>
            <Row id="row-pagination">
              <Col>
                <Pagination defaultCurrent={page} total={totalCar} defaultPageSize={8} onChange={handlePagination} />
              </Col>
            </Row>
          </>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchSearchCars({ ...payload }));
  }, [dispatch, payload]);

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
      <RenderCarList />
    </>
  );
};

export default CarList;
