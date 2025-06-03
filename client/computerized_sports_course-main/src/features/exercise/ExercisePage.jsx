import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Exercise from "./Exercise";
import { postFullFitnessTrack } from "./exerciseSlice";
import "./ExercisePage.css";

const ExercisePage = () => {
  const exercises = useSelector((state) => state.trackE.currentTrackExercise);
  const currentUser = useSelector((state) => state.user.currentUser); // ⬅️ הוספת שליפה של המשתמש
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!exercises || exercises.length === 0) {
      navigate("/ShowTrack");
    }
  }, [exercises, navigate]);

  const handleSubmitScore = (score) => {
    const currentExercise = exercises[currentIndex];
    const trackScore = {
      fitnessExerciseId: currentExercise.id,
      score: score,
    };
    setScores(prev => [...prev, trackScore]);
  };

  const goToNextExercise = (score) => {
    handleSubmitScore(score);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      sendTrackToServer();
    }
  };

  const sendTrackToServer = () => {
    const clientId = currentUser?.id || 0; // ⬅️ שולף את ה־clientId מהמשתמש
    const duration = exercises.reduce((sum, ex) => sum + ex.duration, 0);

    const fullTrack = {
      date: new Date().toISOString(),
      clientId: clientId,
      duration: duration,
      exercises: scores.map(s => ({
        fitnessExerciseId: s.fitnessExerciseId,
        mark: s.score
      }))
    };

    console.log("שולחת את המסלול:", fullTrack);

    dispatch(postFullFitnessTrack(fullTrack)).then(() => {
      navigate("/FinishPage");
    });
  };

  if (!exercises || exercises.length === 0 || !exercises[currentIndex]) {
    return null;
  }

  return (
    <div className="exercise-page-container">
      <header className="exercise-header">
        <h1>מסלול ההתעמלות שלי</h1>
        <img src="./assets/רררר.gif" alt="" className="aaa" />
      </header>

      <div className="exercise-wrapper">
        <Exercise
          exercise={exercises[currentIndex]}
          onNext={goToNextExercise}
        />
      </div>
    </div>
  );
};

export default ExercisePage;
