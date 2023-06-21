import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalWarn',
  initialState: { value: false },
  reducers: {
    modalWarnToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalSlice;
export const { modalWarnToggle } = modalSlice.actions;