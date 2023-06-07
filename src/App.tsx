import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/login/login-form";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import SalePage from "./pages/sale";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route element={<Layout children={<Outlet />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sale" element={<SalePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
