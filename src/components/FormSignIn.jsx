import React from "react";
import { Button, Form, Input } from "antd";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import APIAuth from "../apis/APIAuth";
import grayButton from "../assets/img/gray.png";

const FormSignIn = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };
  const onFinish = async (values) => {
    try {
      await APIAuth.login(values);
      openNotificationWithIcon("success", "Login", "Successfully logged in!");
      let returnTo = "/";
      setTimeout(() => {
        navigate(returnTo);
      }, 2000);
    } catch (error) {
      openNotificationWithIcon("error", "Login", "Login failed");
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <img className="gray-button" src={grayButton} alt="#" />
        <h1>Welcome, Admin BCR</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormSignIn;
