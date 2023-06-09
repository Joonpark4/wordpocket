import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

export default function ModalAddWords({ words, setWords, modalAddWards, setModalAddWards }) {
  const [id, setId] = useState(words.length);
  const [addLeft, setAddLeft] = useState(null);
  const [addRight, setAddRight] = useState(null);


  const style = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      zIndex: 10,
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      background: 'lightcyan',
      overflow: 'auto',
      top: '30vh',
      bottom: '40vh',
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
  const clickAddWord = (e) =>{
    e.preventDefault(); // 기본동작버튼을 없애고
    // 만약 텍스트박스에 공백이 없을 경우
    if (addLeft !== '' && addRight !== '') {
      // 새로운 단어 오브젝트를 생성한다
      const newWord = { id: id+1 , left: addLeft, right: addRight };
      const newWords = [...words, newWord];
      setWords(newWords);
      setId(id+1);
      setAddLeft(''); // 텍스트박스 비우기
      setAddRight(''); // 텍스트박스 비우기
      setModalAddWards(false);
    } else {
      alert("You can't make a word with blank");
    }
  }

  return (
    <Modal
      isOpen={modalAddWards}
      onRequestClose={() => setModalAddWards(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to add word?</div>
        <form action="">
          <input style={textbox} placeholder="Word" type="text" onChange={(e)=>setAddLeft(e.target.value)} value={addLeft}/>
          <br></br>
          <input style={textbox} placeholder="Meaning" type="text" onChange={(e)=>setAddRight(e.target.value)} value={addRight}/>
        </form>
        <div style={btn_box}>
          <button style={btn_style} onClick={() => {setModalAddWards(false)}}>
            Cancel
          </button>
          <button style={btn_style} onClick={clickAddWord}>
            Add!
          </button>
        </div>
      </div>
    </Modal>
  );
}
