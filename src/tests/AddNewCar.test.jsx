import React from "react";
import render from "../utils/testUtils.js";
import AddNewCar from "../pages/AddNewCar";

describe("Add New Car Page Test", () => {
  it("should render button correctly without error", () => {
    const { container } = render(<AddNewCar />);
    expect(container).toBeInTheDocument();
  });
});
