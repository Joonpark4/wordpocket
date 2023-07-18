/*eslint-disable*/
import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { tapMyPage } from './Redux/SliceTap';

export default function ModalOkay() {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (경고창 내용, 이전 이름 warnFunc)
  const warnFunc = useSelector((state) => {
    return state.warnFunc.value;
  });

  // 리덕스 툴킷 사용 (경고창 모달, 이전 이름 modalWarn)
  const modalWarn = useSelector((state) => {
    return state.modal.warn;
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
      maxWidth: 500,
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
  const text2 = {
    width: '100%',
    textAlign: 'center',
    fontSize: '0.9em',
    marginBottom: '15px',
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
    case 'WORD_ADD_BLANK':
      warnText = 'Cannot be made to an empty word';
      break;
    case 'WORDSET_ADD_BLANK':
      warnText = 'Cannot make a wordset with blank';
      break;
    case 'WORD_MOD_BLANK':
      warnText = 'Cannot be modified to an empty word';
      break;
    case 'WORDSET_NO_WORDS':
      warnText = 'No words in this wordset! Please choose another wordset';
      break;
    case 'WORDSET_EXPLAIN':
      warnText = (
        <div style={text2}>
          1. Select the wordset that you want to test your memory on the left.
          <br />
          <br />
          2. Read the question word and write the answer in the blank.
          <br />
          <br />
          3. Push 'Answer Submit' button. You'll know it's correct or not.
          <br />
          <br />
          4. Tip: Capital letter or word spacing don't metter.
        </div>
      );
      break;
    case 'SIGNUP_SUCCESED':
      warnText = (
        <div style={text2}>
          Signed up succesfuly!
          <br />
          Welcome to Word Pocket service.
        </div>
      );
      break;
    case 'REQUIREMENTS_FAILED':
      warnText =
        'Please fill in all the blanks according to the requirements first.';
      break;
    case 'EMAIL_ALREADY':
      warnText = 'That email is already in use.';
      break;
    case 'EMAICHECK_SUCCESED':
      warnText = 'We sent you an emial successfully!';
      break;
    case 'SIGNIN_FAILED':
      warnText = 'Please check your Email or password';
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
          onClick={() => {
            if (warnFunc == 'SIGNUP_SUCCESED') {
              dispatch(tapMyPage());
            }
            dispatch(modalWarnToggle(false));
          }}
        >
          Got it!
        </button>
      </div>
    </Modal>
  );
}
