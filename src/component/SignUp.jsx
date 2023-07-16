/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import './css/SignUpIn.css';

export default function TypingTest() {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  const [txtEmail, setTxtEmail] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  return (
    <div className="pageOnline">
      <form>
        <h1>Sign Up</h1>
        <div className="onlineUp">
          <div className="onlineUpLeft">
            <input
              type="email"
              className="tbId"
              placeholder="E-mail"
              value={txtEmail}
              onChange={(e) => {
                setTxtEmail(e.target.value);
              }}
            />
            <span className='underId normalization'>E-mail방식이 아닙니다.</span>
            <input
              type="password"
              className="tbPw"
              placeholder="Password"
              value={txtPassword}
              onChange={(e) => {
                setTxtPassword(e.target.value);
              }}
            />
            <span className='underId normalization'>6자 이상 입력하세요.</span>
            <input
              type="password"
              className="tbPw"
              placeholder="Password Again"
              value={txtPassword}
              onChange={(e) => {
                setTxtPassword(e.target.value);
              }}
            />
            <span className='underId normalization'>패드워드와 다릅니다.</span>
          </div>
          <div className="onlineUpRight">
            <button
              type="submit"
              className="btOnlineSubmit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(warnFuncChange('NOT_WORKING'));
                dispatch(modalWarnToggle(true));
              }}
            >
              Sign
              <br />
              Up
            </button>
          </div>
        </div>
        <div className="onlineLine"></div>
        <div className="onlineDown">
          <img
            src={`${process.env.PUBLIC_URL}/signUpWithGoogle.jpg`}
            alt="SignUpWithGoogle"
            className="imgSignUpWithGoogle"
            onClick={(e) => {
              e.preventDefault();
              dispatch(warnFuncChange('NOT_WORKING'));
              dispatch(modalWarnToggle(true));
            }}
          />
        </div>
      </form>
    </div>
  );
}
