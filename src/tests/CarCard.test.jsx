import React from "react";
import { render, screen } from "@testing-library/react";
import renderWithProvider from "../utils/testUtils.js";
import CarCard from "../components/CarCard";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

describe("Car Card Test", () => {
  it("should render card correctly without error", () => {
    const car = [
      {
        id: 1,
        name: "Car Name",
        price: 100000,
        image:
          "https://img.freepik.com/free-psd/silver-sedan-car_53876-84522.jpg?w=996&t=st=1676166015~exp=1676166615~hmac=2479b87d9a6ff705dee8c0b3a7d1b34b90bd11b48525d6c384816897b5341120",
        category: "medium",
        updatedAt: "20-02-2023",
      },
    ];
    render(<CarCard carData={car} />);
    expect(screen.getAllByText(/updated at/i)).toBeInTheDocument();
  });
  // it("should have an image", () => {
  //   render(<CarCard />);
  //   const image = screen.getByRole("img", { name: "car-img" });
  //   expect(image).toBeInTheDocument();
  // });
});
