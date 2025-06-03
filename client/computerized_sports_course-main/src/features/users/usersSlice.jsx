import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// הרשמה
export const serverSignUp = createAsyncThunk("user-SignUp", async (user, thunkApi) => {
  try {
    let { data } = await axios.post("https://localhost:7206/api/Client/SignUp", user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Error occurred");
  }
});
//התחברות
export const serverSignIn = createAsyncThunk("user-SignIn", async (user, thunkApi) => {
  try {
    const { data } = await axios.post("https://localhost:7206/api/Client/SignIn", user);
    return data;
  } catch (error) {
    // אם השגיאה היא 401, אז נקבל הודעת שגיאה מתאימה
    if (error.response && error.response.status === 401) {
      return thunkApi.rejectWithValue("ההתחברות לא הצליחה. יש לוודא את פרטי המשתמש.");
    }
    // במקרה אחר, שגיאה כלשהי שניתן להחזיר
    return thunkApi.rejectWithValue(error.response?.data?.message || "שגיאה כלשהי.");
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    status: null,
    message: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
      state.status = null;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(serverSignIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
        state.message = "ההתחברות הצליחה";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(serverSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "שגיאה כלשהי בהתחברות";
      })
      .addCase(serverSignIn.pending, (state) => {
        state.status = "loading";
        state.message = "...בטעינה";
      })
      .addCase(serverSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
        state.message = "המשתמש נוצר בהצלחה";
      })
      .addCase(serverSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "אירעה שגיאה";
      })
      .addCase(serverSignUp.pending, (state) => {
        state.status = "loading";
        state.message = "...בטעינה";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
