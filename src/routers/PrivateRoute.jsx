import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Auth from "../utils/Auth";

function PrivateRoute() {
  if (Auth.isAuthorization())
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to={"/sign-in"} />;
}

export default PrivateRoute;
