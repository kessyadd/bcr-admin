import React from "react";
import { render, screen } from "@testing-library/react";
import CarCard from "../components/CarCard";

describe("Car Card Test", () => {
  it("should render card correctly without error", () => {
    const { container } = render(<CarCard />);
    expect(container).toBeInTheDocument();
  });
  it("should have an image", () => {
    render(<CarCard />);
    const image = screen.getByRole("img", { name: "car-img" });
    expect(image).toBeInTheDocument();
  });
});
