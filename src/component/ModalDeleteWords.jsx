/*eslint-disable*/
import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsChange } from './Redux/SliceWordset';
import { modalWordDelToggle } from './Redux/SliceModalWordDel';

export default function ModalDeleteWords() {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const wordsR = useSelector((state) => {
    return state.wordset.words;
  });

  // 리덕스 툴킷 사용 (단어삭제 모달, 이전 이름 modalDeleteWord)
  const modalWordDel = useSelector((state) => {
    return state.modalWordDel.value;
  });

  // 리덕스 툴킷 사용 (업뎃 인덱스, 이전이름 updateId)
  const updateId = useSelector((state)=>{
   return state.updateId.value;
  })

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
  const btn_box = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  };
  const btn_style = {
    fontSize: '1.5em',
    padding: '0px 10px',
  };

  // 단어 수정하기
  const clickDeleteWord = (e) => {
    e.preventDefault(); // 기본동작버튼을 없애고
    // // 기존 단어를 삭제
    const deletedWords = wordsR.filter((word) => updateId !== word.id);
    // setWords(deletedWords);
    dispatch(wordsChange(deletedWords));
    // setModalDeleteWords(false);
    dispatch(modalWordDelToggle(false));
    // 어차피 setWords하면 자동으로 리스트에서 사라지기 때문에 굳이 다시 로컬스토리지를 업데이트 해주지 않아도 된다.
    // localStorage.setItem(listSelect, JSON.stringify(deletedWords));
  };

  return (
    <Modal
      isOpen={modalWordDel}
      onRequestClose={() => dispatch(modalWordDelToggle(false))}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to delete the word?</div>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              dispatch(modalWordDelToggle(false));
            }}
          >
            Cancel
          </button>
          <button style={btn_style} onClick={clickDeleteWord}>
            Delete!
          </button>
        </div>
      </div>
    </Modal>
  );
}
