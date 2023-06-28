import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    warn: false,
    wordadd: false,
    worddel: false,
    wordmod: false,
    wordsetam: false,
    wordsetdel: false,
  },
  reducers: {
    modalWarnToggle: (state, action) => {
      state.warn = action.payload;
    },
    modalWordAddToggle: (state, action) => {
      state.wordadd = action.payload;
    },
    modalWordDelToggle: (state, action) => {
      state.worddel = action.payload;
    },
    modalWordModToggle: (state, action) => {
      state.wordmod = action.payload;
    },
    modalWordsetAMToggle: (state, action) => {
      state.wordsetam = action.payload;
    },
    modalWordsetDelToggle: (state, action) => {
      state.wordsetdel = action.payload;
    },
  },
});

export default modalSlice;
export const {
  modalWarnToggle,
  modalWordAddToggle,
  modalWordDelToggle,
  modalWordModToggle,
  modalWordsetAMToggle,
  modalWordsetDelToggle,
} = modalSlice.actions;
