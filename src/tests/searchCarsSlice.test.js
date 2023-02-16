import axios from "axios";
import APICar from "../apis/APICar";
import searchCarsSlice, { fetchSearchCars, selectSearchCars, setPayload } from "../store/features/searchCarsSlice";
import { mockSampleCarData } from "./mockSampleCarData";

jest.mock("axios");
const mockPayload = {
  category: "",
  page: 1,
  pageSize: 8,
};
const testData = {
  data: { cars: [mockSampleCarData], count: 36, page: 1, pageCount: 5, pageSize: 8, error: "error message" },
};

describe("tests for searchCarSlice", () => {
  it("should set payload data using setPayload reducer correctly", () => {
    const payload = {};
    const afterReducerOperation = searchCarsSlice(payload, setPayload(mockPayload));
    expect(afterReducerOperation).toEqual({
      payload: {
        category: "",
        page: 1,
        pageSize: 8,
      },
    });
  });
  it("should return car data correctly", async () => {
    try {
      axios.get.mockResolvedValueOnce(mockSampleCarData);
      const result = await APICar.getCarList({});
      expect(result).toBe(mockSampleCarData);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toMatch("error");
    }
  });
  it("should handle fetchSearchCars.fulfilled", () => {
    const initialState = searchCarsSlice(undefined, {});
    const newState = searchCarsSlice(initialState, fetchSearchCars.fulfilled(testData));
    expect(newState.data).toEqual(testData.data);
    expect(newState.totalCar).toEqual(testData.data.count);
    expect(newState.status).toEqual("succeeded");
  });
  it("should handle fetchSearchCars.rejected", () => {
    const initialState = searchCarsSlice(undefined, {});
    const newState = searchCarsSlice(initialState, fetchSearchCars.rejected(testData));
    console.log(newState);
    expect(newState.error).toEqual(testData.error);
    expect(newState.status).toEqual("failed");
  });
  it("should handle fetchSearchCars.pending", () => {
    const initialState = searchCarsSlice(undefined, {});
    const newState = searchCarsSlice(initialState, fetchSearchCars.pending(testData));
    console.log(newState);
    expect(newState.error).toEqual(testData.error);
    expect(newState.status).toEqual("loading");
  });
  it("should select the searchCars slice of state", () => {
    const initialState = {
      mockPayload,
    };
    const mockStore = {
      getState: () => initialState,
    };
    const selectedState = selectSearchCars(mockStore.getState());
    expect(selectedState).toEqual(initialState.searchCars);
  });
});
