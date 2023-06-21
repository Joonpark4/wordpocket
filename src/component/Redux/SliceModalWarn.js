import { createSlice } from '@reduxjs/toolkit';

const modalWarnSlice = createSlice({
  name: 'modalWarn',
  initialState: { value: false },
  reducers: {
    modalWarnToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWarnSlice;
export const { modalWarnToggle } = modalWarnSlice.actions;