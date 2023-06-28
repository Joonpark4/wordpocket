/*eslint-disable*/
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsetSelectChange } from './Redux/SliceWordset';
import { wordsetListChange } from './Redux/SliceWordsetList';
import { wordsetIdxChange } from './Redux/SliceWordsetIdx';
import { modalWordsetDelToggle } from './Redux/SliceModal';

export default function ModalWordsetDelete() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state) => {
    return state.wordset.value;
  });

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  });

  // 리덕스 툴킷 사용 (워드셋 인덱스체크, 이전 이름 editIdx)
  const wordsetIdx = useSelector((state) => {
    return state.wordsetIdx.value;
  });

  const modalWordsetDel = useSelector((state) => {
    return state.modal.wordsetdel;
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
  useEffect(() => {
    dispatch(wordsetIdxChange(wordsetLists.indexOf(wordsetSelect)));
  }, [wordsetSelect]);

  const clickWordsetDelete = () => {
    // wordsetIdx가 아닌 항목들로 구성된 새로운 옵션 배열을 생성합니다.
    // filter를 사용해 해당 인덱스의 항목을 제외한 배열을 생성합니다.
    const newWordsetLists = wordsetLists.filter((_, i) => i !== wordsetIdx);
    // 변경된 새로운 옵션 배열을 업데이트합니다.
    // setOptions(newOptions);
    dispatch(wordsetListChange(newWordsetLists));
    // 선택된 옵션 값을 초기화하고, 'wordsetIdx' 값을 -1로 설정하여 편집 상태를 종료합니다.
    dispatch(wordsetIdxChange(-1));
    // setListSelect('Default Wordset');
    dispatch(wordsetSelectChange('Default Wordset'));
    localStorage.removeItem(wordsetSelect);
    dispatch(modalWordsetDelToggle(false));
  };
  return (
    <Modal
      isOpen={modalWordsetDel}
      onRequestClose={() => dispatch(modalWordsetDelToggle(false))}
      style={style}
    >
      <div style={top}>
        <div style={text}>Do you want to delete the WordSet?</div>
        <div style={btn_box}>
          <button
            style={btn_style}
            onClick={() => {
              dispatch(modalWordsetDelToggle(false));
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
