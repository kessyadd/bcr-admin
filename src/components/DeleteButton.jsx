import { Button, Col, message, Modal, Row, Typography } from "antd";
import React from "react";
import APICar from "../apis/APICar";
import { useState } from "react";
import CAR from "../assets/img/car_modal.png";

const { Text } = Typography;

const DeleteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carId = 1144;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (carId) => async (e) => {
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
      <Button type="primary" danger onClick={showModal}>
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
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img src={CAR} alt="car" />
          <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>Menghapus Data Mobil</h2>
          <Text style={{ marginTop: "0px", marginBottom: "20px" }}>
            Setelah dihapus, data mobil tidak dapat dikembalikan. Apakah anda yakin akan menghapus data mobil?
          </Text>
        </div>
      </Modal>
      <style>{`
        .ant-modal-footer {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default DeleteButton;
