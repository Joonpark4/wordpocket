/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { modalWarnToggle } from './Redux/SliceModal';
import { modalWordAddToggle } from './Redux/SliceModal';
import { isHidingToggle, isMeaningToggle, isOppositToggle, isWordToggle } from './Redux/SliceBottomOption';

export default function BottomOption() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (탭 선택, 이전 이름 tap)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  // 리덕스 툴킷 사용 (단어 숨김 토글, 이전 이름 isHiding)
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

  // 탭에 따른 하단 옵션바 내용 변경
  let bottom_option;
  if (tap === 'List') {
    bottom_option = (
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
    );
  } else if (tap === 'Test') {
    bottom_option = (
      <div>
        <div
          className={testMeaningClass}
          onClick={() => {
            dispatch(isMeaningToggle(!isMeaning));
            dispatch(isWordToggle(!isWord));
          }}
        >
          Typing
          <br />
          Meaning
        </div>
        <div
          className={testWordClass}
          onClick={() => {
            dispatch(isWordToggle(!isWord));
            dispatch(isMeaningToggle(!isMeaning));
          }}
        >
          Typing
          <br />
          Word
        </div>
      </div>
    );
  } else {
    bottom_option = (
      <div>
        <div className="btn_option list_option">
          Wordset
          <br />
          Download
        </div>
        <div className="btn_option list_option">
          Wordset
          <br />
          Upload
        </div>
        <div className="btn_option list_option">Board</div>
        <div className="btn_option list_option">Write</div>
      </div>
    );
  }

  return <div className={'bottom_option'}>{bottom_option}</div>;
}
