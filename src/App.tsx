import "./App.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/login/login-form";
import Layout from "./components/layout/Layout";
import SalePage from "./pages/sale";
import { AuthProvider } from "./shared/contexts/authContext";
import { UtilsProvider } from "./shared/contexts/utilsContext";
import Dashboard from "./pages/dashboard";
import StudentPage from "./pages/students";

function App() {
  return (
    <>
      <AuthProvider>
        <UtilsProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<Layout children={<Outlet />} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/ds-hoc-vien" element={<StudentPage />} />
            </Route>
          </Routes>
        </UtilsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
