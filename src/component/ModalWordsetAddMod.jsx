/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

export default function ModalWordsetAddMod({
  modalWordsetAddMod,
  setModalWordsetAddMod,
  options,
  setOptions,
  wordsetName,
  setWordsetName,
  listSelect,
  setListSelect,
  isAddWordset,
  editIndex,
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

  // 수정될 이름
  const [modName, setModName] = useState(listSelect);
  useEffect(()=>{
    setModName(listSelect)
  },[listSelect])

  // 워드셋
  const clickWordsetAddMod = (e) => {
    e.preventDefault(); // 기본동작버튼을 없애고
    if (isAddWordset) {
      // 만약 텍스트박스에 공백이 없을 경우
      if (wordsetName !== '') {
        setOptions([...options, wordsetName]);
        setListSelect(wordsetName);
        setWordsetName('');
        setModalWordsetAddMod(false);
      } else {
        alert("You can't make a wordset with blank");
      }
    } else {
      if (listSelect !== 'Default Wordset') {
        const newOptions = [...options];
        newOptions[editIndex] = modName;
        setOptions(newOptions);
        setListSelect(modName);
        setModalWordsetAddMod(false);
      } else {
        alert("You can't modification Default Wordset");
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
        onChange={(e) => setWordsetName(e.target.value)}
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
      isOpen={modalWordsetAddMod}
      onRequestClose={() => setModalWordsetAddMod(false)}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to {textAddMod} WordSet?</div>
        <form action="">{txtBox}</form>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              setModalWordsetAddMod(false);
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
