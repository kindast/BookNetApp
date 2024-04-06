import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    setIsDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
