import React from "react";
import { Col, Row } from "antd";
import Car from "../img/car_hero.png";
import FormSignIn from "../components/FormSignIn";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const App = () => (
  <Row>
    <Col span={6} push={18}>
      <FormSignIn />
    </Col>
    <Col span={18} pull={6}>
      <img src={Car} alt="Car" />
    </Col>
  </Row>
);
export default App;
