import {configureStore} from '@reduxjs/toolkit';
import settings from './slices/settingsSlice';

export const store = configureStore({
  reducer: {settings},
});
