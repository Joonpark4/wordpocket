/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wordsetIdxChange } from './Redux/SliceWordsetIdx';
import { modalWordsetAMToggle } from './Redux/SliceModal';
import { modalWordsetDelToggle } from './Redux/SliceModal';
import { questionIdxChange } from './Redux/SliceQuestionIdx';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { modalWarnToggle } from './Redux/SliceModal';
import { wordsetSelectChange } from './Redux/SliceWordset';
import { isAddWordsetToggle } from './Redux/SliceAddModWordsetToggle';
import { tapSignIn } from './Redux/SliceTap';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';

export default function TopOption() {
  // 리덕스 툴킷 사용 (리모콘)
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state) => {
    return state.wordset.value;
  });

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const wordsetLists = useSelector((state) => {
    return state.wordsetList.value;
  });

  // 리덕스 툴킷 사용 (워드셋 리스트, 이전 이름 options)
  const tap = useSelector((state) => {
    return state.tap.value;
  });

  // 로그아웃과 사용자명 확인을 위해 파이어베이스 설정
  const auth = getAuth(app);
  const clickSignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(tapSignIn());
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  // 이메일 사용자의 경우에는 이메일 도메인 앞쪽 부분을 이름으로 하고 displayName이 있으면 그것을 이름으로 함
  const [userName, setUserName] = useState('');
  if (tap == 'MyPage') {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // 만약 디스플레이네임이 있으면 디스플레이네임을 출력
        if (auth.currentUser.displayName) {
          setUserName(auth.currentUser.displayName);
        } else {
          setUserName(user.email.split('@')[0]);
        }
      } else {
        dispatch(tapSignIn());
      }
    });
  }

  // 탭에 따른 상단 옵션바 내용 변경
  let top_option;
  if (tap === 'List') {
    top_option = (
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
    );
  } else if (tap === 'Test') {
    top_option = (
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
            id="btn_Explain"
            onClick={(e) => {
              e.preventDefault();
              dispatch(warnFuncChange('WORDSET_EXPLAIN'));
              dispatch(modalWarnToggle(true));
            }}
          >
            How to use this?
          </button>
        </form>
      </div>
    );
  } else if (tap === 'SignIn') {
    top_option = (
      <div className="top_option divcenter">
        <div className="signInWarning">
          warning : You can't see your off-line wordset when you sign-in
        </div>
      </div>
    );
  } else if (tap === 'SignUp') {
    top_option = (
      <div className="top_option divcenter">
        <div className="signInWarning">
          warning : You can't see your off-line wordset when you sign-in
        </div>
      </div>
    );
  } else if (tap === 'MyPage') {
    top_option = (
      <div className="top_option signedIn">
        <div className="txtSignedIn">
          Welcome {userName ? userName : null} !!
        </div>
        <div className="divSignOut">
          <button
            className="btSignOut"
            onClick={(e) => {
              e.preventDefault();
              clickSignOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return top_option;
}
