import { createSlice } from '@reduxjs/toolkit';

const modalWordsetDelSlice = createSlice({
  name: 'modalWordsetDel',
  initialState: { value: false },
  reducers: {
    modalWordsetDelToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWordsetDelSlice;
export const { modalWordsetDelToggle } = modalWordsetDelSlice.actions;