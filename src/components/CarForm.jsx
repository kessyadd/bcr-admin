/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import APICar from "../apis/APICar";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../assets/css/carForm.css";

const { Title } = Typography;

const CarForm = ({ pageName, carId, carData }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imgVis, setImgVis] = useState(true);

  //get image file data
  const photoFile = (e) => {
    return e?.file;
  };

  //upload props
  const uploadProps = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: (info) => {
      //remove image data from fileList
      if (info.file.status === "removed") {
        setFileList((current) => current.filter((file) => file.status !== "removed"));
        setImgVis(true);
      }
      if (fileList.length > 1) {
        fileList.shift();
      }
      //hide image
      if (fileList.length > 0 && info.file.status !== "removed") {
        setImgVis(false);
      }
    },
    fileList,
    accept: "image",
  };

  //post new car data to API
  const postCarData = async (values) => {
    try {
      console.log("masuk postcar", values);
      const result = await APICar.addNewCar(values);
      message.success("Data mobil berhasil disimpan!");
      console.log(result);
      form.resetFields();
      setFileList([]);
      return result;
    } catch (error) {
      const err = new Error(error);
      console.log(err);
    }
  };

  //update car data to API
  const updateCarData = async (carId, values) => {
    try {
      const result = await APICar.updateCar(carId, values);
      message.success("Data mobil berhasil disimpan!");
      console.log(result);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return result;
    } catch (error) {
      const err = new Error(error);
      console.log(err);
    }
  };

  //if the form data valid
  const onFinish = (values) => {
    if (pageName === "addCar") {
      postCarData(values);
    }
    if (pageName === "editCar") {
      updateCarData(carId, values);
    }
  };

  //if the form data not valid
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setFileList([]);
    navigate("/car-list");
  };

  return (
    <>
      {pageName === "addCar" && <Title level={2}>Add New Car</Title>}
      {pageName === "editCar" && <Title level={2}>Edit Car</Title>}
      <div className="div-form">
        <Form
          form={form}
          className="form-car"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={
            pageName === "editCar"
              ? {
                  name: carData.name,
                  price: carData.price,
                  category: carData.category,
                  image: carData.image,
                  createdAt: carData.createdAt.slice(0, 10),
                  updatedAt: carData.updatedAt.slice(0, 10),
                }
              : {}
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nama/Tipe Mobil"
            name="name"
            colon={false}
            rules={[{ required: true, message: "Masukkan nama/tipe mobil!" }]}
          >
            <Input placeholder="Ketik nama/tipe mobil" />
          </Form.Item>
          <Form.Item
            label="Harga"
            name="price"
            colon={false}
            rules={[{ required: true, message: "Masukkan harga mobil!" }]}
          >
            <InputNumber
              prefix={"Rp"}
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              // pattern="[0-9]"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Kategori"
            name="category"
            colon={false}
            rules={[{ required: true, message: "Pilih kategori mobil!" }]}
          >
            <Select
              placeholder="Pilih kategori"
              style={{ width: "100%" }}
              options={[
                { value: "small", label: "2-4 orang" },
                { value: "medium", label: "4-6 orang" },
                { value: "large", label: "6-8 orang" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Foto"
            name="image"
            colon={false}
            getValueFromEvent={photoFile}
            rules={[{ required: true, message: "Upload foto mobil!" }]}
          >
            <Upload {...uploadProps}>
              {pageName === "editCar" && (
                <img
                  className="img-preview"
                  src={carData.image}
                  alt=""
                  style={{ display: imgVis ? "block" : "none" }}
                />
              )}
              <Button icon={<UploadOutlined />}>Unggah foto</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Dibuat pada" name="createdAt" colon={false}>
            <Input placeholder="-" disabled bordered={false} />
          </Form.Item>
          <Form.Item label="Diperbarui pada" name="updatedAt" colon={false}>
            <Input placeholder="-" disabled bordered={false} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="btn-cancel" type="primary" htmlType="reset" ghost onClick={() => handleCancel()}>
              Batal
            </Button>
            <Button type="primary" htmlType="submit">
              Simpan Data Mobil
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CarForm;
