import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinishPage.css";
import Congrats from "/assets/congrats.gif";

const FinishPage = () => {
  const navigate = useNavigate();

  return (
    <div className="finish-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-yellow"></div>
      <div className="circle deco-sky"></div>

      <div className="finish-card">
        <img src={Congrats} alt="כל הכבוד" className="finish-gif" />
        <h1 className="finish-title">כל הכבוד!</h1>
        <p className="finish-message">
          סיימת בהצלחה את מסלול ההתעמלות 🎉<br />
          מוזמן לחזור לעמוד הראשי או לצפות במסלולים שעשית
        </p>
        <div className="finish-buttons">
          <button
            className="finish-btn yellow"
            onClick={() => navigate("/")}
          >
            דף הבית
          </button>
          <button
            className="finish-btn pink"
            onClick={() => navigate("/ShowTrack")}
          >
            לצפייה במסלולים
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
