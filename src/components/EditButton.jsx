import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const EditButton = ({ carId }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Button
      type="primary"
      icon={<EditOutlined />}
      style={{ backgroundColor: "#5CB85F", width: "120px" }}
      onClick={() => handleClick(`/car-list/edit-car/${carId}`)}
    >
      Edit
    </Button>
  );
};

export default EditButton;
