/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wordsChange, wordsetSelectChange } from './Redux/SliceWordset';
import { modalWarnToggle } from './Redux/SliceModalWarn';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { questionIdxUp, questionIdxChange } from './Redux/SliceQuestionIdx';

export default function TypingTest({ isMeaning }) {
  // 리덕스 툴킷 리모콘 사용
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const wordsR = useSelector((state) => {
    return state.wordset.words;
  });

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const questionIdx = useSelector((state) => {
    return state.questionIdx.value;
  });

  // 렌더링시 자동으로 포커스 맞추기
  const tb_Answer = useRef(null);
  useEffect(() => {
    setTbAnswer('');
    focusOn();
  }, [wordsR]);

  // 포커싱 함수
  const focusOn = () => {
    if (tb_Answer.current) {
      tb_Answer.current.focus();
    }
  };

  // 정답 텍스트박스
  const [tbAnswer, setTbAnswer] = useState('');

  // 서브밋(엔터 및 클릭 모두 해당)
  const handleSubmit = (event) => {
    event.preventDefault();
    clickSubmit();
  };
  // 클릭됐을 경우에 일어날 일
  const clickSubmit = () => {
    // 답안의 공백을 모두 없애고, 소문자로 변경
    let newTbAnswer = tbAnswer.replace(/(\s*)/g, '').toLowerCase();

    // 정답의 공백을 모두 없애고, 소문자로 변경 만약 isMeaning이 참이면 right 비교, 거짓이면 left 비교
    let newWordsR;
    if (isMeaning == true) {
      newWordsR = wordsR[questionIdx].right.replace(/(\s*)/g, '').toLowerCase();
    } else {
      newWordsR = wordsR[questionIdx].left.replace(/(\s*)/g, '').toLowerCase();
    }
    console.log(newTbAnswer);
    console.log(newWordsR);
    if (newTbAnswer === newWordsR) {
      alert('정답입니다.');
      setTbAnswer('');
      focusOn();
      if (questionIdx < wordsR.length - 1) {
        console.log('qestionIdx : ' + questionIdx);
        console.log('wordsR.length : ' + (wordsR.length - 1));
        dispatch(questionIdxUp());
      } else {
        dispatch(questionIdxChange());
      }
    } else {
      alert('오답입니다.');
      setTbAnswer('');
      focusOn();
    }
  };

  console.log(isMeaning);

  // 선택된 워드셋 안에 단어 갯수가 1보다 작다면 선택 불가
  if (wordsR.length < 1) {
    dispatch(modalWarnToggle(true));
    dispatch(warnFuncChange('WORDSET_NO_WORDS'));
    dispatch(wordsetSelectChange('Default Wordset'));
  }

  return (
    <div className="pageTypingTest">
      <div className="TypingTestUp">
        <span className="TypingTestText">Qestion : </span>
        <input
          type="text"
          className="TypingTestQuestion"
          // 아래는 isMeaning 값이 true 혹은 false 임에 따라 단어를 보고 뜻을 입력할지, 단어의 뜻을 보고 단어를 입력할지 정할 수 있다.
          value={
            // wordsR.length > 0 && questionIdx < wordsR.length
            //   ? wordsR[questionIdx].left
            //   : ''
            isMeaning ? wordsR[questionIdx].left : wordsR[questionIdx].right
          }
          disabled={true}
        />
      </div>
      <div className="TypingTestDown">
        <span className="TypingTestText">Answer : </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="TypingTestAnswer"
            placeholder="Your answer here"
            ref={tb_Answer}
            value={tbAnswer}
            onChange={(e) => {
              setTbAnswer(e.target.value);
            }}
          />
          <button type="submit" className="TypingTestSubmit">
            Answer submit!
          </button>
        </form>
      </div>
    </div>
  );
}
