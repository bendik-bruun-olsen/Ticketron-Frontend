import React from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogout = () => {
    instance
      .logoutPopup()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
