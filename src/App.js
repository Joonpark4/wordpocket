/*eslint-disable*/
import { useEffect } from 'react';
import './App.css';
import List from './component/List';
import ModalOkay from './component/ModalOkay';
import ModalAddWords from './component/ModalAddWords';
import ModalUpdateWords from './component/ModalUpdateWords';
import ModalDeleteWords from './component/ModalDeleteWords';
import ModalWordsetAddMod from './component/ModalWordsetAddMod';
import ModalWordsetDelete from './component/ModalWordsetDelete';
import { useSelector } from 'react-redux';
import TopOption from './component/TopOption';
import BottomOption from './component/BottomOption';
import TypingTest from './component/TypingTest';
import TapOption from './component/TapOption';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import MyPage from './component/MyPage';

function App() {
  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  });

  // 리덕스 툴킷 사용 (탭 선택, 이전 이름 tap)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  // options(워드셋)이 변경될 때마다 로컬스토리지에 'Wordset'이름으로 배열을 저장
  useEffect(() => {
    localStorage.setItem('Wordset', JSON.stringify(wordsetLists));
  }, [wordsetLists]);

  // 탭에 따른 섹션 내용 변경
  let section;
  if (tap === 'List') {
    section = <List />;
  } else if (tap === 'Test') {
    section = <TypingTest />;
  } else if (tap === 'SignIn') {
    section = <SignIn />;
  } else if (tap === 'SignUp') {
    section = <SignUp />;
  } else if (tap === 'MyPage') {
    section = <MyPage />;
  }

  return (
    <div className="App">
      {/* 타이틀 */}
      <div className="black-nav">Word Pocket</div>

      {/* 상단 옵션바 */}
        <TopOption />

        {/* 라우팅 섹션 */}
        {section}

        {/* 하단 옵션바 */}
        <BottomOption />

        {/* 탭 옵션바 */}
        <TapOption />

      {/* 모달들 */}
      <ModalOkay />
      <ModalAddWords />
      <ModalUpdateWords />
      <ModalDeleteWords />
      <ModalWordsetAddMod />
      <ModalWordsetDelete />
    </div>
  );
}

export default App;