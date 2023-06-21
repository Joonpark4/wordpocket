/*eslint-disable*/
import React from 'react';
import Modal from 'react-modal';

export default function ModalOkay({ modalWarn, setModalWarn, warnFunc }) {
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
  switch (warnFunc) {
    case 'NOT_WORKING':
      warnText = "Sorry, It's not working now";
      break;
    case 'DEL_DEFAULT':
      warnText = "<Default Wordset> cannot be deleted";
      break;
    case 'MOD_DEFAULT':
      warnText = '<Default Wordset> cannot be modified';
      break;
    case 'ADD_FAILE':
      warnText = 'Cannot make with that name of Wordset';
      break;
    default:
      break;
  }

  return (
    <Modal
      isOpen={modalWarn}
      onRequestClose={() => setModalWarn(false)}
      style={style}
    >
      <div style={text}>{warnText}</div>
      <div style={btn_box}>
        <button style={btn_style} onClick={() => setModalWarn(false)}>
          Got it!
        </button>
      </div>
    </Modal>
  );
}
