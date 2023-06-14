/*eslint-disable*/
import React, { useEffect } from 'react';
import Modal from 'react-modal';

export default function ModalWordsetDelete({
  modalWordsetDelete,
  setModalWordsetDelete,
  listSelect,
  options,
  editIndex,
  setOptions,
  setListSelect,
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
  const btn_box = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  };
  const btn_style = {
    fontSize: '1.5em',
    padding: '0px 10px',
  };
  
  // 아래 구문이 없을 경우 워드셋 생성 직후 바로 삭제할 때 인덱스가 의도대로 잡히지 않는다.
  useEffect(()=>{
    setEditIndex(options.indexOf(listSelect));
  },[listSelect])

  const clickWordsetDelete = () => {
    // editIndex가 아닌 항목들로 구성된 새로운 옵션 배열을 생성합니다.
    // filter를 사용해 해당 인덱스의 항목을 제외한 배열을 생성합니다.
    const newOptions = options.filter((_,i) => i !== editIndex);
    // 변경된 새로운 옵션 배열을 업데이트합니다.
    setOptions(newOptions);
    // 선택된 옵션 값을 초기화하고, 'editIndex' 값을 -1로 설정하여 편집 상태를 종료합니다.
    setEditIndex(-1);
    setListSelect('Default Wordset');
    localStorage.removeItem(listSelect);
    setModalWordsetDelete(false);
  };
  return (
    <Modal
      isOpen={modalWordsetDelete}
      onRequestClose={() => setModalWordsetDelete(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to delete the WordSet?</div>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              setModalWordsetDelete(false);
            }}
          >
            Cancel
          </button>
          <button style={btn_style} onClick={clickWordsetDelete}>
            Delete!
          </button>
        </div>
      </div>
    </Modal>
  );
}