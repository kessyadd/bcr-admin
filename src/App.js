import React from "react";
import SetupRouter from "./routers/SetupRouter";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <SetupRouter />
      </Provider>
    </>
  );
}

export default App;
