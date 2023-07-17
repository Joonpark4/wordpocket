/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import './css/SignUpIn.css';
import { useNavigate } from 'react-router-dom';

export default function TypingTest() {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  const [txtEmail, setTxtEmail] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  // 이메일 정규 표현식
  const isEmailValid =
    txtEmail == ''
      ? true
      : /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(txtEmail);

  // 이메일 형식 경고 문자 클래스
  const emailchecktext = ['underId', isEmailValid ? 'regex' : 'regexOn'].join(
    ' '
  );

  // 비밀번호1, 6글자 이상인지 확인
  const isPasswordValid = txtPassword.length >= 6;
  const passwordchecktext = [
    'underId',
    txtPassword.length == 0 || isPasswordValid ? 'regex' : 'regexOn',
  ].join(' ');

  // 라우팅을 링크 없이 사용하고 싶으시면 이걸 쓰십쇼
  const navigate = useNavigate();

  const signUpClick = () => {
    navigate('/wordpocket/signup');
  };

  return (
    <div className="section">
      <div className="pageOnline">
        <form>
          <h1>Sign In</h1>
          <div className="onlineUp">
            <input
              type="email"
              className="tbId"
              placeholder="E-mail"
              value={txtEmail}
              onChange={(e) => {
                setTxtEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="tbPw"
              placeholder="Password"
              value={txtPassword}
              onChange={(e) => {
                setTxtPassword(e.target.value);
              }}
            />
            <div className="onlineButtons">
              <button
                type="button"
                className="btOnline"
                onClick={(e) => {
                  e.preventDefault();
                  signUpClick();
                }}
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="btOnline btOnlineSubmit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(warnFuncChange('NOT_WORKING'));
                  dispatch(modalWarnToggle(true));
                }}
              >
                Sign In
              </button>
            </div>
            <div className="onlineLine"></div>
          </div>
          <div className="onlineDown">
            <img
              src={`${process.env.PUBLIC_URL}/SignInWithGoogle.jpg`}
              alt="SignInWithGoogle"
              className="imgSignInWithGoogle"
              onClick={(e) => {
                e.preventDefault();
                dispatch(warnFuncChange('NOT_WORKING'));
                dispatch(modalWarnToggle(true));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
