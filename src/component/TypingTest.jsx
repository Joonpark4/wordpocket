/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalWarnToggle } from './Redux/SliceModal';
import { warnFuncChange } from './Redux/SliceWarnFunc';
import { questionIdxUp, questionIdxChange } from './Redux/SliceQuestionIdx';
import { tapList } from './Redux/SliceTap';

export default function TypingTest() {
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

  // 리덕스 툴킷 사용 (뜻 테스트 변경 토글, 이전 이름 isMeaning)
  const isMeaning = useSelector((state) => {
    return state.bottomOption.meaning;
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

  // 정답이미지 보여주기
  const [correctImage, setCorrectImage] = useState(false);

  const showCorrectImg = () => {
    setCorrectImage(true);
    setTimeout(() => {
      setCorrectImage(false);
    }, 900); // 이미지 표시 후 0.9초(900 밀리초) 후에 이미지를 사라지게 합니다. 1초로 하니 css와 미묘하게 타이밍이 어긋남
  };

  // 오답이미지 보여주기
  const [inCorrectImage, setInCorrectImage] = useState(false);

  const showInCorrectImg = () => {
    setInCorrectImage(true);
    setTimeout(() => {
      setInCorrectImage(false);
    }, 900); // 이미지 표시 후 1초(1000 밀리초) 후에 이미지를 사라지게 합니다.
  };

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
    if (newTbAnswer === newWordsR) {
      showCorrectImg();
      setTbAnswer('');
      focusOn();
      if (questionIdx < wordsR.length - 1) {
        dispatch(questionIdxUp());
      } else {
        dispatch(questionIdxChange());
      }
    } else {
      showInCorrectImg();
      setTbAnswer('');
      focusOn();
    }
  };

  // 선택된 워드셋 안에 단어 갯수가 1보다 작다면 선택 불가
  if (wordsR.length < 1) {
    dispatch(tapList());
    dispatch(modalWarnToggle(true));
    dispatch(warnFuncChange('WORDSET_NO_WORDS'));
  }

  return (
    <div className="section">
      <div className="pageTypingTest">
        <div className="TypingTestUp">
          <span className="TypingTestText">Qestion : </span>
          <input
            type="text"
            className="TypingTestQuestion"
            // 아래는 isMeaning 값이 true 혹은 false 임에 따라 단어를 보고 뜻을 입력할지, 단어의 뜻을 보고 단어를 입력할지 정할 수 있다.
            // 또한 에러를 방지하기 위해 만약 현재 선택된 워드셋에 단어가 0보다 큰 경우에만 값을 가져오고, 아니면 공백으로 비워둔다.
            // 공백으로 비우는건 단순 에러를 피하기 위함, 즉시 워드셋에 단어가 없어도 상관없는 List단계로 넘어가기 때문에 치명적 오류를 피할 수 있다.
            value={
              wordsR.length > 0 && questionIdx < wordsR.length
                ? isMeaning
                  ? wordsR[questionIdx].left
                  : wordsR[questionIdx].right
                : ''
            }
            disabled={true}
          />
        </div>
        <div className="TypingTestDown">
          {/* 아래는 정답 이미지 */}
          {correctImage && (
            <img
              src={`${process.env.PUBLIC_URL}/checked.png`}
              alt="Checked"
              className="checked-image"
            />
          )}
          {/* 아래는 오답 이미지 */}
          {inCorrectImage && (
            <img
              src={`${process.env.PUBLIC_URL}/cancel.png`}
              alt="Cancel"
              className="cancel-image"
            />
          )}
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
    </div>
  );
}
