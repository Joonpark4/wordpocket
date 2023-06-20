import { createSlice } from '@reduxjs/toolkit';

const wordsSlice = createSlice({
  name: 'words',
  initialState: { value: 0 },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});
export default wordsSlice;
export const { up, down } = wordsSlice.actions;