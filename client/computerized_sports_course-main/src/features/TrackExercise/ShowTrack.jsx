import React, { useEffect, useState } from "react";   
import { useDispatch, useSelector } from "react-redux";
import { getTrackByIdClient, getExercisesByTrackId } from "./TrackExerciseSlice"; 
import { Card, CardContent, CardHeader, CardActions, Typography, Button } from '@mui/material';
import { Settings } from "lucide-react";
import GoHomeButton from "../../Components/GoHomeButton";

const ShowTracks = () => {  
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);
  const [expandedTrackId, setExpandedTrackId] = useState(null);
  const [expandedTrackDetailsId, setExpandedTrackDetailsId] = useState(null);
  const [exercises, setExercises] = useState({});
  const [averageScores, setAverageScores] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user?.id) return;
      try {
        const result = await dispatch(getTrackByIdClient(user.id));  
        if (result.payload) {
          const formattedTracks = Array.isArray(result.payload) ? result.payload : [result.payload];
          setTracks(formattedTracks);

          const exercisesPromises = formattedTracks.map(async (track) => {
            const exercisesResult = await dispatch(getExercisesByTrackId(track.id));
            return { trackId: track.id, exercises: exercisesResult.payload || [] };
          });

          const exercisesData = await Promise.all(exercisesPromises);
          
          const exercisesMap = exercisesData.reduce((acc, { trackId, exercises }) => {
            acc[trackId] = exercises;
            return acc;
          }, {});

          setExercises(exercisesMap);

          const scoresMap = exercisesData.reduce((acc, { trackId, exercises }) => {
            const totalScore = exercises.reduce((sum, ex) => sum + (ex.mark || 0), 0);
            acc[trackId] = exercises.length > 0 ? totalScore / exercises.length : 0;
            return acc;
          }, {});

          setAverageScores(scoresMap);
        }
      } catch (error) {
        console.error("❌ Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [dispatch, user]);

  const toggleTrackDetailsVisibility = (trackId) => {
    setExpandedTrackDetailsId(expandedTrackDetailsId === trackId ? null : trackId);
  };

  const toggleTrackExercisesVisibility = (trackId) => {
    setExpandedTrackId(expandedTrackId === trackId ? null : trackId);
  };

  return (
    <div className="landing-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-sky"></div>

      <header className="landing-header fade-in">
      <GoHomeButton />

        <Typography variant="h4" className="landing-title">
          כל המסלולים
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          עיין במסלולים שלך וצפה בפרטי תרגילים והציונים
        </Typography>
      </header>

      <div className="classes-section">
        {tracks.length > 0 ? (
          tracks.map((track, index) => {
            return (
              <Card key={track.id} className="class-card mint">
                <CardContent>
                  <CardHeader title={`מסלול ${index + 1}`} subheader={`תאריך: ${new Date(track.date).toLocaleDateString()}`} />
                  <Typography variant="body1" color="textSecondary">
                    <strong>משך זמן:</strong> {track.duration} דקות
                  </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={() => toggleTrackDetailsVisibility(track.id)} variant="contained" style={{ backgroundColor: '#FFA07A', color: 'white' }}>
                    {expandedTrackDetailsId === track.id ? "הסתר פרטים" : "הצג פרטי מסלול"}
                  </Button>
                  <Button onClick={() => toggleTrackExercisesVisibility(track.id)} variant="contained" color="primary">
                    {expandedTrackId === track.id ? "הסתר תרגילים" : "הצג תרגילים"}
                  </Button>
                </CardActions>
                {expandedTrackDetailsId === track.id && (
                  <CardContent>
                    <Typography variant="h6" gutterBottom>פרטי המסלול:</Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>ממוצע הציונים של התרגילים:</strong> {averageScores[track.id] ? averageScores[track.id].toFixed(2) : "אין נתונים"}
                    </Typography>
                  </CardContent>
                )}
                {expandedTrackId === track.id && (
                  <CardContent>
                    <Typography variant="h6" gutterBottom>רשימת התרגילים:</Typography>
                    {exercises[track.id] && exercises[track.id].length > 0 ? (
                      exercises[track.id].map((exercise, idx) => (
                        <Typography key={idx} variant="body2" color="textSecondary">
                          {exercise.exerciseName} - ציון: {exercise.mark || "לא דורג"}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">אין תרגילים זמינים</Typography>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary">אין מסלולים זמינים</Typography>
        )}
      </div>
    </div>
  );
};

export default ShowTracks;
