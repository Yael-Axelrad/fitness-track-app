import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Card, CardContent, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Send } from "lucide-react";
import { useFormik } from "formik";
import GoHomeButton from "./GoHomeButton";

const ContactUs = () => {
  const user = useSelector((state) => state.user.currentUser) || JSON.parse(localStorage.getItem("user"));
  const userNameFromStore = user ? user.name : "";
  const userEmailFromStore = user ? user.email : ""; // אם המייל נשמר בסטור או ב-localStorage
  
  const [showMessage, setShowMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: userNameFromStore,
      email: userEmailFromStore,
      message: "",
    },
    onSubmit: (values) => {
      if (!values.name || !values.email || !values.message) {
        setShowMessage("אנא מלא את כל השדות");
        setOpenDialog(true);
        return;
      }
      setShowMessage("ההודעה נשלחה בהצלחה!");
      setOpenDialog(true);
      // כאן תוכל להוסיף את הלוגיקה לשליחת ההודעה לשרת
    },
  });

  return (
    <div className="contact-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-sky"></div>

      <header className="contact-header fade-in">
        <Typography variant="h4" className="contact-title">
          צור קשר
        </Typography>
        <Typography variant="subtitle1" className="contact-subtitle">
          נשמח לשמוע ממך! מלא את הטופס ונחזור אליך בהקדם ✨
        </Typography>
      </header>

      {showMessage && (
        <Alert severity={showMessage === "ההודעה נשלחה בהצלחה!" ? "success" : "error"}>
          {showMessage}
        </Alert>
      )}

      <section className="contact-form">
        <Card className="contact-card pink">
          <CardContent>
            <Typography variant="h6" className="card-title">
              פרטי יצירת קשר:
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="שם מלא"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                fullWidth
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                label="אימייל"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                fullWidth
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                label="הודעה"
                variant="outlined"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="message"
                fullWidth
                multiline
                rows={4}
                style={{ marginBottom: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<Send />}
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
              >
                שלח הודעה
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <GoHomeButton />
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>סטטוס ההודעה</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{showMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactUs;
