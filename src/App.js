/*eslint-disable*/
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import List from './component/List';
import ModalOkay from './component/ModalOkay';
import ModalAddWords from './component/ModalAddWords';
import ModalUpdateWords from './component/ModalUpdateWords';
import ModalDeleteWords from './component/ModalDeleteWords';
import ModalWordsetAddMod from './component/ModalWordsetAddMod';
import ModalWordsetDelete from './component/ModalWordsetDelete';
import imgPocket from './component/pocket.png';
import { wordsetSelectChange } from './component/Redux/SliceWordsetSelect';
import { modalWarnToggle } from './component/Redux/SliceModalWarn';
import { warnFuncChange } from './component/Redux/SliceWarnFunc';

function App() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();
  
  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state)=>{
    return state.wordsetSelect.value;
   })

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state)=>{
    return state.wordsetList.value;
   })

  // 단어 수정, 삭제 모달
  const [modalUpdateWords, setModalUpdateWords] = useState(false);
  const [modalDeleteWords, setModalDeleteWords] = useState(false);
  const [updateId, setUpdateId] = useState(0);

  // 탭 선택
  const [tap, setTap] = useState('List');

  // 먼저 useState로 words를 설정하여 setWords로 값이 변할때마다 리렌더링을 하도록 선언한다.
  // 이 때 storedWords라는 값에 로컬스토리지 words라는 이름의 배열값을 집어넣는데, words라는 이름으로 저장된 배열이 없다면 default_words 즉 기본으로 저장된 값을 storedWords에 저장하도록 한다. 그 후 storedWords는 words의 값이 된다
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

  // 현재 선택된 리스트의 상태입니다. wordsetSelect로 현재 선택된 리스트가 로컬스토리지에 있으면 그것을 가져다씁니다.
  // 만약 storedWords가 거짓이라면(wordsetSelect변수의 이름과 같은 배열이름이 로컬스토리지에 없다면)
  // 미리 저장된 default_words를 가져다 씁니다.
  // 리스트 정렬과 리렌더 관련 코드는 List.jsx에 있고, 리스트 내 단어 생성 관련 코드는 ModalAddWords.jsx에 있습니다.
  const [words, setWords] = useState(() => {
    let storedWords = localStorage.getItem(wordsetSelect); // 재렌더링되면 무조건 'Default Wordset'을 가져오므로 Test에서 List로 넘어가면 Default Wordset에 저장된 내용을 가져와서 words에 대입... 그러면 List컴포넌트에 의해서 강제 저장
    return storedWords ? JSON.parse(storedWords) : default_words;
  });

  // 단어 숨김 토글
  const [isHiding, setIsHiding] = useState(false);
  let hidingClass = ['btn_option list_option', isHiding ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');

  // 단어 좌우 변경 토글
  const [isOpposit, setIsOpposit] = useState(false);

  // 탭에 따른 섹션 내용 변경
  let section;
  if (tap === 'List') {
    section = (
      <List
        words={words}
        setWords={setWords}
        modalUpdateWords={modalUpdateWords}
        setModalUpdateWords={setModalUpdateWords}
        setUpdateId={setUpdateId}
        setModalDeleteWords={setModalDeleteWords}
        isHiding={isHiding}
        isOpposit={isOpposit}
      />
    );
  } else if (tap === 'Test') {
    section = <div className="warning">Test 탭은 준비중입니다.</div>;
  } else if (tap === 'Online') {
    section = <div className="warning">Online 탭은 준비중입니다.</div>;
  }

  // 단어 생성 모달
  const [modalAddWords, setModalAddWords] = useState(false);


  // 리스트 생성 모달, 리스트 이름
  const [modalWordsetAddMod, setModalWordsetAddMod] = useState(false);

  // wordset을 삭제 때 사용하는 모달
  const [modalWordsetDelete, setModalWordsetDelete] = useState(false);

  // wordset 이름을 짓거나 수정할 때 사용하는 모달
  const [wordsetName, setWordsetName] = useState('');
  // 이름을 지을건지 수정할건지 체크
  const [isAddWordset, setIsAddWordset] = useState(true);

  // 로컬스토리지에 Wordset이라는 이름의 배열이 있으면 그걸 가져오거나, 없을 경우 디폴트값을 가져온다.
  const [editIndex, setEditIndex] = useState(-1);

  // options(워드셋)이 변경될 때마다 로컬스토리지에 'Wordset'이름으로 배열을 저장
  useEffect(() => {
    localStorage.setItem('Wordset', JSON.stringify(wordsetLists));
  }, [wordsetLists]);

  
  // 리덕스 툴킷 사용 (wordDelete모달, 이전이름 modalDeleteWords)
  const modalWordAdd = useSelector((state) => {
    return state.modalWordAdd;
  });

  return (
    <div className="App">
      {/* 타이틀 */}
      <div className="black-nav">Word Pocket</div>

      {/* 상단옵션바 */}
      <div className="top_option">
        <form action="#">
          <select
            className="dropdown"
            name="listname"
            id="listname"
            onChange={(e) => {
              dispatch(wordsetSelectChange(e.target.value))
              setEditIndex(wordsetLists.indexOf(wordsetSelect));
            }}
            value={wordsetSelect}
          >
            {wordsetLists.map((list, i) => (
              <option key={i} value={list}>
                {list}
              </option>
            ))}
          </select>
          <button
            className="btn_Wordset"
            id="btn_ListAdd"
            onClick={(e) => {
              e.preventDefault();
              setIsAddWordset(true);
              setModalWordsetAddMod(true);
            }}
          >
            Add List
          </button>
          <button
            className="btn_Wordset"
            id="btn_ListMod"
            onClick={(e) => {
              e.preventDefault();
              if (wordsetSelect !== 'Default Wordset') {
                setIsAddWordset(false);
                setModalWordsetAddMod(true);
                console.log(editIndex)
              } else {
                dispatch(warnFuncChange('MOD_DEFAULT'))
                dispatch(modalWarnToggle(true))
              }
            }}
          >
            Mod List
          </button>
          <button
            className="btn_Wordset"
            id="btn_ListDel"
            onClick={(e) => {
              e.preventDefault();
              if (wordsetSelect !== 'Default Wordset') {
                setModalWordsetDelete(true);
              } else {
                dispatch(warnFuncChange('DEL_DEFAULT'))
                dispatch(modalWarnToggle(true))
              }
            }}
          >
            Del List
          </button>
        </form>
      </div>

      {/* 섹션 */}
      <div className="section">{section}</div>

      {/* 하단옵션바 */}
      <div className="bottom_option">
        <div>
          <div className={hidingClass} onClick={() => setIsHiding(!isHiding)}>
            Hide
            <br />
            Meaning
          </div>
          <div
            className={oppositClass}
            onClick={() => {
              setIsOpposit(!isOpposit);
            }}
          >
            Opposite
          </div>
          <div
            className="btn_option list_option"
            onClick={() => setModalAddWords(true)}
          >
            Add
            <br />
            Words
          </div>
          <div
            className="btn_option list_option"
            onClick={() => {
              dispatch(warnFuncChange('NOT_WORKING'))
              dispatch(modalWarnToggle(true))
            }}
          >
            Update
            <br />
            List
          </div>
        </div>
      </div>

      {/* 탭 페이지 */}
      <div className="tap_page">
        <div
          className="btn"
          onClick={() => {
            setTap('List');
          }}
        >
          List
        </div>
        <div
          className="btn"
          onClick={() => {
            dispatch(warnFuncChange('NOT_WORKING'))
            dispatch(modalWarnToggle(true))
            // setTap('Test');
          }}
        >
          {/* <img src={imgPocket} style={{width:50, height:50}}/> */}
          Test
        </div>
        <div
          className="btn"
          onClick={() => {
            dispatch(warnFuncChange('NOT_WORKING'))
            dispatch(modalWarnToggle(true))
          }}
        >
          Online
        </div>
      </div>

      <ModalOkay/>
      <ModalAddWords
        words={words}
        setWords={setWords}
        modalAddWords={modalAddWords}
        setModalAddWords={setModalAddWords}
      />
      <ModalUpdateWords
        words={words}
        setWords={setWords}
        modalUpdateWords={modalUpdateWords}
        setModalUpdateWords={setModalUpdateWords}
        updateId={updateId}
      />
      <ModalDeleteWords
        words={words}
        setWords={setWords}
        modalDeleteWords={modalDeleteWords}
        setModalDeleteWords={setModalDeleteWords}
        updateId={updateId}
      />
      <ModalWordsetAddMod
        words={words}
        setWords={setWords}
        modalWordsetAddMod={modalWordsetAddMod}
        setModalWordsetAddMod={setModalWordsetAddMod}
        wordsetName={wordsetName}
        setWordsetName={setWordsetName}
        isAddWordset={isAddWordset}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
      <ModalWordsetDelete
        modalWordsetDelete={modalWordsetDelete}
        setModalWordsetDelete={setModalWordsetDelete}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </div>
  );
}

export default App;
