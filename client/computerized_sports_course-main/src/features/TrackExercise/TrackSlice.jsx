import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// פעולה אסינכרונית שמביאה את המסלול מהשרת לפי קטגוריות וזמן
export const getTrackExercise = createAsyncThunk(
  "trackExercise/fetch",
  async ({ id, categories, time }, thunkApi) => {
    try {
      const response = await axios.post(
        "https://localhost:7206/api/FitnessExercise/by-time",
        {
          id: id,
          ctgry: categories,
          time: time,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data || "שגיאה כלשהי."
      );
    }
  }
);

// ה־slice של trackExercise
export const trackExerciseSlice = createSlice({
  name: "trackExercise",
  initialState: {
    currentTrackExercise: null,
    status: null,
    message: "",
  },
  reducers: {
    // פעולה שמאפסת את הנתונים של המסלול
    clearTrack: (state) => {
      state.currentTrackExercise = null;
      state.status = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrackExercise.pending, (state) => {
        state.status = "loading";
        state.message = "טוען נתוני תרגול...";
      })
      .addCase(getTrackExercise.fulfilled, (state, action) => {
        if (Array.isArray(action.payload) && action.payload.length === 0) {
          state.status = "failed";
          state.message = "אין מסלולים תואמים לגילך.";
        } else {
          state.currentTrackExercise = action.payload;
          state.status = "success";
          state.message = "הנתונים נטענו בהצלחה!";
        }
      })
      .addCase(getTrackExercise.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת הנתונים.";
      });
  },
});

// ייצוא של הפעולה clearTrack לשימוש בקומפוננטות
export const { clearTrack } = trackExerciseSlice.actions;

// ייצוא ברירת מחדל של הרדוסר
export default trackExerciseSlice.reducer;
