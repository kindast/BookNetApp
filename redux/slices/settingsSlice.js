import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isDarkMode: false,
    locale: null,
  },
  reducers: {
    setIsDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
  },
});

export const { setIsDarkMode, setLocale } = settingsSlice.actions;

export default settingsSlice.reducer;
