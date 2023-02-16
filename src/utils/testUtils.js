import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/features";
import { Provider } from "react-redux";

export default function renderWithProvider(
  children,
  { preloadedState = {}, store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return render(<Wrapper>{children}</Wrapper>);
}
