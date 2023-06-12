import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ModalListAddMod({ words, setWords, modalListAddMod, setModalListAddMod}) {
    const [listname, setListname] = useState("")

  const style = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      zIndex: 10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    content: {
      position:'relative',
      inset:'0',
      width:'80%',
      top:'30%',
      left:'10%',
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

  // 단어 추가하기
  const clickListAddMod = (e) =>{
    e.preventDefault(); // 기본동작버튼을 없애고
    // 만약 텍스트박스에 공백이 없을 경우
    if (listname === "") {
        //
    } else {
      alert("You can't make a wordset with blank");
    }
  }

  return (
    <Modal
      isOpen={modalListAddMod}
      onRequestClose={() => setModalListAddMod(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to add word?</div>
        <form action="">
          <input style={textbox} placeholder="Word" type="text" onChange={(e)=>setModalListAddMod(e.target.value)} value={listname}/>
        </form>
        <div style={btn_box}>
          <button style={btn_style} onClick={() => {setModalListAddMod(false)}}>
            Cancel
          </button>
          <button style={btn_style} onClick={clickListAddMod}>
            Add!
          </button>
        </div>
      </div>
    </Modal>
  );
}
