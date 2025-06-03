import React from "react";
import { Typography, Button } from "@mui/material";

const Footer = () => (
  <footer className="contact-section" id="contact">
    <Typography variant="h5" className="contact-title">
      רוצים להצטרף?
    </Typography>
    <Typography variant="body1" className="contact-subtitle">
      השאירו פרטים ונחזור אליכם עם כל המידע!
    </Typography>
    <Button variant="contained" className="contact-button">צור קשר</Button>
  </footer>
);

export default Footer;
