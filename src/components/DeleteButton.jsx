import { Button, message, Modal, Typography } from "antd";
import React from "react";
import APICar from "../apis/APICar";
import { useState } from "react";
import CAR from "../assets/img/car_modal.png";
import { DeleteOutlined } from "@ant-design/icons";
import "../assets/css/deleteButton.css";
import { useDispatch, useSelector } from "react-redux";
import { searchPayloadSearchCars, setPayload } from "../store/features/searchCarsSlice";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ carId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const payload = useSelector(searchPayloadSearchCars);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => async (e) => {
    e.preventDefault();
    try {
      const result = await APICar.deleteCar(carId);
      message.success("Car data has been successfully deleted!");
      setIsModalOpen(false);
      dispatch(setPayload({ ...payload, page: 1 }));
      return result;
    } catch (error) {
      const err = new Error(error);
      console.log(err);
    }
  };

  return (
    <>
      <Button className="btn-delete" danger icon={<DeleteOutlined />} onClick={showModal}>
        Delete
      </Button>
      <Modal
        open={isModalOpen}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete(carId)}>
            Yes, Delete!
          </Button>,
        ]}
        closable={false}
      >
        <div className="modal-delete">
          <img src={CAR} alt="car" />
          <h2>Delete Car Data</h2>
          <Text>Once deleted, car data cannot be restored. Are you sure you want to delete car data?</Text>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
