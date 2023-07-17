/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tapList, tapTest, tapSignIn, tapSignUp, tapMyPage } from './Redux/SliceTap';

export default function TapOption() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (탭 선택, 이전 이름 tap)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  return (
    <div className="tap_page">
      <div
        className="btn"
        onClick={() => {
          dispatch(tapList())
        }}
      >
        List
      </div>
      <div
        className="btn"
        onClick={() => {
          dispatch(tapTest())
        }}
      >
        Test
      </div>
      <div
        className="btn"
        onClick={() => {
          dispatch(tapMyPage())
        }}
      >
        Online
      </div>
    </div>
  );
}
