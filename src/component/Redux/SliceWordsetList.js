import { createSlice } from '@reduxjs/toolkit';

  // 현재 선택된 리스트의 상태입니다. wordsetListSlice로 현재 선택된 리스트가 로컬스토리지에 있으면 그것을 가져다씁니다.
  // 만약 storedWords가 거짓이라면(wordsetListSlice변수의 이름과 같은 배열이름이 로컬스토리지에 없다면)
  // 미리 저장된 default_words를 가져다 씁니다.
  // 리스트 정렬과 리렌더 관련 코드는 List.jsx에 있고, 리스트 내 단어 생성 관련 코드는 ModalAddWords.jsx에 있습니다.

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