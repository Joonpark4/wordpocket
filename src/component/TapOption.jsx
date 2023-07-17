/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tapList, tapTest, tapOnline } from './Redux/SliceTap';
import { useNavigate } from 'react-router-dom';

export default function TapOption() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (탭 선택, 이전 이름 tap)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  // 라우팅을 링크 없이 사용하고 싶으시면 이걸 쓰십쇼
  const navigate = useNavigate();

  const listClick = () => {
    dispatch(tapList());
    navigate('/wordpocket/');
  };

  const testClick = () => {
    dispatch(tapTest());
    navigate('/wordpocket/test');
  };

  const onlineClick = () => {
    dispatch(tapOnline());
    navigate('/wordpocket/signin');
  };

  return (
    <div className="tap_page">
      <div
        className="btn"
        onClick={() => {
          listClick();
        }}
      >
        List
      </div>
      <div
        className="btn"
        onClick={() => {
          testClick();
        }}
      >
        Test
      </div>
      <div
        className="btn"
        onClick={() => {
          onlineClick();
        }}
      >
        Online
      </div>
    </div>
  );
}
