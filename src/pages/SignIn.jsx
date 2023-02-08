import React from "react";
import { Col, Row } from "antd";
import FormSignIn from "../components/FormSignIn";
import "../assets/css/signin.css";
import { useEffect } from "react";

const SignIn = () => {
  useEffect(() => {
    document.title = "Sign In - BCR Admin";
  }, []);
  return (
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
};
export default SignIn;
