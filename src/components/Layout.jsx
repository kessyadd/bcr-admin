/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HomeOutlined, CarOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb, Dropdown, Space } from "antd";
import Logo2 from "../assets/img/logo-2.png";
import { useNavigate } from "react-router-dom";
// import User from "../assets/img/user.png";
// import Search from "antd/es/input/Search";

const { Header, Sider, Content } = Layout;

const Layouts = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Logout
        </a>
      ),
    },
  ];
  const goToDashboard = () => {
    console.log("masuk ke dashboard");
    navigate("/");
  };
  const goToCarPage = () => {
    navigate("/car-list");
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ alignItems: "center", justifyContent: "left", display: "flex", margin: "15px" }}>
          <img src={Logo2} alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
              children: [{ key: "d1", label: "Dashboard" }],
              onClick: { goToDashboard },
            },
            {
              key: "2",
              icon: <CarOutlined />,
              label: "Cars",
              children: [{ key: "21", label: "Car List" }],
              onClick: { goToCarPage },
            },
          ]}
          style={{ height: "100%" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "30px", background: colorBgContainer }}>
          {React.createElement(MenuOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
          {/* <img src={User} alt="user" /> */}
          <Dropdown menu={{ items }} style={{ float: "right" }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                User Name
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <div style={{ margin: "30px" }}>
          <Breadcrumb separator=">" style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              height: "100vh",
            }}
          >
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Layouts;
