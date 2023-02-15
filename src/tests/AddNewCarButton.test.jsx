import React from "react";
import { screen } from "@testing-library/react";
import render from "../utils/testUtils.js";
import AddNewCarButton from "../components/AddNewCarButton";

describe("Add New Car Button Test", () => {
  it("should render button correctly without error", () => {
    render(<AddNewCarButton />);
    expect(screen.getByText(/add new car/i)).toBeInTheDocument();
  });
});
