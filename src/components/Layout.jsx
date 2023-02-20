/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined, CarOutlined, MenuOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Dropdown, Space, Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import Helmet from "react-helmet";
import "../assets/css/layout.css";
import { setPayload } from "../store/features/searchCarsSlice";
import { searchPayloadSearchCars } from "../store/features/searchCarsSlice";
import Search from "antd/es/input/Search";
import Logo2 from "../assets/img/logo-2.png";
import User from "../assets/img/user.png";

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

  return (
    data && (
      <>
        <Helmet>
          <title>{data[data.length - 1].name} - BCR Admin</title>
        </Helmet>

        <Breadcrumb className="breadcrumb-layout" separator=">">
          {data.map((item, i) => {
            if (i !== data.length - 1) {
              return (
                <Breadcrumb.Item key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </Breadcrumb.Item>
              );
            } else return <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
      </>
    )
  );
};

const Layouts = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { payload } = useSelector(searchPayloadSearchCars);

  const items = [
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

  const onSearch = (value) => {
    dispatch(setPayload({ ...payload, name: value, page: 1, category: "" }));
    navigate("/car-list");
  };

  const handleOnchange = (e) => {
    if (e.target.value === "") {
      dispatch(setPayload({ ...payload, name: e.target.value, page: 1 }));
      navigate("/car-list");
    }
  };
  return (
    <Layout>
      <Sider id="sider-layout" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo2} alt="logo" />
        </div>
        <Menu
          className="menu-layout"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["11"]}
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
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="header-layout">
          <Row>
            <Col span={12}>
              {React.createElement(MenuOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>
            <Col className="col-header" span={12}>
              <Search
                className="header-search"
                placeholder="enter car name"
                onSearch={onSearch}
                onChange={handleOnchange}
                enterButton="Search"
              />
              <img className="img-user" src={User} alt="user" />
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    user
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <div className="div-content">
          <Headers />
          <Content>{children}</Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Layouts;
