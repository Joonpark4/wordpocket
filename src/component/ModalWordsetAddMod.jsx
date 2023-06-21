/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsetSelectChange } from './Redux/SliceWordsetSelect';
import { wordsetListChange } from './Redux/SliceWordsetList';
import { modalWarnToggle } from './Redux/SliceModalWarn';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { wordsetIdxChange } from './Redux/SliceWordsetIdx';
import { modalWordsetAMToggle } from './Redux/SliceModalWordsetAddMod';

export default function ModalWordsetAddMod({ isAddWordset }) {
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

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const wordsR = useSelector((state) => {
    return state.wordsR.value;
  });

  // 리덕스 툴킷 사용 (워드셋 인덱스체크, 이전 이름 editIdx)
  const wordsetIdx = useSelector((state) => {
    return state.wordsetIdx.value;
  });

  // 리덕스 툴킷 사용 (워드셋 추가 수정 모달, 이전 이름 modalWordsetAddMod)
  const modalWordsetAM = useSelector((state) => {
    return state.modalWordsetAM.value;
  });

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
  // wordset 이름을 짓거나 수정할 때 사용하는 변수
  const [wordsetName, setWordsetName] = useState('');

  // 수정될 이름
  const [modName, setModName] = useState(wordsetSelect);
  useEffect(() => {
    setModName(wordsetSelect);
  }, [wordsetSelect]);

  // 워드셋
  const clickWordsetAddMod = () => {
    if (isAddWordset) {
      // 만약 텍스트박스에 공백이 없을 경우
      if (wordsetName !== '') {
        // 기존 워드셋의 개수만큼 for문 반복 실행
        for (let i = 0; i < wordsetLists.length; i++) {
          // 만약 새로 만드려는 워드셋 이름이 기존워드셋과 동일한 경우
          if (wordsetName == wordsetLists[i]) {
            // 새 워드셋 생성 불가 경고 모달창을 내보내고
            // setWarnFunc('ADD_FAILE');
            dispatch(warnFuncChange('ADD_FAILE'));
            // setModalWarn(true);
            dispatch(modalWarnToggle(true));
            // 워드셋 모달창을 닫고 끝냄
            setWordsetName('');
            dispatch(modalWordsetAMToggle(false));
            return;
          }
        }
        // setOptions([...wordsetLists, wordsetName]);
        dispatch(wordsetListChange([...wordsetLists, wordsetName]));
        dispatch(wordsetSelectChange(wordsetName));
        setWordsetName('');
        dispatch(modalWordsetAMToggle(false));
        dispatch(wordsetIdxChange(wordsetLists.indexOf(wordsetName)));
      } else {
        dispatch(modalWordsetAMToggle(false));
        dispatch(warnFuncChange('WORDSET_ADD_BLANK'));
        dispatch(modalWarnToggle(true));
      }
    } else {
      if (modName != '') {
        // 새로운 이름으로 다시 리스트 만들어 넣기
        localStorage.setItem(modName, JSON.stringify(wordsR));
        // 예전 이름을 가진 리스트는 삭제하기
        localStorage.removeItem(wordsetSelect);
        const newWordsetLists = [...wordsetLists];
        newWordsetLists[wordsetIdx] = modName;
        dispatch(wordsetListChange(newWordsetLists));
        dispatch(wordsetSelectChange(modName));
        dispatch(modalWordsetAMToggle(false));
      } else {
        // 변경할 이름이 공백인 경우 텍스트를 다시 이전으로 되돌림
        setModName(wordsetSelect);
        // 모달을 종료하고 경고문 모달을 다시 출력
        dispatch(modalWordsetAMToggle(false));
        dispatch(warnFuncChange('WORDSET_ADD_BLANK'));
        dispatch(modalWarnToggle(true));
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
        onChange={(e) => {
          setWordsetName(e.target.value);
          console.log(wordsetName);
        }}
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
      isOpen={modalWordsetAM}
      onRequestClose={() => dispatch(modalWordsetAMToggle(false))}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to {textAddMod} WordSet?</div>
        <form action="">{txtBox}</form>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              dispatch(modalWordsetAMToggle(false));
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
