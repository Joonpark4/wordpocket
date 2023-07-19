import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tapMyPage } from './Redux/SliceTap';

export default function MyPage() {
  // 렌더링이 끝나면 이 페이지에서 벗어나기
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tapMyPage)
  });

  return (
    <div className="section">
      <div className="notFoundSection">
        <h1>Loding...</h1>
      </div>
    </div>
  );
}
