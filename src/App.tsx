import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AlertContainer } from "react-alert";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import { ToastContainer } from "react-toastify";

declare global {
  interface Window {
    alertContainer?: AlertContainer;
  }
}

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
              <Route path="detail">
                <Route path=":productId">
                  <Route index element={<Detail />} />
                </Route>
              </Route>
              <Route path="product">
                <Route path=":pageId">
                  <Route index element={<Home />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
