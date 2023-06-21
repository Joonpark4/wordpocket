import { createSlice } from '@reduxjs/toolkit';

const warnFuncSlice = createSlice({
  name: 'warnFunc',
  initialState: { value: 'NOT_WORKING' },
  reducers: {
    warnFuncChange: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default warnFuncSlice;
export const { warnFuncChange } = warnFuncSlice.actions;