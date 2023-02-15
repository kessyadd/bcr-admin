import React from "react";
import { screen } from "@testing-library/react";
import renderWithProvider from "../utils/testUtils.js";
import DeleteButton from "../components/DeleteButton.jsx";

describe("Delete Button Test", () => {
  it("should render button correctly without error", () => {
    renderWithProvider(<DeleteButton />);
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });
});
