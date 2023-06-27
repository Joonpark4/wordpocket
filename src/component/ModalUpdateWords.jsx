/*eslint-disable*/
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsChange } from './Redux/SliceWordset';
import { modalWarnToggle } from './Redux/SliceModalWarn';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { modalWordModToggle } from './Redux/SliceModalWordMod';

export default function ModalUpdateWords({}) {

  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const wordsR = useSelector((state) => {
    return state.wordset.words;
  });

  // 리덕스 툴킷 사용 (단어수정 모달, 이전 이름 modalUpdateWord)
  const modalWordMod = useSelector((state) => {
    return state.modalWordMod.value;
  });

  // 리덕스 툴킷 사용 (업뎃 인덱스, 이전이름 updateId)
  const updateId = useSelector((state)=>{
   return state.updateId.value;
  })

  const [updateLeft, setUpdateLeft] = useState("");
  const [updateRight, setUpdateRight] = useState("");


  // 첫 렌더링을 막기위한 useRef 사용. useEffect로 첫렌더링을 하게되니 words[updateId-1]에 left값이 없다고 난리다 난리
  const isFirstRender = useRef(true);

  // 처음엔 인덱스가 바뀌는 것으로 단어와 뜻의 텍스트변경조건을 삼았으나 그럴 경우 다른 리스트에서 같은 인덱스의 경우 한번에 값이 바뀌지 않고 이전값이 그대로 있어, 모달이 켜지고 꺼지는 상황에서 텍스트 변경조건을 삼았다.
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setUpdateLeft(wordsR[updateId-1].left);
      setUpdateRight(wordsR[updateId-1].right);
    }
  },[modalWordMod])

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
      // // 기존 단어를 수정
      const updatedWords = wordsR.map((word) => {
        if (updateId === word.id) {
          return { "id":updateId, "left":updateLeft, "right":updateRight };
        }
        return word;
      });
      dispatch(wordsChange(updatedWords));
      setUpdateLeft('');
      setUpdateRight('');
      dispatch(modalWordModToggle(false))
    } else {
      dispatch(modalWordModToggle(false))
      dispatch(warnFuncChange("WORD_MOD_BLANK"))
      dispatch(modalWarnToggle(true))
    }
  }


  return (
    <Modal
      isOpen={modalWordMod}
      onRequestClose={() => dispatch(modalWordModToggle(false))}
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
          <button style={btn_style} onClick={() => {dispatch(modalWordModToggle(false))}}>
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
