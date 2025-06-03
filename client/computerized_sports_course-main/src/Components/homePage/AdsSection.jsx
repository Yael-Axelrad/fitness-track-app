// Components/homePage/AdsSection.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdsSection.css";


const AdsSection = ({ setOpenLogin, setOpenSignUp }) => {
  const navigate = useNavigate();

  return (
    <section className="ads-section">
      <div className="ad-row reverse">
        <img src="/assets/gif3.gif" alt="פרסומת 3" />
        <div className="ad-text">
          <h3>כיף לילדים</h3>
          <p>חוגים מותאמים במיוחד עם הרבה מרץ ותנועה</p>
          <Button
            variant="contained"
            className="ad-button"
            onClick={() => setOpenLogin(true)}
          >
            התחברות
          </Button>
        </div>
      </div>

      <div className="ad-row">
        <img src="/assets/gif2.gif" alt="פרסומת 2" />
        <div className="ad-text">
          <h3>גם כושר, גם ריקוד!</h3>
          <p>תנו לגוף שלכם להשתחרר באווירה סופר אנרגטית</p>
          <Button
            variant="contained"
            className="ad-button"
            onClick={() => setOpenSignUp(true)}
          >
            הצטרפו עכשיו
          </Button>
        </div>
      </div>

      <div className="ad-row reverse">
        <img src="/assets/gif4.gif" alt="פרסומת 4" />
        <div className="ad-text">
          <h3>התחלה חכמה מהבית 🏠</h3>
          <p>בונים שגרה בריאה גם מהבית – עם כל הכלים להצלחה</p>
          <Button
            variant="contained"
            className="ad-button"
            onClick={() => navigate("/custom-start")}
          >
            בואו נתחיל
          </Button>
        </div>
      </div>

      <div className="ad-row">
        <img src="/assets/gif1.gif" alt="פרסומת 1" />
        <div className="ad-text">
          <h3>זזים קדימה בכיף!</h3>
          <p>אימון זה לא משימה – זו שמחה בתנועה!</p>
          <Button
            variant="contained"
            className="ad-button"
            onClick={() => navigate("/ShowTrack")}
          >
            מסלולים
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
