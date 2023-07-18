/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { tapSignIn } from './Redux/SliceTap';
import './css/SignUpIn.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from '../firebase';

export default function TypingTest() {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  const [txtEmail, setTxtEmail] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const [txtPassword2, setTxtPassword2] = useState('');

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

  // 비밀번호2, 비밀번호1과 같은 문자인지 확인
  const isPassword2Valid =
    txtPassword2.length == 0 || txtPassword == txtPassword2;
  const password2checktext = [
    'underId',
    isPassword2Valid ? 'regex' : 'regexOn',
  ].join(' ');

  // 파이어베이스 설정
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // 이메일 확인 클릭시 실행 함수
  // const clickEmailCheck = async () => {
  // };

  // 회원가입 클릭시 실행 함수
  const clickSignUp = async () => {
    if (isEmailValid && isPasswordValid && isPassword2Valid) {
      createUserWithEmailAndPassword(auth, txtEmail, txtPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          dispatch(warnFuncChange('SIGNUP_SUCCESED'));
          dispatch(modalWarnToggle(true));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
          if (errorCode == 'auth/email-already-in-use') {
            dispatch(warnFuncChange('EMAIL_ALREADY'));
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
          <h1>Sign Up</h1>
          <div className="onlineUp">
            <div className="signUpEmailCheck">
              <input
                type="email"
                className="tbId"
                placeholder="E-mail"
                value={txtEmail}
                onChange={(e) => {
                  setTxtEmail(e.target.value);
                }}
              />
              {/* <button
                className="btOnline btEmailCheck"
                onClick={(e) => {
                  e.preventDefault();
                  clickEmailCheck();
                }}
              >
                Send Link
              </button> */}
            </div>

            <span className={emailchecktext}>
              It's not a valid email format
            </span>
            <input
              type="password"
              className="tbPw"
              placeholder="Password"
              value={txtPassword}
              onChange={(e) => {
                setTxtPassword(e.target.value);
              }}
            />
            <span className={passwordchecktext}>
              It must be at least 6 characters long.
            </span>
            <input
              type="password"
              className="tbPw"
              placeholder="Password Again"
              value={txtPassword2}
              onChange={(e) => {
                setTxtPassword2(e.target.value);
              }}
            />
            <span className={password2checktext}>
              It's not match the password
            </span>
            <div className="onlineButtons">
              <button
                type="button"
                className="btOnline"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(tapSignIn());
                }}
              >
                Cancle
              </button>
              <button
                type="submit"
                className="btOnline btOnlineSubmit"
                onClick={(e) => {
                  e.preventDefault();
                  clickSignUp();
                }}
              >
                Sign Up
              </button>
            </div>
            <div className="onlineLine"></div>
          </div>
          <div className="onlineDown">
            <img
              src={`${process.env.PUBLIC_URL}/signUpWithGoogle.jpg`}
              alt="SignUpWithGoogle"
              className="imgSignUpWithGoogle"
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