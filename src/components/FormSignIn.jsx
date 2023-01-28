import React from "react";
import { Button, Form, Input } from "antd";
import { notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import APIAuth from "../apis/APIAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import graybutton from "../img/gray.png";

const onFinish = (values) => {
  console.log("Success:", values);
};

const FormSignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await APIAuth.login(Object.fromEntries(formData));
      openNotificationWithIcon("success", "Login", "Successfully login");
      let returnTo = "/";
      const params = new URLSearchParams(search);
      const redirectTo = params.get("return_to");
      if (redirectTo) returnTo += `${redirectTo}`;
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
        <img className="gray-button" src={graybutton} alt="#" />
        <h1>Welcome, Admin BCR</h1>
        <Form.Item
          name="username"
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
          <Button type="primary" htmlType="submit" className="login-form-button" block onSubmit={handleSubmit}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormSignIn;
