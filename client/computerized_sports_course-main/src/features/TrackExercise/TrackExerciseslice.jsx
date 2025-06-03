import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//מסלול פעולה שמביאה רשימת תרגילים  לפי ID
export const getExercisesByTrackId = createAsyncThunk(
  "trackExercise/getExercisesByTrackId",
  async (trackId, thunkApi) => {
    try {
      const response = await axios.get(`https://localhost:7206/api/TrackExercise/udTrack/${trackId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

//מחזיר רשימת מסלולים לפי משתמש
export const getTrackByIdClient = createAsyncThunk(
  "track/fetch",  // שם פעולה חדש
  async (id, thunkApi) => {
    try {
      // שולחים את ה-clientId כ-query parameter
      let { data } = await axios.get(`https://localhost:7206/api/FitnessTrack?clientId=${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "שגיאה כלשהי.");
    }
  }
);

export const TrackExercise = createSlice({
  name: "exercise",
  initialState: {
    currentExercise: null,
    currentTrack: null,  // הוסף את המידע של ה-Track
    status: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // פעולת getExercise
      .addCase(getExercisesByTrackId.pending, (state) => {
        state.status = "loading";
        state.message = "טוען תרגיל...";
      })
      .addCase(getExercisesByTrackId.fulfilled, (state, action) => {
        state.currentExercise = action.payload;
        state.status = "success";
        state.message = "תרגיל נטען בהצלחה!";
      })
      .addCase(getExercisesByTrackId.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת התרגיל.";
      })

      // פעולת getTrackByIdClient
      .addCase(getTrackByIdClient.pending, (state) => {
        state.status = "loading";
        state.message = "טוען מסלול...";
      })
      .addCase(getTrackByIdClient.fulfilled, (state, action) => {
        state.currentTrack = action.payload;
        state.status = "success";
        state.message = "מסלול נטען בהצלחה!";
      })
      .addCase(getTrackByIdClient.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה בטעינת המסלול.";
      });
  },
});

export default TrackExercise.reducer;
