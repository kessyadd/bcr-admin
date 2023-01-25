/* eslint-disable react/prop-types */
import React from "react";
import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default Layout;
