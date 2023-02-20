import React from "react";
import FormSignIn from "../components/FormSignIn";
import renderWithProvider from "../utils/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import APIAuth from "../apis/APIAuth";

jest.mock("../apis/APIAuth", () => ({
  login: jest.fn(),
}));

describe("FormSignIn", () => {
  it("should render correctly", () => {
    renderWithProvider(<FormSignIn />);
  });
  it("should call onFinish", () => {
    APIAuth.login.mockReturnValue({ success: true, message: "login success" });

    renderWithProvider(<FormSignIn />);

    const inputUsername = screen.getByPlaceholderText("Username");
    const inputPassword = screen.getByPlaceholderText("Password");

    fireEvent.change(inputUsername, { target: { value: "admin" } });
    fireEvent.change(inputPassword, { target: { value: "password" } });

    const button = screen.getByText("Log in");
    console.log({ button });
    fireEvent.click(button);
  });
});
