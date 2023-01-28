/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import APICar from "../apis/APICar";
import { Typography } from "antd";

const { Title } = Typography;

const CarForm = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

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
      }
      if (fileList.length > 1) {
        fileList.shift();
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
  //if the form data valid
  const onFinish = (values) => {
    postCarData(values);
  };

  //if the form data not valid
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {props.pageName === "addCar" && <Title level={2}>Add New Car</Title>}
      {props.pageName === "editCar" && <Title level={2}>Edit Car</Title>}
      <div style={{ backgroundColor: "white", paddingTop: "50px", paddingBottom: "50px" }}>
        <Form
          form={form}
          name="add-car"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
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
            <Button
              type="primary"
              htmlType="reset"
              ghost
              style={{ marginRight: "10px" }}
              onClick={() => setFileList([])}
            >
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
