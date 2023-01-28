import React from "react";
import { Col, Row } from "antd";
import Car from "../img/car_hero.png";
import FormSignIn from "../components/FormSignIn";
import "../css/signin.css";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App = () => (
  <Row>
    <Col className="car-background" xs={10} sm={10} md={14} lg={16} xl={14}></Col>
    <Col
      className="form"
      xs={14}
      sm={14}
      md={10}
      lg={8}
      xl={10}
      align="middle"
      justify="center"
      style={{ justifyContent: "center" }}
    >
      <FormSignIn />
    </Col>
  </Row>
);
export default App;
