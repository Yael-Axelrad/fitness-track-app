import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Dumbbell } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser) || JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
    <Toolbar className="navbar-inner">
      <div className="navbar-logo">
        <Dumbbell color="#ec407a" />
        <Typography variant="h6" className="logo-text"> Fitmiss</Typography>
      </div>
      <Typography variant="h6" className="navbar-username">
        {userName}
      </Typography>
      <div className="navbar-links">
        <a href="#classes"> {userName} :שם</a>
        <a href="#contact">צור קשר</a>
        <a href="#contact">אודות</a>
      </div>
    </Toolbar>
  </AppBar>
  );
};

export default Header;
