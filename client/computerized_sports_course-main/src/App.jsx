import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GymLandingPage from "./Components/homePage/GymLandingPage";
import UserProgress from "./features/users/UserProgress"
import CustomWorkoutStart from "./features/TrackExercise/CustomWorkoutStart"
import TrackSlice from "./features/TrackExercise/TrackSlice"
import ExercisePage from "./features/exercise/ExercisePage";
import ShowTrack from './features/TrackExercise/ShowTrack'
import SignUpForm from "./features/users/SighUp"
import { Provider } from 'react-redux';
import { store } from './app/store';
import Users from "./features/users/Users";
import LoginPage from "./features/users/LoginPage";
import PrivateRoute from "./Components/PrivateRoute"
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import FinishPage from "./features/exercise/FinishPage";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<GymLandingPage />} />
          <Route path="/progress" element={<UserProgress />} />
          
          {/* שמירת העמוד כפרטי */}
          <Route path="/custom-start" element={<PrivateRoute> <CustomWorkoutStart /></PrivateRoute> } />
          <Route path="/TrackSlice" element={<TrackSlice />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/FinishPage" element={<FinishPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/ExercisePage" element={<ExercisePage />} />
          <Route path="/ShowTrack" element={<PrivateRoute> <ShowTrack /></PrivateRoute> } />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/login" element={<LoginPage />} />
              </Routes>
      </Router>
    </Provider>
  );
}

export default App;