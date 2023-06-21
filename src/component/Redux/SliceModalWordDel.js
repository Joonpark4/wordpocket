import { createSlice } from '@reduxjs/toolkit';

const modalWordDelSlice = createSlice({
  name: 'modalWordDel',
  initialState: { value: false },
  reducers: {
    modalWordDelToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWordDelSlice;
export const { modalWordDelToggle } = modalWordDelSlice.actions;