import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { Settings } from "lucide-react";
import { getTrackExercise, clearTrack } from "./TrackSlice";
import GoHomeButton from "../../Components/GoHomeButton";

const CustomWorkoutStart = () => {
  const [duration, setDuration] = useState(30);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.currentUser?.id);

  // כאן! בתוך הקומפוננטה
  useEffect(() => {
    dispatch(clearTrack());
  }, [dispatch]);

  useEffect(() => {
    fetch("https://localhost:7206/api/CategoryFitness")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("שגיאה בטעינת קטגוריות:", err));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    if (!categories || categories.length === 0) {
      console.error("לא נטענו קטגוריות");
      return;
    }
    const userIdToSend = userId || null;
    const selectedCategoryObjects = categories.filter((cat) =>
      selectedCategories.includes(cat.id)
    );

    if (selectedCategoryObjects.length === 0) {
      setErrorMessage("יש לבחור לפחות קטגוריה אחת.");
      return;
    }

    dispatch(
      getTrackExercise({
        id: userIdToSend,
        categories: selectedCategoryObjects,
        time: duration,
      })
    );
  };

  const { currentTrackExercise, message, status } = useSelector(
    (state) => state.trackE || { currentTrackExercise: null, message: "", status: "" }
  );

  useEffect(() => {
    if (Array.isArray(currentTrackExercise) && currentTrackExercise.length > 0) {
      navigate("/ExercisePage");
    }
  }, [currentTrackExercise, navigate]);

  useEffect(() => {
    if (status === "failed" && message) {
      setErrorMessage(message);
    }
  }, [status, message]);

  return (
    <div className="landing-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-sky"></div>

      <header className="landing-header fade-in">
        <GoHomeButton />
        <Typography variant="h4" className="landing-title">
          התחלת מסלול מותאם אישית
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          בחרי את מה שמתאים לך – זמן, סגנון, והתחילי מסלול כושר ייחודי משלך ✨
        </Typography>
      </header>

      <section className="classes-section">
        <Card className="class-card pink">
          <CardContent>
            <Settings size={36} color="#fff" />
            <Typography variant="h6" className="card-title">
              בחרי משך זמן (בדקות):
            </Typography>
            <TextField
              type="number"
              inputProps={{ min: 20, max: 60 }}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              variant="outlined"
              size="small"
              style={{
                marginTop: "1rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            />
          </CardContent>
        </Card>

        <Card className="class-card mint">
          <CardContent>
            <Typography variant="h6" className="card-title">
              בחרי קטגוריות מועדפות:
            </Typography>
            <div
              className="checkbox-group"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px 20px",
                marginTop: "1rem",
                direction: "rtl",
              }}
            >
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCheckboxChange(cat.id)}
                      color="secondary"
                    />
                  }
                  label={cat.name}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Button variant="contained" className="cta-button" onClick={handleStart}>
          התחילי עכשיו
        </Button>
      </div>

      {errorMessage && (
        <Snackbar open autoHideDuration={6000} onClose={() => setErrorMessage("")}>
          <Alert onClose={() => setErrorMessage("")} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default CustomWorkoutStart;
