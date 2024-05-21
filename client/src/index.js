import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./utils/AuthProvider";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastSetUp } from "./utils/ToastSetUp";
import './style/index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastSetUp>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ToastSetUp>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
