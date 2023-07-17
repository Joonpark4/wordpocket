import { createSlice } from '@reduxjs/toolkit';

const tapSlice = createSlice({
  name: 'tap',
  initialState: { value: 'List' },
  reducers: {
    tapList: (state, action) => {
      state.value = "List";
    },
    tapTest: (state, action) => {
      state.value = "Test";
    },
    tapSignUp: (state, action) => {
      state.value = "SignUp";
    },
    tapSignIn: (state, action) => {
      state.value = "SignIn";
    },
    tapMyPage: (state, action) => {
      state.value = "MyPage";
    },
  },
});
export default tapSlice;
export const { tapList, tapTest, tapSignIn, tapSignUp, tapMyPage } = tapSlice.actions;