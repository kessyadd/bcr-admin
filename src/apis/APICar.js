import adminAxiosInstance from "../../configs/axiosInstance";

const APICar = {
  //Get car list
  getCarList: async ({ name, category, isRented, minPrice, maxPrice, page, pageSize }) => {
    const params = {};
    if (name) params["name"] = name;
    if (category) params["category"] = category;
    if (isRented) params["isRented"] = isRented;
    if (minPrice) params["minPrice"] = minPrice;
    if (maxPrice) params["maxPrice"] = maxPrice;
    if (page) params["page"] = page;
    if (pageSize) params["pageSize"] = pageSize;
    const res = await adminAxiosInstance.get("/v2/car", { params });
    return res;
  },

  //Add new car
  addNewCar: async ({ name, category, price, status, image }) => {
    const params = { name, category, price, status, image };
    const res = await adminAxiosInstance.post("/car", { params });
    return res;
  },

  //Get car data by id
  getCarById: async (carId) => {
    const res = await adminAxiosInstance.get(`/car${carId}`);
    return res;
  },

  //Update car data by id
  updateCar: async ({ carId, name, category, price, status, image }) => {
    const params = {};
    if (name) params["name"] = name;
    if (category) params["category"] = category;
    if (price) params["price"] = price;
    if (status) params["status"] = status;
    if (image) params["image"] = image;
    const res = await adminAxiosInstance.put(`/car${carId}`, { params });
    return res;
  },

  //Delete car by id
  deleteCar: async (carId) => {
    const res = await adminAxiosInstance.delete(`/car${carId}`);
    return res;
  },
};

export default APICar;
