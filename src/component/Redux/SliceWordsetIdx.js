import { createSlice } from '@reduxjs/toolkit';

const wordsetIdxSlice = createSlice({
  name: 'wordsetIdx',
  initialState: { value: 'Default Wordset' },
  reducers: {
    wordsetIdxChange: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default wordsetIdxSlice;
export const { wordsetIdxChange } = wordsetIdxSlice.actions;