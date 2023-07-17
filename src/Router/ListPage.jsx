/*eslint-disable*/
import React from 'react';
import List from '../component/List';
import { useDispatch, useSelector } from 'react-redux';

const ListPage = () => {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state) => {
    return state.wordset.value;
  });

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  }); // 리덕스 툴킷 사용 (단어 숨김 토글, 이전 이름 isHiding)
  const isHiding = useSelector((state) => {
    return state.bottomOption.hiding;
  });

  // 리덕스 툴킷 사용 (좌우 변경 토글, 이전 이름 isOpposit)
  const isOpposit = useSelector((state) => {
    return state.bottomOption.opposit;
  });

  // 리덕스 툴킷 사용 (뜻 테스트 변경 토글, 이전 이름 isMeaning)
  const isMeaning = useSelector((state) => {
    return state.bottomOption.meaning;
  });

  // 리덕스 툴킷 사용 (단어 테스트 변경 토글, 이전 이름 isWord)
  const isWord = useSelector((state) => {
    return state.bottomOption.word;
  });

  // 아래는 버튼을 이쁘게 만들어줘요
  let hidingClass = ['btn_option list_option', isHiding ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');
  let oppositClass = ['btn_option list_option', isOpposit ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');
  let testMeaningClass = [
    'btn_option list_option',
    isMeaning ? 'btn_pushed' : null,
  ]
    .filter(Boolean)
    .join(' ');
  let testWordClass = ['btn_option list_option', isWord ? 'btn_pushed' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <>
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
              dispatch(isAddWordsetToggle(true));
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
                dispatch(isAddWordsetToggle(false));
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
      <List />
      <div className={'bottom_option'}>
        <div>
          <div
            className={hidingClass}
            onClick={() => dispatch(isHidingToggle(!isHiding))}
          >
            Hide
            <br />
            Meaning
          </div>
          <div
            className={oppositClass}
            onClick={() => {
              dispatch(isOppositToggle(!isOpposit));
            }}
          >
            Opposite
          </div>
          <div
            className="btn_option list_option"
            onClick={() => dispatch(modalWordAddToggle(true))}
          >
            Add
            <br />
            Words
          </div>
          <div
            className="btn_option list_option"
            onClick={() => {
              dispatch(warnFuncChange('NOT_WORKING'));
              dispatch(modalWarnToggle(true));
            }}
          >
            Update
            <br />
            List
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
