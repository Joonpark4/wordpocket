import { createSlice } from '@reduxjs/toolkit';

const modalWordAddSlice = createSlice({
  name: 'modalWordAdd',
  initialState: { value: false },
  reducers: {
    modalWordAddToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWordAddSlice;
export const { modalWordAddToggle } = modalWordAddSlice.actions;