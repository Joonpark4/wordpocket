/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsetSelectChange } from './Redux/SliceWordsetSelect';
import { wordsetListChange } from './Redux/SliceWordsetList';
import { modalWarnToggle } from './Redux/SliceModalWarn';
import { warnFuncChange } from './Redux/SliceWarnFunc';

export default function ModalWordsetAddMod({
  words,
  modalWordsetAddMod,
  setModalWordsetAddMod,
  wordsetName,
  setWordsetName,
  isAddWordset,
  editIndex,
  setEditIndex,
}) {
  

  const style = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      position: 'relative',
      inset: '0',
      width: '80%',
      top: '30%',
      left: '10%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      background: 'lightcyan',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '14px',
      outline: '1px solid',
      zIndex: 20,
    },
  };
  const top = {
    width: '100%',
    textAlign: 'center',
    height: '100%',
  };
  const text = {
    fontSize: '1.5em',
    color: 'darkblue',
    paddingBottom: '20px',
  };
  const textbox = {
    fontSize: '1.5em',
    width: '80%',
    padding: '5px',
    marginBottom: '20px',
  };
  const btn_box = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  };
  const btn_style = {
    fontSize: '1.5em',
    padding: '0px 10px',
  };
  
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋)
  const wordsetSelect = useSelector((state)=>{
    return state.wordsetSelect.value;
   })

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경)
  const wordsetList = useSelector((state)=>{
    return state.wordsetList.value;
   })

  // 수정될 이름
  const [modName, setModName] = useState(wordsetSelect);
  useEffect(() => {
    setModName(wordsetSelect);
  }, [wordsetSelect]);

    // 아래 구문이 없을 경우 워드셋 생성 직후 바로 삭제할 때 인덱스가 의도대로 잡히지 않는다.
    useEffect(()=>{
      setEditIndex(wordsetList.indexOf(wordsetSelect));
    }),[modalWordsetAddMod]

  // 워드셋
  const clickWordsetAddMod = () => {
    // 워드셋 더하기의 경우
    if (isAddWordset) {
      // 만약 텍스트박스에 공백이 없을 경우
      if (wordsetName !== '') {
        // 워드셋의 양쪽 공백을 삭제, 트림
        let trimWordsetName = wordsetName.trim();
        // 기존 워드셋의 개수만큼 for문 반복 실행
        for (let i = 0; i < wordsetList.length; i++) {
          // 만약 새로 만드려는 워드셋 이름이 기존워드셋과 동일한 경우 
          if (wordsetName == wordsetList[i]) {
            // 새 워드셋 생성 불가 경고 모달창을 내보내고
            dispatch(warnFuncChange("ADD_FAILE"))
            dispatch(modalWarnToggle(true))
            // 워드셋 모달창을 닫고 끝냄
            setWordsetName('');
            setModalWordsetAddMod(false);
            return;
          }
        }
        dispatch(wordsetListChange([...wordsetList, trimWordsetName]))
        // setOptions([...wordsetList, trimWordsetName]);
        dispatch(wordsetSelectChange(trimWordsetName))
        // setOptions([...options, wordsetName]);
        // setListSelect(wordsetName);
        setWordsetName('');
        setModalWordsetAddMod(false);
      } else {
        dispatch(warnFuncChange("ADD_SAME_WORDSET"))
        setModalWordsetAddMod(false)
        dispatch(modalWarnToggle(true))
      }
      // 워드셋 수정의 경우
    } else {
      if (wordsetSelect !== 'Default Wordset') {
        // 새로운 이름으로 다시 리스트 만들어 넣기
        localStorage.setItem(modName, JSON.stringify(words));
        // 예전 이름을 가진 리스트는 삭제하기
        // localStorage.removeItem(wordsetSelect);
        const newOptions = [...wordsetList];
        newOptions[editIndex] = modName;
        dispatch(wordsetListChange(newOptions));
        dispatch(wordsetSelectChange(modName))
        setModalWordsetAddMod(false);
      }
    }
  };

  let textAddMod = 'add',
    btnAddMod = 'Add!',
    txtBox;

  if (isAddWordset) {
    textAddMod = 'add';
    btnAddMod = 'Add!';
    txtBox = (
      <input
        style={textbox}
        placeholder="WordSet name"
        type="text"
        onChange={(e) => setWordsetName(e.target.value)}
        value={wordsetName}
      />
    );
  } else {
    textAddMod = 'modification';
    btnAddMod = 'Mod!';
    txtBox = (
      <input
        style={textbox}
        placeholder="WordSet name"
        type="text"
        onChange={(e) => setModName(e.target.value)}
        value={modName}
      />
    );
  }

  return (
    <Modal
      isOpen={modalWordsetAddMod}
      onRequestClose={() => setModalWordsetAddMod(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to {textAddMod} WordSet?</div>
        <form action="">{txtBox}</form>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              setModalWordsetAddMod(false);
              setWordsetName('');
            }}
          >
            Cancel
          </button>
          <button style={btn_style} onClick={clickWordsetAddMod}>
            {btnAddMod}
          </button>
        </div>
      </div>
    </Modal>
  );
}
