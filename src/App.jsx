import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./component/main";
import Login from "./component/login";
import Register from "./component/register";
import OtpVerify from "./component/otp";
import ForgotPassword from "./component/forgot-password";
import RequireAuth from "./router/requireauth";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
