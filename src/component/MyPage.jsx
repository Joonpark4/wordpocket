import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 로그인 확인용 리덕스
  // const isSignIn = useSelector((state)=>{
  //   return state.signInOut.value;
  // })
  return (
    <div className="section">
      <div className="notFoundSection">
        <h1>You signed in!</h1>
      </div>
    </div>
  );
}
