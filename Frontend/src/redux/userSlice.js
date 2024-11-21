import { createSlice } from "@reduxjs/toolkit";
import { login } from "./userThunk";

// Safely parse localStorage data with fallback
const getLocalStorageData = () => {
  try {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Failed to parse localStorage data:", error);
    return null; // Fallback to null if parsing fails
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: getLocalStorageData(),
  },
  reducers: {
    Logout: (state) => {
      localStorage.removeItem("data");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { data } = action.payload;
      localStorage.setItem("data", JSON.stringify(data)); // Save data in localStorage
      state.data = data; // Update state
    });
  },
});

export const { Logout } = userSlice.actions;
export default userSlice.reducer;
