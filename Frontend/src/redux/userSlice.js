import { createSlice } from "@reduxjs/toolkit";
import { login } from "./userThunk";
const data = localStorage.getItem("data")? JSON.parse(localStorage.getItem("data")): null;

const userSlice = createSlice({     
  name: "user",
  initialState: {
    data: data,
  },
  reducers: {
    Logout: (state, action) => {
      localStorage.removeItem("data");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
   builder
   .addCase(login.fulfilled,(state, action) => {
    const { data } = action.payload;
    localStorage.setItem("data", JSON.stringify(data));
    state.data = data;
  })
  },
});

export const { Logout } = userSlice.actions;

export default userSlice.reducer;
