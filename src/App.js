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
// import imgPocket from './component/pocket.png'
import { useDispatch, useSelector } from 'react-redux';
import { wordsetSelectChange } from './component/Redux/SliceWordsetSelect';
import { warnFuncChange } from './component/Redux/SliceWarnFunc'
import { modalWarnToggle } from './component/Redux/SliceModalWarn';

function App() {
  // 단어 수정, 삭제 모달
  const [modalUpdateWords, setModalUpdateWords] = useState(false);
  const [modalDeleteWords, setModalDeleteWords] = useState(false);
  const [updateId, setUpdateId] = useState(0);

  // 탭 선택
  const [tap, setTap] = useState('List');

  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state) => {
    return state.wordsetSelect.value;
  });

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  });

  // 단어 숨김 토글
  const [isHiding, setIsHiding] = useState(false);
  let hidingClass = ['btn_option list_option', isHiding ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');

  // 단어 좌우 변경 토글
  const [isOpposit, setIsOpposit] = useState(false);
  let oppositClass = ['btn_option list_option', isOpposit ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');

  // 탭에 따른 상단 옵션바 내용 변경
  let top_option;
  if (tap === 'List') {
  }

  // 탭에 따른 섹션 내용 변경
  let section;
  if (tap === 'List') {
    section = (
      <List
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

  // 리스트 생성 수정 모달
  const [modalWordsetAddMod, setModalWordsetAddMod] = useState(false);

  // wordset을 삭제 때 사용하는 모달
  const [modalWordsetDelete, setModalWordsetDelete] = useState(false)

  // 이름을 지을건지 수정할건지 체크
  const [isAddWordset, setIsAddWordset] = useState(true);
 
  // 워드셋 드롭다운 메뉴의 인덱스를 확인
  const [editIndex, setEditIndex] = useState(-1);

  // options(워드셋)이 변경될 때마다 로컬스토리지에 'Wordset'이름으로 배열을 저장
  useEffect(() => {
    localStorage.setItem('Wordset', JSON.stringify(wordsetLists));
  }, [wordsetLists]);

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
              dispatch(wordsetSelectChange(e.target.value));
              setEditIndex(wordsetLists.indexOf(e.target.value));
            }}
            value={wordsetSelect}
          >
            {wordsetLists.map((option, i) => (
              <option key={i} value={option}>
                {option}
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
              } else {
                dispatch(warnFuncChange('MOD_DEFAULT'));
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
                dispatch(warnFuncChange('DEL_DEFAULT'));
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
      <div className={'bottom_option'}>
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
              dispatch(warnFuncChange('NOT_WORKING'));
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
            dispatch(warnFuncChange('NOT_WORKING'));
            dispatch(modalWarnToggle(true))
          }}
        >
          {/* <img src={imgPocket} style={{width:50, height:50}}/> */}
          Test
        </div>
        <div
          className="btn"
          onClick={() => {
            dispatch(warnFuncChange('NOT_WORKING'));
            dispatch(modalWarnToggle(true))
          }}
        >
          Online
        </div>
      </div>

      <ModalOkay/>
      <ModalAddWords
        modalAddWords={modalAddWords}
        setModalAddWords={setModalAddWords}
      />
      <ModalUpdateWords
        modalUpdateWords={modalUpdateWords}
        setModalUpdateWords={setModalUpdateWords}
        updateId={updateId}
      />
      <ModalDeleteWords
        modalDeleteWords={modalDeleteWords}
        setModalDeleteWords={setModalDeleteWords}
        updateId={updateId}
      />
      <ModalWordsetAddMod
        modalWordsetAddMod={modalWordsetAddMod}
        setModalWordsetAddMod={setModalWordsetAddMod}
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
