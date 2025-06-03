import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Modal, Box } from "@mui/material";
import GoHomeButton from "./GoHomeButton";

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="about-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-sky"></div>

      <header className="about-header fade-in" style={{ textAlign: "center" }}>
        <Typography variant="h4" className="about-title" sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "2rem" }}>
          אודותינו
        </Typography>
        <Typography variant="h6" className="about-subtitle" sx={{ marginTop: "1rem", fontSize: "1rem", color: "#333" }}>
          אנחנו כאן כדי לספק לך חוויית אימון מותאמת אישית, מקצועית ומתקדמת – כל מה שאתה צריך כדי להשיג את מטרותיך!
        </Typography>
      </header>

      <section className="about-content" style={{ textAlign: "center", marginTop: "2rem" }}>
        <Card className="about-card pink" sx={{ marginBottom: "2rem", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
          <CardContent>
            <Typography variant="h5" className="card-title" sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.2rem" }}>
              מה אנחנו עושים?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem", fontSize: "1rem", color: "#333" }}>
              המערכת שלנו מבוססת על טכנולוגיות חכמות המאפשרות לך ליצור תוכנית אימונים מותאמת אישית בדיוק לצרכים שלך. 
              כל תרגול מתבצע על פי קריטריונים כמו ניסיון עבר, תוצאות ציון ומטרותיך האישיות.
              <br /><br />
              לאחר כל תרגול, תוכל להוסיף ציון שיסייע לנו להתאים לך את התרגולים הבאים בצורה מדויקת יותר. 
              המערכת מתעדת את ההתקדמות שלך ומספקת תרגולים מגוונים בכל תחום, כולל: אימוני כוח, שחרור, אירובי ותרפיה.
            </Typography>
          </CardContent>
        </Card>

        <Card className="about-card mint" sx={{ marginBottom: "2rem", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
          <CardContent>
            <Typography variant="h5" className="card-title" sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.2rem" }}>
              למה חשוב להתאמן?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem", fontSize: "1rem", color: "#333" }}>
              שמירה על כושר גופני לא רק משפרת את הבריאות הפיזית, אלא גם תורמת לבריאות הנפשית שלך. 
              פעילות גופנית סדירה מסייעת בהפחתת לחץ, שיפור מצב הרוח, ושמירה על אנרגיה חיונית לכל יום.
              <br /><br />
              המערכת שלנו מאפשרת לך להתאמן בצורה חכמה וממוקדת, תוך מתן תמיכה והתאמה אישית לאורך כל הדרך.
            </Typography>
          </CardContent>
        </Card>
      </section>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#1976d2",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={handleOpen}
          style={{ marginBottom: "3rem" }}
        >
          איך זה עובד?
        </Button>
      </div>

      <div style={{ position: "absolute", bottom: "20px", left: "20px", marginBottom: "2rem" }}>
        <GoHomeButton />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          width: "80%",
          maxWidth: "600px",
        }}>
          <Typography variant="h6" id="modal-title" sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1.2rem" }}>
            איך המערכת עובדת?
          </Typography>
          <Typography variant="body1" id="modal-description" sx={{ marginTop: "1rem", fontSize: "0.9rem", color: "#333" }}>
            המערכת מתאימה לך אימונים על פי נתונים אישיים וסטטיסטיקות מהתרגולים הקודמים. 
            בעזרת אלגוריתמים מתקדמים, אנחנו מנתחים את הביצועים שלך ומספקים תרגולים מותאמים אישית בהתאם לציון, כמות הפעמים שתרגלת וההעדפות שלך.
            <br /><br />
            לאחר כל תרגול תוכל להזין את הציון שלך כדי שהמערכת תוכל לבצע את ההתאמות הכי מדויקות ומתקדמות עבורך.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutUs;
