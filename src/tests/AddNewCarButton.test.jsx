import React from "react";
import { render, screen } from "@testing-library/react";
import AddNewCarButton from "../components/AddNewCarButton";

describe("Button Add New Car Test", () => {
  it("should render button correctly without error", () => {
    render(<AddNewCarButton />);
    expect(screen.getByText(/add new car/i)).toBeInTheDocument();
  });
});
