import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../assets/css/addNewCarButton.css";

const AddNewCarButton = (carId) => {
  return (
    <Button className="btn-add" type="primary" icon={<PlusOutlined />} href="/car-list/add-car">
      Add New Car
    </Button>
  );
};

export default AddNewCarButton;
