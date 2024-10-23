// pages/HomePage.tsx
import React from "react";
import Navbar from "../components/Navbar";

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Home Page</h2>
      <p>You are successfully logged in!</p>
    </div>
  );
};

export default HomePage;
