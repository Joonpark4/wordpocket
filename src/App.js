/*eslint-disable*/
import { useEffect, useState } from 'react';
import './App.css';
import List from './component/List';
import ModalOkay from './component/ModalOkay';
import ModalAddWords from './component/ModalAddWords';
import ModalUpdateWords from './component/ModalUpdateWords';
import ModalDeleteWords from './component/ModalDeleteWords';
import ModalWordsetAddMod from './component/ModalWordsetAddMod';
import ModalWordsetDelete from './component/ModalWordsetDelete';
import { useDispatch, useSelector } from 'react-redux';
import TypingTest from './component/TypingTest';
import TopOption from './component/TopOption';
import TapOption from './component/TapOption';
import BottomOption from './component/BottomOption'

function App() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  });

  // 리덕스 툴킷 사용 (탭 선택, 이전 이름 tap)
  const tap = useSelector((state) => {
    return state.tap.value;
  });
    
  // 이름을 지을건지 수정할건지 체크
  const [isAddWordset, setIsAddWordset] = useState(true);

  // 단어 숨김 토글
  // const [isHiding, setIsHiding] = useState(false);

  // 단어 좌우 변경 토글
  // const [isOpposit, setIsOpposit] = useState(false);

  // 뜻 테스트 변경 토글
  // const [isMeaning, setIsMeaning] = useState(true);
  // 단어 테스트 변경 토글
  // const [isWord, setIsWord] = useState(false);

  // options(워드셋)이 변경될 때마다 로컬스토리지에 'Wordset'이름으로 배열을 저장
  useEffect(() => {
    localStorage.setItem('Wordset', JSON.stringify(wordsetLists));
  }, [wordsetLists]);

  
  // 탭에 따른 섹션 내용 변경
  let section;
  if (tap === 'List') {
    section = <List />;
  } else if (tap === 'Test') {
    section = <TypingTest/>;
  } else if (tap === 'Online') {
    section = <div className="warning">Online 탭은 준비중입니다.</div>;
  }

  return (
    <div className="App">
      {/* 타이틀 */}
      <div className="black-nav">Word Pocket</div>

      {/* 상단옵션바 */}
      <TopOption setIsAddWordset={setIsAddWordset} />

      {/* 섹션 */}
      <div className="section">{section}</div>

      {/* 하단옵션바 */}
      <BottomOption/>

      {/* 탭 옵션바 */}
      <TapOption />

      {/* 모달들 */}
      <ModalOkay />
      <ModalAddWords />
      <ModalUpdateWords />
      <ModalDeleteWords />
      <ModalWordsetAddMod isAddWordset={isAddWordset} />
      <ModalWordsetDelete />
    </div>
  );
}

export default App;
