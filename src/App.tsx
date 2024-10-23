// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage /> {/* Protected Home Page */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
