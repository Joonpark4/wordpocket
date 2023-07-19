import { createSlice } from '@reduxjs/toolkit';

const SliceLoding = createSlice({
  name: 'Loding',
  initialState: { value: false },
  reducers: {
    isLodingToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default SliceLoding;
export const { isLodingToggle } = SliceLoding.actions;