import { createSlice } from '@reduxjs/toolkit';

const updateIdSlice = createSlice({
  name: 'updateId',
  initialState: { value: 0 },
  reducers: {
    updateIdChange: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default updateIdSlice;
export const { updateIdChange } = updateIdSlice.actions;