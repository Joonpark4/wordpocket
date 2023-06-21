/*eslint-disable*/
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';

export default function ModalUpdateWords({ words, setWords, modalUpdateWords, setModalUpdateWords,updateId}) {
  const [updateLeft, setUpdateLeft] = useState("");
  const [updateRight, setUpdateRight] = useState("");

  // 첫 렌더링을 막기위한 useRef 사용. useEffect로 첫렌더링을 하게되니 words[updateId-1]에 left값이 없다고 난리다 난리
  const isFirstRender = useRef(true);

  // 처음엔 인덱스가 바뀌는 것으로 단어와 뜻의 텍스트변경조건을 삼았으나 그럴 경우 다른 리스트에서 같은 인덱스의 경우 한번에 값이 바뀌지 않고 이전값이 그대로 있어, 모달이 켜지고 꺼지는 상황에서 텍스트 변경조건을 삼았다.
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setUpdateLeft(words[updateId-1].left);
      setUpdateRight(words[updateId-1].right);
    }
  },[modalUpdateWords])

  // useEffect(()=>{
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //     setUpdateLeft(words[updateId-1].left);
  //     setUpdateRight(words[updateId-1].right);
  //   }
  // },[listSelect])

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
  

  // 단어 수정하기
  const clickUpdateWord = (e) =>{
    e.preventDefault(); // 기본동작버튼을 없애고
    // 만약 텍스트박스에 공백이 없을 경우
    if (updateLeft !== '' && updateRight !== '') {
      // 단어의 양쪽 공백을 삭제, 트림
      let trimUpdateLeft = updateLeft.trim();
      let trimUpdateRight = updateRight.trim();
      // 기존 단어를 수정
      const updatedWords = words.map((word) => {
        if (updateId === word.id) {
          return { "id":updateId, "left":trimUpdateLeft, "right":trimUpdateRight };
        }
        return word;
      });
      setWords(updatedWords);
      // 어차피 setWords하면 자동으로 리스트에서 사라지기 때문에 굳이 다시 로컬스토리지를 업데이트 해주지 않아도 된다.
      // localStorage.setItem(listSelect, JSON.stringify(updatedWords));
      setUpdateLeft('');
      setUpdateRight('');
      setModalUpdateWords(false);
    } else {
      alert("You can't make a word with blank");
    }
  }


  return (
    <Modal
      isOpen={modalUpdateWords}
      onRequestClose={() => setModalUpdateWords(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to update the word?</div>
        <form action="">
          <input style={textbox} placeholder="Word" type="text" onChange={(e)=>setUpdateLeft(e.target.value)} value={updateLeft}/>
          <br></br>
          <input style={textbox} placeholder="Meaning" type="text" onChange={(e)=>setUpdateRight(e.target.value)} value={updateRight}/>
        </form>
        <div style={btn_box}>
          <button style={btn_style} onClick={() => {setModalUpdateWords(false);
      setUpdateLeft(words[updateId-1].left);
      setUpdateRight(words[updateId-1].right);}}>
            Cancel
          </button>
          <button style={btn_style} onClick={clickUpdateWord}>
            Update!
          </button>
        </div>
      </div>
    </Modal>
  );
}
