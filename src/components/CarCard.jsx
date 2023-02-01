import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Card, Col, Space, Typography } from "antd";
import { TeamOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// eslint-disable-next-line react/prop-types
const CarCard = ({ carData }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return carData.map((car) => (
    <Col key={car.id} span={6} style={{ marginBottom: "30px" }}>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={car.image} style={{ height: "14rem" }} />}
        actions={[<DeleteButton key="delete" carId={car.id} />, <EditButton key="edit" carId={car.id} />]}
      >
        <Title level={5}>{car.name}</Title>
        <Title level={4} style={{ marginTop: "5px", marginBottom: "5px" }}>
          {formatter.format(car.price)}
        </Title>
        <Space>
          <TeamOutlined />
          {car.category === "small" && <Text>2-4 Orang</Text>}
          {car.category === "medium" && <Text>4-6 Orang</Text>}
          {car.category === "large" && <Text>6-8 Orang</Text>}
        </Space>
        <br />
        <Space>
          <ClockCircleOutlined />
          <Text>Updated at {car.updatedAt.slice(0, 10)} </Text>
        </Space>
      </Card>
    </Col>
  ));
};

export default CarCard;
