import {createSlice} from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isDarkMode: false,
    isLoggedIn: false,
  },
  reducers: {
    setIsDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setIsDarkMode, setIsLoggedIn} = settingsSlice.actions;

export default settingsSlice.reducer;
