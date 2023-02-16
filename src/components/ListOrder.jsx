/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import { Image, Table, Typography } from "antd";
import APIOrder from "../apis/APIOrder";
import "../assets/css/listOrder.css";
import RECTANGLE from "../assets/img/blue-rectangle.png";

const { Title } = Typography;

export function convertUTCtoLocal(utc) {
  if (!utc) return null;
  const date = new Date(utc);
  const formatter = new Intl.DateTimeFormat("id-ID", { year: "numeric", month: "short", day: "numeric" });
  return formatter.format(date);
}

export function convertNumberToLocalCurrency(number) {
  if (!number) return null;
  const formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
  return formatter.format(number);
}

function ListOrdersPage() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const firstRecordNumber = (pageNum, pageLimit, idx) => {
    return (pageNum - 1) * pageLimit + idx;
  };

  React.useEffect(() => {
    APIOrder.getListOrders({ currentPage, pageSize }).then((res) => {
      setData(res);
      setPageSize(res.pageSize);
    });
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (value, obj, index) => {
        return <p key={value}>{firstRecordNumber(currentPage, pageSize, index + 1)}</p>;
      },
    },
    {
      title: "User email",
      dataIndex: "User",
      key: "id",
      render: (user, _, idx) => <p key={idx}>{user.email}</p>,
    },
    { title: "Car", dataIndex: "car", key: "id", render: (val, _, idx) => <p key={idx}>{val || "-"}</p> },
    {
      title: "Start rent",
      dataIndex: "start_rent_at",
      key: "id",
      render: (val, _, idx) => <p key={idx}>{convertUTCtoLocal(val)}</p>,
    },
    {
      title: "Finish rent",
      dataIndex: "finish_rent_at",
      key: "id",
      render: (val, _, idx) => <p key={idx}>{convertUTCtoLocal(val)}</p>,
    },
    {
      title: "Price",
      dataIndex: "total_price",
      key: "id",
      render: (val, _, idx) => <p key={idx}>{convertNumberToLocalCurrency(val)}</p>,
    },
    {
      title: "Status order",
      dataIndex: "status",
      key: "id",
      render: (val, _, idx) => <p key={idx}>{val ? "Berhasil" : "Menunggu"}</p>,
    },
  ];

  return (
    <div className="div-list-order">
      <Title level={3}>Dashboard</Title>
      <p className="p-title">
        <Image src={RECTANGLE} alt="blue" />
        List Order
      </p>
      {data ? (
        <Table
          columns={columns}
          dataSource={data.orders}
          pagination={{
            defaultCurrent: data.page,
            pageSize: data.pageSize,
            total: data.count,
            onChange: (page, pS) => {
              setCurrentPage(page);
              setPageSize(pS);
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ListOrdersPage;
