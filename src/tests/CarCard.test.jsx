import React from "react";
import CarCard from "../components/CarCard";
import renderWithProvider from "../utils/testUtils";
import { mockSampleCarData } from "./mockSampleCarData";

describe("Car Card Test", () => {
  it("should render card correctly without error", () => {
    const { container } = renderWithProvider(<CarCard carData={mockSampleCarData} />);
    expect(container).toBeInTheDocument();
  });
});
