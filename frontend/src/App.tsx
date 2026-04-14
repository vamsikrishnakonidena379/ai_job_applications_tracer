import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Listen for storage changes and custom auth-change events
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" 
      element={ isAuthenticated ? <Navigate to="/dashboard"/> : <Login/>
      } />
      <Route path="/signup"
       element={ isAuthenticated? <Navigate to="/dashboard"/> : <Signup/>} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      {/* Default route - redirect to dashboard if authenticated, otherwise to login */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
      />
      {/* Catch all - redirect to login */}
      <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
}

