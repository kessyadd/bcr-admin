import React from "react";
import CarForm from "../components/CarForm";
import renderWithProvider from "../utils/testUtils";
import { mockSampleCarData } from "./mockSampleCarData";

describe("CarForm Test", () => {
  it("should render correctly", () => {
    renderWithProvider(<CarForm carData={mockSampleCarData} carId={123} pageName="Edit Car" />);
  });
});
