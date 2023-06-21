import { createSlice } from '@reduxjs/toolkit';

const modalWordsetAMSlice = createSlice({
  name: 'modalWordsetAM',
  initialState: { value: false },
  reducers: {
    modalWordsetAMToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default modalWordsetAMSlice;
export const { modalWordsetAMToggle } = modalWordsetAMSlice.actions;