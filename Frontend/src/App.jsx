import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}


export default App;
