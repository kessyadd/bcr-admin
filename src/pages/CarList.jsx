import React, { useEffect } from "react";
import AddNewCarButton from "../components/AddNewCarButton";
import { Col, Pagination, Radio, Result, Row, Space, Spin, Typography } from "antd";
import CarCard from "../components/CarCard";
import APICar from "../apis/APICar.js";
import "../assets/css/carList.css";
import { useDispatch, useSelector } from "react-redux";
import { setCar, setCategory, setPage, setTotalCar, setStatus } from "../store/features/searchCarSlice.js";

const { Title } = Typography;

const CarList = () => {
  const state = useSelector((state) => state.searchCar);
  const dispatch = useDispatch();
  const searchName = state.searchName;
  const car = state.car;
  const category = state.category;
  const page = state.page;
  const totalCar = state.totalCar;
  const status = state.status;

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
    dispatch(setCategory(value));
    dispatch(setStatus("loading"));
  };

  const fetchCarData = async () => {
    const res = await APICar.getCarList({
      name: searchName,
      category: category,
      page: page,
      pageSize: 8,
    });
    dispatch(setCar(res.data));
    dispatch(setTotalCar(res.data.count));

    //set fetch status to get car data with new params
    if (res.data.cars.length === 0) {
      dispatch(setStatus("notFound"));
      dispatch(setPage(1));
    } else dispatch(setStatus("done"));
  };

  const handlePagination = (currPage) => {
    dispatch(setPage(currPage));
    dispatch(setStatus("loading"));
  };

  const RenderCarList = () => {
    if (status === "loading") {
      return (
        <Spin id="spin-car" tip="Loading" size="large">
          <div className="content" />
        </Spin>
      );
    }
    if (status === "done") {
      return (
        <>
          <Row>
            <CarCard carData={car.cars} />
          </Row>
          <Row id="row-pagination">
            <Col>
              <Pagination defaultCurrent={page} total={totalCar} defaultPageSize={8} onChange={handlePagination} />
            </Col>
          </Row>
        </>
      );
    }
    if (status === "notFound") {
      return (
        <Result status="error" title="Car not found!" subTitle="Please try another car name or category."></Result>
      );
    }
  };

  useEffect(() => {
    if (status === "loading") {
      fetchCarData().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page, searchName, status]);

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
