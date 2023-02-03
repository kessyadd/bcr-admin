import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "../assets/css/addNewCarButton.css";

const AddNewCarButton = (carId) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Button className="btn-add" type="primary" icon={<PlusOutlined />} onClick={() => handleClick("/car-list/add-car")}>
      Add New Car
    </Button>
  );
};

export default AddNewCarButton;
