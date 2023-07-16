/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wordsetIdxChange } from './Redux/SliceWordsetIdx';
import { modalWordsetAMToggle } from './Redux/SliceModal';
import { modalWordsetDelToggle } from './Redux/SliceModal';
import { questionIdxChange } from './Redux/SliceQuestionIdx';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { modalWarnToggle } from './Redux/SliceModal';
import { wordsetSelectChange } from './Redux/SliceWordset';

export default function TopOption({ setIsAddWordset }) {
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

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  // 탭에 따른 상단 옵션바 내용 변경
  let top_option;
  if (tap === 'List') {
    top_option = (
      <div className="top_option">
        <form>
          <select
            className="dropdown"
            name="listname"
            id="listname"
            onChange={(e) => {
              dispatch(questionIdxChange());
              dispatch(wordsetSelectChange(e.target.value));
              dispatch(wordsetIdxChange(wordsetLists.indexOf(e.target.value)));
            }}
            value={wordsetSelect}
          >
            {wordsetLists.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="btn_Wordset"
            id="btn_ListAdd"
            onClick={(e) => {
              e.preventDefault();
              setIsAddWordset(true);
              dispatch(modalWordsetAMToggle(true));
            }}
          >
            Add List
          </button>
          <button
            className="btn_Wordset"
            id="btn_ListMod"
            onClick={(e) => {
              e.preventDefault();
              if (wordsetSelect !== 'Default Wordset') {
                setIsAddWordset(false);
                dispatch(modalWordsetAMToggle(true));
              } else {
                dispatch(warnFuncChange('MOD_DEFAULT'));
                dispatch(modalWarnToggle(true));
              }
            }}
          >
            Mod List
          </button>
          <button
            className="btn_Wordset"
            id="btn_ListDel"
            onClick={(e) => {
              e.preventDefault();
              if (wordsetSelect !== 'Default Wordset') {
                dispatch(modalWordsetDelToggle(true));
              } else {
                dispatch(warnFuncChange('DEL_DEFAULT'));
                dispatch(modalWarnToggle(true));
              }
            }}
          >
            Del List
          </button>
        </form>
      </div>
    );
  } else if(tap === 'Test'){
    top_option = (
      <div className="top_option">
        <form>
          <select
            className="dropdown"
            name="listname"
            id="listname"
            onChange={(e) => {
              dispatch(questionIdxChange());
              dispatch(wordsetSelectChange(e.target.value));
              dispatch(wordsetIdxChange(wordsetLists.indexOf(e.target.value)));
            }}
            value={wordsetSelect}
          >
            {wordsetLists.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="btn_Wordset"
            id="btn_Explain"
            onClick={(e) => {
              e.preventDefault();
              dispatch(warnFuncChange('WORDSET_EXPLAIN'));
              dispatch(modalWarnToggle(true));
            }}
          >
            How to use this?
          </button>
        </form>
      </div>
    );
  } 
  else {
    top_option = <div className="top_option"></div>;
  }

  return top_option;
}
