import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import renderWithProvider from "../utils/testUtils.js";
import EditButton from "../components/EditButton.jsx";

describe("Edit Button Test", () => {
  it("should render button correctly without error", () => {
    renderWithProvider(<EditButton />);
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });
  it("should call handleClick callback", () => {
    const handleClick = jest.fn();
    renderWithProvider(<EditButton />);
    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);
    expect(handleClick).toHaveBeenCalled();
  });
});
