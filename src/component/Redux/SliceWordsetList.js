import { createSlice } from '@reduxjs/toolkit';

// storedWordset이라는 변수에 로컬스토리지에 있는 Wordset이라는 이름의 배열을 저장
let storedWordset = localStorage.getItem('Wordset');

const wordsetListSlice = createSlice({
  name: 'wordsetList',
  // 만약 그 배열이 있으면 그 배열내용을 초기값으로 하고, 아니면 'Default Wordset' 딸랑 하나만 값으로 갖는 배열로 초기화
  initialState: { value: storedWordset ? JSON.parse(storedWordset) : ['Default Wordset'] },
  reducers: {
    wordsetListChange: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default wordsetListSlice;
export const { wordsetListChange } = wordsetListSlice.actions;