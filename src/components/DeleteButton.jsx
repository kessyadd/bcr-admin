import { Button, message, Modal, Typography } from "antd";
import React from "react";
import APICar from "../apis/APICar";
import { useState } from "react";
import CAR from "../assets/img/car_modal.png";
import { DeleteOutlined } from "@ant-design/icons";
import "../assets/css/deleteButton.css";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ carId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => async (e) => {
    e.preventDefault();
    try {
      console.log("masuk delete", carId);
      const result = await APICar.deleteCar(carId);
      message.success("Data mobil berhasil dihapus!");
      setIsModalOpen(false);
      console.log(result);
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
            Batalkan
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete(carId)}>
            Ya, Hapus!
          </Button>,
        ]}
        closable={false}
      >
        <div className="modal-delete">
          <img src={CAR} alt="car" />
          <h2>Menghapus Data Mobil</h2>
          <Text>
            Setelah dihapus, data mobil tidak dapat dikembalikan. Apakah anda yakin akan menghapus data mobil?
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
