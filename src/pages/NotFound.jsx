import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";

const NotFound = () => {
  const navigate = useNavigate();
  const authStatus = Auth.isAuthorization();

  //set button text
  const btnText = () => {
    if (authStatus) return "Back to Dashboard";
    else return "Back to Sign In";
  };

  const handleOnClick = () => {
    navigate("/");
  };
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => handleOnClick()}>
            {btnText()}
          </Button>
        }
        style={{ marginTop: "6rem" }}
      />
    </>
  );
};

export default NotFound;
