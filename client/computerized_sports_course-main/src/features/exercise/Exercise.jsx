import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './Exercise.css';

const Exercise = ({ exercise, onNext }) => {
  const [accuracy, setAccuracy] = useState("");
  const [effort, setEffort] = useState("");
  const [timeScore, setTimeScore] = useState("");
  const [scoreTotal, setScoreTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const acc = Math.min(Math.max(Number(accuracy), 0), 5) || 0;
    const eff = Math.min(Math.max(Number(effort), 0), 3) || 0;
    const time = Math.min(Math.max(Number(timeScore), 0), 2) || 0;

    setScoreTotal(acc + eff + time);
  }, [accuracy, effort, timeScore]);

  useEffect(() => {
    setAccuracy("");
    setEffort("");
    setTimeScore("");
    setScoreTotal(0);
    setTimeLeft(exercise.duration * 60);
  }, [exercise]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [exercise]);

  const handleNext = () => {
    onNext(scoreTotal);
  };

  const confirmClose = () => {
    window.location.href = "/"; // מעבר לדף הבית
  };

  return (
    <div className="exercise-wrapper">
<IconButton className="close-button" onClick={() => setOpenDialog(true)}>
<CloseIcon />
      </IconButton>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>יציאה מהאימון</DialogTitle>
        <DialogContent>
          <DialogContentText>האם אתה בטוח שברצונך לסיים את האימון?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">ביטול</Button>
          <Button onClick={confirmClose} color="secondary">כן, סיים</Button>
        </DialogActions>
      </Dialog>

      <div className="exercise-left">
        <img src={exercise.gif} alt={exercise.name} className="exercise-gif" />

        <div className="exercise-next-wrapper">
          <div className="exercise-timer-box">
            ⏰ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>

          <button
            className="exercise-next-button"
            onClick={handleNext}
            disabled={scoreTotal === 0}
          >
            <p className="sss">תרגיל הבא</p>
            <img src="/assets/next.gif" alt="הבא" className="bbb" />
          </button>
        </div>
      </div>

      <div className="exercise-right">
        <h1 className="exercise-title">{exercise.name}</h1>
        <h2 className="exercise-description-title">איך לבצע את התרגיל:</h2>
        <p className="exercise-description">{exercise.description}</p>

        <div className="exercise-score-section">
          <div className="score-field">
            <label className="exercise-score-label">רמת דיוק (1–5):</label>
            <input
              className="exercise-score-input"
              type="number"
              min={1}
              max={5}
              value={accuracy}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (Number(val) >= 1 && Number(val) <= 5)) {
                  setAccuracy(val);
                }
              }}
            />
          </div>

          <div className="score-field">
            <label className="exercise-score-label">רמת מאמץ (1–3):</label>
            <input
              className="exercise-score-input"
              type="number"
              min={1}
              max={3}
              value={effort}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (Number(val) >= 1 && Number(val) <= 3)) {
                  setEffort(val);
                }
              }}
            />
          </div>

          <div className="score-field">
            <label className="exercise-score-label">משך זמן (1–2):</label>
            <input
              className="exercise-score-input"
              type="number"
              min={1}
              max={2}
              value={timeScore}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (Number(val) >= 1 && Number(val) <= 2)) {
                  setTimeScore(val);
                }
              }}
            />
          </div>

          <input
            className="total-score-display"
            type="text"
            readOnly
            value={`סה\"כ ציון: ${scoreTotal} מתוך 10`}
          />
        </div>
      </div>
    </div>
  );
};

export default Exercise;
