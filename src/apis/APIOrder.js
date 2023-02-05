import adminAxiosInstance from "../configs/axiosInstance";

const APIOrder = {
  //Get order report per month
  getOrderReport: async ({ from, until }) => {
    try {
      const params = {};
      if (from) params["from"] = from;
      if (until) params["until"] = until;
      const chartData = await adminAxiosInstance.get("/order/reports", { params });
      return chartData.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  //Get order list data
  getOrderList: async ({ page, pageSize }) => {
    try {
      const params = {};
      if (page) params["page"] = page;
      if (pageSize) params["pageSize"] = pageSize;
      const response = await adminAxiosInstance.get("/v2/order", { params });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  //Get order details by order id
  getOrderDetails: async (orderId) => {
    const res = await adminAxiosInstance.get(`/order/${orderId}`);
    return res;
  },

  //Change Order Status
  changeOrderStatus: async (orderId) => {
    const res = await adminAxiosInstance.patch(`/order/${orderId}`);
    return res;
  },

  //Delete order by id
  deleteOrder: async (orderId) => {
    const res = await adminAxiosInstance.delete(`/order/${orderId}`);
    return res;
  },

  //Get order chart list data
  getListOrders: async ({ currentPage, pageSize }) => {
    try {
      const params = {};
      if (currentPage) params["page"] = currentPage;
      if (pageSize) params["pageSize"] = pageSize;
      const response = await adminAxiosInstance.get("/v2/order", { params });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getOrderReports: async ({ from, until }) => {
    try {
      const params = {};
      if (from) params["from"] = from;
      if (until) params["until"] = until;
      const response = await adminAxiosInstance.get("/order/reports", { params });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default APIOrder;
