import { createSlice } from '@reduxjs/toolkit';

const tapSlice = createSlice({
  name: 'tap',
  initialState: { value: 'List' },
  reducers: {
    tapList: (state, action) => {
      state.value = 'List';
    },
    tapListSignedIn: (state, action) => {
      state.value = 'ListSignedIn';
    },
    tapTest: (state, action) => {
      state.value = 'Test';
    },
    tapSignUp: (state, action) => {
      state.value = 'SignUp';
    },
    tapSignIn: (state, action) => {
      state.value = 'SignIn';
    },
    tapMyPage: (state, action) => {
      state.value = 'MyPage';
    },
    tapLoding: (state, action) => {
      state.value = 'LodingPage';
    },
  },
});
export default tapSlice;
export const {
  tapList,
  tapTest,
  tapSignIn,
  tapSignUp,
  tapMyPage,
  tapListSignedIn,
  tapLoding,
} = tapSlice.actions;
