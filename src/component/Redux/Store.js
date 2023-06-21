import { configureStore } from '@reduxjs/toolkit';
import wordsetSelectSlice from './SliceWordsetSelect';

const store = configureStore({
  reducer: {wordsetSelect: wordsetSelectSlice.reducer},
});
export default store;
