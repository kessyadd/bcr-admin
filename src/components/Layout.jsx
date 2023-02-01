/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HomeOutlined, CarOutlined, MenuOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb, Dropdown, Space, Row, Col } from "antd";
import Logo2 from "../assets/img/logo-2.png";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import User from "../assets/img/user.png";
import Helmet from "react-helmet";
import { useEffect } from "react";
// import Search from "antd/es/input/Search";

const { Header, Sider, Content } = Layout;

const dataRouters = [
  {
    key: 0,
    name: "Dashboard",
    path: "/",
  },
  {
    key: 1,
    name: "List Car",
    path: "/car-list",
    child: [
      {
        key: 2,
        name: "Add New Car",
        path: "/add-car",
      },
      {
        key: 3,
        name: "Edit Car",
        path: "/edit-car",
      },
    ],
  },
];

const generateTitle = (routeList, path) => {
  const paths = path.split("/");
  const currentPath = `/${paths[1]}`;
  const childPath = `/${paths.slice(2).join("/")}`;
  let pathList = [];
  let pathListtemp = [];

  const route = routeList.find((val) => val.path === currentPath);

  if (route) {
    pathList.push({ name: route.name, path: route.path });
    if (route.child) {
      pathListtemp = generateTitle(route.child, childPath);
      pathList.push(...pathListtemp);
    }
  }
  return pathList;
};

const Headers = () => {
  const location = useLocation();
  const [data, setData] = useState();

  useEffect(() => {
    setData(generateTitle(dataRouters, location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    data && (
      <>
        <Helmet>
          <title>{data[data.length - 1].name} - BCR Admin</title>
        </Helmet>

        <Breadcrumb separator=">" style={{ marginBottom: "20px" }}>
          {data.map((item, i) => {
            if (i !== data.length - 1) {
              return (
                <Breadcrumb.Item key={i}>
                  <a href={item.path}>{item.name}</a>
                </Breadcrumb.Item>
              );
            } else return <Breadcrumb.Item key={i}>{item.name}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
      </>
    )
  );
};

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
        <a rel="noopener noreferrer" onClick={() => Auth.logOut(navigate)}>
          <Space>
            <LogoutOutlined />
            Logout
          </Space>
        </a>
      ),
    },
  ];

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#0D28A6" }}>
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
              children: [{ key: "11", label: "Dashboard" }],
              onClick: () => handleClick("/"),
            },
            {
              key: "2",
              icon: <CarOutlined />,
              label: "Cars",
              children: [{ key: "21", label: "Car List" }],
              onClick: () => handleClick("/car-list"),
            },
          ]}
          style={{ height: "100%", background: "#0D28A6" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "30px", background: colorBgContainer }}>
          <Row>
            <Col span={12}>
              {React.createElement(MenuOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <img src={User} alt="user" style={{ height: "30px", marginRight: "10px" }} />
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    admin
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <div style={{ margin: "30px" }}>
          <Headers />
          <Content>{children}</Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Layouts;
