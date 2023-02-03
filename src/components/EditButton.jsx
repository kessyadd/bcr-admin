import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import "../assets/css/editButton.css";

// eslint-disable-next-line react/prop-types
const EditButton = ({ carId }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Button
      className="btn-edit"
      type="primary"
      icon={<EditOutlined />}
      onClick={() => handleClick(`/car-list/edit-car/${carId}`)}
    >
      Edit
    </Button>
  );
};

export default EditButton;
