import { createSlice } from '@reduxjs/toolkit';

const questionIdxSlice = createSlice({
  name: 'questionIdx',
  initialState: { value: 0 },
  reducers: {
    questionIdxUp: (state, action) => {
      state.value = state.value + 1;
    },
    questionIdxChange: (state, action) => {
      state.value = 0;
    },
  },
});
export default questionIdxSlice;
export const { questionIdxUp, questionIdxChange } = questionIdxSlice.actions;
