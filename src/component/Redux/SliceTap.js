import { createSlice } from '@reduxjs/toolkit';

const tapSlice = createSlice({
  name: 'tap',
  initialState: { value: 'List' },
  reducers: {
    tapList: (state, action) => {
      state.value = "List";
    },
    tapTest: (state, action) => {
      state.value = "Test";
    },
    tapOnline: (state, action) => {
      state.value = "Online";
    },
  },
});
export default tapSlice;
export const { tapList, tapTest, tapOnline } = tapSlice.actions;