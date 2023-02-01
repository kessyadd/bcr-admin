import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const AddNewCarButton = (carId) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      style={{ backgroundColor: "#0D28A6" }}
      onClick={() => handleClick("/car-list/add-car")}
    >
      Add New Car
    </Button>
  );
};

export default AddNewCarButton;
