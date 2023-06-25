// import { createSlice } from '@reduxjs/toolkit';

// // 먼저 useState로 words를 설정하여 setWords로 값이 변할때마다 리렌더링을 하도록 선언한다.
// // 이 때 storedWords라는 값에 로컬스토리지 words라는 이름의 배열값을 집어넣는데, words라는 이름으로 저장된 배열이 없다면 default_words 즉 기본으로 저장된 값을 storedWords에 저장하도록 한다. 그 후 storedWords는 words의 값이 된다

// const default_words = [
//   { id: 1, left: 'Oi', right: 'Hey' },
//   { id: 2, left: 'Cerveja', right: 'Beer' },
//   { id: 3, left: 'Laranja', right: 'Orange' },
//   { id: 4, left: 'Livro', right: 'Book' },
//   { id: 5, left: 'Carta', right: 'Letter' },
//   { id: 6, left: 'Chave', right: 'Key' },
//   { id: 7, left: 'Gato', right: 'Cat' },
//   { id: 8, left: 'Cachorro', right: 'Dog' },
//   { id: 9, left: 'Como', right: 'Eat' },
//   { id: 10, left: 'Bebo', right: 'Drink' },
//   { id: 11, left: 'Casa', right: 'House' },
//   { id: 12, left: 'Namorada', right: 'Girlfriend' },
// ];

// // storedWords라는 변수에 로컬스토리지에 있는 Default Wordset이라는 이름의 배열을 저장
// let storedWords = localStorage.getItem('Default Wordset');

// const wordsSlice = createSlice({
//   name: 'wordsR',
//   // 만약 그 배열이 있으면 그 배열내용을 초기값으로 하고, 아니면 'Default Wordset' 딸랑 하나만 값으로 갖는 배열로 초기화
//   initialState: {
//     value: storedWords ? JSON.parse(storedWords) : default_words,
//   },
//   reducers: {
//     wordsChange: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });
// export default wordsSlice;
// export const { wordsChange } = wordsSlice.actions;
// export let storedWord;
