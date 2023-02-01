import { Button, message, Modal, Typography } from "antd";
import React from "react";
import APICar from "../apis/APICar";
import { useState } from "react";
import CAR from "../assets/img/car_modal.png";
import { DeleteOutlined } from "@ant-design/icons";

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
      <Button danger icon={<DeleteOutlined />} onClick={showModal} style={{ width: "120px" }}>
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
