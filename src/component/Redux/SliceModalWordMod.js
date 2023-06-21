import { createSlice } from '@reduxjs/toolkit';

const modalWordModSlice = createSlice({
  name: 'modalWordMod',
  initialState: { value: false },
  reducers: {
    modalWordModToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWordModSlice;
export const { modalWordModToggle } = modalWordModSlice.actions;