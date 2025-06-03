import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoHomeButton.css"; // ודא שהקובץ הזה מיובא 

const GoHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button className="go-home-button" onClick={() => navigate("/")}>
      חזור לדף הבית
    </button>
  );
};

export default GoHomeButton;
