import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/users/usersSlice";
import { clearTrack } from "../../features/trackExercise/TrackSlice"; // ודאי שזה הנתיב הנכון

import "./GymLandingPage.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
} from "@mui/material";
import { Dumbbell, Sparkles } from "lucide-react";
import LoginPage from "../../features/users/LoginPage";
import SignUp from "../../features/users/SighUp";

const classesData = [
  {
    title: "חוג יוגה לנשים",
    desc: "שיפור גמישות ונשימה באווירה נשית 🌸",
    color: "pink",
  },
  {
    title: "אימון פונקציונלי",
    desc: "כוח, סיבולת ואתגר 💪",
    color: "mint",
  },
  {
    title: "כושר לילדים",
    desc: "כיף, קואורדינציה וביטחון עצמי 🎈",
    color: "sky",
  },
  {
    title: "חיזוק ובריאות",
    desc: "חיזוק הגוף עם אנרגיה צהובה ☀️",
    color: "yellow",
  },
];

const GymLandingPage = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  // שליפת פרטי משתמש מה־Redux או מה־localStorage
  const user = useSelector((state) => state.user.currentUser)
                || JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "אורח";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // סליידר מתחלף
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="landing-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-yellow"></div>
      <div className="circle deco-sky"></div>

      <AppBar position="fixed" className="navbar" elevation={0}>
        <Toolbar className="navbar-inner">
          {/* לוגו */}
          <div className="navbar-logo">
            <Dumbbell color="#ec407a" />
            <Typography variant="h6" className="logo-text">
              Fitmiss
            </Typography>
          </div>

          {/* כאן הוספנו flex כדי למקם את השאר בצד ימין */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            
            {/* הצגת שם המשתמש אם מחובר */}
            {user && (
              <Typography variant="h6" style={{ marginRight: "0.5rem" }} className="ddd">
                שלום, {userName}
              </Typography>
            )}

            {/* קישורים כלליים */}
            <a href="#classes">חוגים</a>
            <a href="#contact">צור קשר</a>
            <a href="#about">אודות</a>

            {/* כפתור התחברות / התנתקות */}
            {user ? (
              <Button variant="outlined" onClick={handleLogout}>
                התנתקות
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setOpenLogin(true)}>
                התחבר
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* באנר מתחלף */}
      <div className="top-banner">
        <div className={`banner-slide ${activeBanner === 0 ? "active" : ""}`}>
          <img src="/assets/ח.jpg" alt="Banner 1" className="banner-image2" />
          <img src="/assets/good2.gif" alt="פרסומת" className="banner-like2" />
          <div className="banner-caption2"></div>
          <p className="aaa">Fitmiss</p>
          <p className="caption-small2">עולם הכושר שלך</p>
        </div>

        <div className={`banner-slide ${activeBanner === 1 ? "active" : ""}`}>
          <img src="/assets/ads3.jpg" alt="Banner 2" className="banner-image" />
          <img src="/assets/Like Button.gif" alt="פרסומת" className="banner-like" />
          <div className="banner-caption">הגעת למקום הנכון</div>
          <div className="caption-small">כאן תוכלי להגיע לשיא הכושר בקלות וביעילות</div>
        </div>
      </div>

      {/* דיאלוג התחברות */}
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        <LoginPage onClose={() => setOpenLogin(false)} />
      </Dialog>

      {/* דיאלוג הרשמה */}
      <Dialog
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        <SignUp onClose={() => setOpenSignUp(false)} />
      </Dialog>

      <section className="classes-section" id="classes">
        {classesData.map((item, index) => (
          <Card key={index} className={`class-card ${item.color}`}>
            <CardContent>
              <Sparkles size={36} color="#fff" />
              <Typography variant="h6" className="card-title">
                {item.title}
              </Typography>
              <Typography variant="body2" className="card-desc">
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="ads-section">
        <div className="ad-row reverse">
          <img src="/assets/gif3.gif" alt="פרסומת 3" />
          <div className="ad-text">
            <h3>כיף לילדים</h3>
            <p>חוגים מותאמים במיוחד עם הרבה מרץ ותנועה</p>
            <Button
              variant="contained"
              className="ad-button"
              onClick={() => setOpenSignUp(true)}
            >
              הצטרפו עכשיו
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
              onClick={() => navigate("/AboutUs")}
            >
              אודותינו
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
              onClick={() => {
                dispatch(clearTrack()); 
                navigate("/custom-start");
              }}
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

      <footer className="contact-section" id="contact">
        <Typography variant="h5" className="contact-title">
          רוצים להצטרף?
        </Typography>
        <Typography variant="body1" className="contact-subtitle">
          השאירו פרטים ונחזור אליכם עם כל המידע!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/ContactUs")}
          className="contact-button"
        >
          צור קשר
        </Button>
      </footer>
    </div>
  );
};

export default GymLandingPage;
