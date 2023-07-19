// import { createSlice } from '@reduxjs/toolkit';

// const SliceSignInOut = createSlice({
//   name: 'signInOut',
//   initialState: { value: false },
//   reducers: {
//     signInOutToggle: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });
// export default SliceSignInOut;
// export const { signInOutToggle } = SliceSignInOut.actions;
// 대실패. 로그인 체크 자체를 redux thunk를 사용해서 비동기로 제어해야 할 것 같음.
// 문제 1. 로그인이 되어있는 상황에서 리프레시를 누르면 isLogIn은 true가 되어야 한다.
// 문제 2. 그럼 isLogIn이라는 초기값을 어떻게 할 것인가? true? false?