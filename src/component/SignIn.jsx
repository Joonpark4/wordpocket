/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { tapMyPage, tapSignUp } from './Redux/SliceTap';
import './css/SignUpIn.css';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from '../firebase';

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

  // 비밀번호1, 6글자 이상인지 확인
  const isPasswordValid = txtPassword.length >= 6;
  const passwordchecktext = [
    'underId',
    txtPassword.length == 0 || isPasswordValid ? 'regex' : 'regexOn',
  ].join(' ');

  // 파이어베이스 설정
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // 로그인 버튼 누르면
  const clickSignIn = async () => {
    if (isEmailValid && isPasswordValid) {
      signInWithEmailAndPassword(auth, txtEmail, txtPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          dispatch(tapMyPage());
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorCode == 'auth/wrong-password'||errorCode == 'auth/user-not-found') {
            setTxtPassword('');
            dispatch(warnFuncChange('SIGNIN_FAILED'));
            dispatch(modalWarnToggle(true));
          }
        });
    } else {
      dispatch(warnFuncChange('REQUIREMENTS_FAILED'));
      dispatch(modalWarnToggle(true));
    }
  };

  // 구글가입 클릭시 실행 함수
  const clickGoogleSignUp = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(credential);
        console.log(token);
        console.log(user);
        dispatch(tapMyPage());
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
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
                  dispatch(tapSignUp());
                }}
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="btOnline btOnlineSubmit"
                onClick={(e) => {
                  e.preventDefault();
                  clickSignIn();
                }}
              >
                Sign In
              </button>
            </div>
            <div className="onlineLine"></div>
          </div>
          <div className="onlineDown">
            <img
              src={`${process.env.PUBLIC_URL}/signInWithGoogle.jpg`}
              alt="SignInWithGoogle"
              className="imgSignInWithGoogle"
              onClick={(e) => {
                e.preventDefault();
                clickGoogleSignUp();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
