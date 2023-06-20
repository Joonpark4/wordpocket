import { createSlice } from '@reduxjs/toolkit';

const wordsetSelectSlice = createSlice({
  name: 'wordsetSelect',
  initialState: { value: 'Default Wordset' },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});
export default wordsetSelectSlice;
export const { up, down } = wordsetSelectSlice.actions;