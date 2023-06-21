/*eslint-disable*/
import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModalWarn';

export default function ModalOkay() {

  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (okay모달, 이전이름 modalWarn)
  const modalWarn = useSelector((state) => {
    return state.modal.value;
  });

  // 리덕스 툴킷 사용 (warnFunc, 이전 이름 options)
  const warnFunc = useSelector((state)=>{
    return state.warnFunc.value;
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
  const text = {
    width: '100%',
    textAlign: 'center',
    fontSize: '1.5em',
    marginBottom: '20px',
  };
  const btn_box = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  };
  const btn_style = {
    fontSize: '1.5em',
    padding: '0px 10px',
  };
  let warnText;
  // 모달이 켜지기 직전 warnFunc 변수에 어떤 문자열을 받았는지에 따라 다른 문자열 출력
  switch (warnFunc) {
    case 'NOT_WORKING':
      warnText = "Sorry, It's not working now";
      break;
    case 'DEL_DEFAULT':
      warnText = '<Default Wordset> cannot be deleted';
      break;
    case 'MOD_DEFAULT':
      warnText = '<Default Wordset> cannot be modified';
      break;
    case 'ADD_FAILE':
      warnText = 'Cannot make with that name of Wordset';
      break;
    case 'ADD_SAME_WORDSET':
      warnText = "You can't make a wordset with blank";
      break;
    case 'ADD_SAME_WORD':
      warnText = "You can't make a word with blank";
      break;
    default:
      break;
  }
  return (
    <Modal
      isOpen={modalWarn}
      onRequestClose={() => dispatch(modalWarnToggle(false))}
      style={style}
    >
      <div style={text}>{warnText}</div>
      <div style={btn_box}>
        <button
          style={btn_style}
          onClick={() => dispatch(modalWarnToggle(false))}
        >
          Got it!
        </button>
      </div>
    </Modal>
  );
}
