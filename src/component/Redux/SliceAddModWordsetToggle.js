import { createSlice } from '@reduxjs/toolkit';

const SliceAddModWordset = createSlice({
  name: 'addModWordset',
  initialState: { value: true },
  reducers: {
    isAddWordsetToggle: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default SliceAddModWordset;
export const { isAddWordsetToggle } = SliceAddModWordset.actions;