import { createSlice } from '@reduxjs/toolkit';

const default_words = [
    { id: 1, left: 'Oi', right: 'Hey' },
    { id: 2, left: 'Cerveja', right: 'Beer' },
    { id: 3, left: 'Laranja', right: 'Orange' },
    { id: 4, left: 'Livro', right: 'Book' },
    { id: 5, left: 'Carta', right: 'Letter' },
    { id: 6, left: 'Chave', right: 'Key' },
    { id: 7, left: 'Gato', right: 'Cat' },
    { id: 8, left: 'Cachorro', right: 'Dog' },
    { id: 9, left: 'Como', right: 'Eat' },
    { id: 10, left: 'Bebo', right: 'Drink' },
    { id: 11, left: 'Casa', right: 'House' },
    { id: 12, left: 'Namorada', right: 'Girlfriend' },
];

// 로컬 스토리지에서 데이터를 가져오는 함수를 정의합니다.
// wordSetName 파라미터를 이용해 원하는 단어 목록을 가져올 수 있습니다.
const getWordsFromLocalStorage = (wordSetName) => {
    // localStorage에서 wordSetName으로 저장된 값을 불러옵니다.
    const storedWords = localStorage.getItem(wordSetName);
  
    // 저장된 값이 있다면 JSON형식으로 변환하여 반환합니다.
    if (storedWords) {
      return JSON.parse(storedWords);
    }
  
    // 저장된 값이 없고, 'Default Wordset' 이름을 가진 단어 목록을 찾고자 하는 경우, 미리 선언된 default_words를 반환합니다.
    // 다른 이름의 단어 목록을 찾으려 할 때는 '[]'(빈 배열)를 문자열로 반환합니다.
    return wordSetName === 'Default Wordset' ? default_words : [];
  };
  
  // 합쳐진 슬라이스를 정의합니다.
  const wordsetSlice = createSlice({
    name: 'wordset', // 슬라이스 이름
    // 초기 상태는 value(단어 목록 이름)와 words(단어 목록 배열)를 포함합니다.
    initialState: {
      value: 'Default Wordset', // 단어 목록 이름의 초기값 ('Default Wordset')
      words: getWordsFromLocalStorage('Default Wordset'), // 단어 목록 배열의 초기값
    },
    reducers: {
      // 선택된 단어 목록을 변경하는 리듀서
      wordsetSelectChange: (state, action) => {
        // value를 페이로드로 전달된 값으로 갱신합니다.
        state.value = action.payload;
        // words를 새로운 value에 맞춰 로컬 스토리지에서 가져온 값으로 갱신합니다.
        state.words = getWordsFromLocalStorage(state.value);
      },
      // 단어 목록 배열을 변경하는 리듀서
      wordsChange: (state, action) => {
        // words를 페이로드로 전달된 값으로 갱신합니다.
        state.words = action.payload;
      },
    },
  });
  
  // 슬라이스를 가져오기 위해 기본 리듀서를 내보냅니다.
  export default wordsetSlice;
  // 액션들도 내보냅니다.
  export const { wordsetSelectChange, wordsChange } = wordsetSlice.actions;