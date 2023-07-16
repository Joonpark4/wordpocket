import { createSlice } from '@reduxjs/toolkit';

const bottomOptionSlice = createSlice({
  name: 'bottomOption',
  initialState: {
    hiding: false,
    opposit: false,
    meaning: true,
    word: false,
  },
  reducers: {
    isHidingToggle: (state, action) => {
      state.hiding = action.payload;
    },
    isOppositToggle: (state, action) => {
      state.opposit = action.payload;
    },
    isMeaningToggle: (state, action) => {
      state.meaning = action.payload;
    },
    isWordToggle: (state, action) => {
      state.word = action.payload;
    },
  },
});

export default bottomOptionSlice;
export const {
  isHidingToggle,
  isOppositToggle,
  isMeaningToggle,
  isWordToggle,
} = bottomOptionSlice.actions;
