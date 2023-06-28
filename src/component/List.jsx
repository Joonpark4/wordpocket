/*eslint-disable*/
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wordsChange } from './Redux/SliceWordset';
import { modalWordModToggle } from './Redux/SliceModal';
import { modalWordDelToggle } from './Redux/SliceModal';
import { updateIdChange } from './Redux/SliceUpdateId';

function List({ isHiding, isOpposit }) {
  const dispatch = useDispatch();

  // 리덕스 툴킷 사용 (선택된 워드셋과 변경, 이전 이름 listSelect)
  const wordsetSelect = useSelector((state) => {
    return state.wordset.value;
  });

  // 리덕스 툴킷 사용 (워드 리스트, 이전 이름 words)
  const wordsR = useSelector((state) => {
    return state.wordset.words;
  });
 /** 리덕스 상태관리로 이 부분을 처리함
  // 현재 선택된 리스트 wordsetSelect의 내용이 변경될 때 setWords의 상태를 변경시켜 줍니다.
  useEffect(() => {
    // 기본적으로 wordsetSelect 변수의 이름과 같은(현재 선택된) 배열을 storedWords 변수에 넣습니다.
    let storedWords = localStorage.getItem(wordsetSelect);
    // 만약 storedwords와 같은 이름의 배열이 로컬스토리지에 있다면,
    if (storedWords) {
      // 그것을 setWords에 넣어 현재 보이는 화면에 단어들을 출력합니다.
      // setWords(JSON.parse(storedWords));
      dispatch(wordsChange(JSON.parse(storedWords)));
    } else {
      // 그냥 선택된 리스트 이름(wordsetSelect 변수의 값)으로 로컬스토리지에 배열을 만들고 값으로 문자열 "[]"을 저장한다.
      localStorage.setItem(wordsetSelect, '[]');
      // 그것을 현재 보이는 화면에 출력하도록 설정한다.
      // setWords(wordsetSelect);
      dispatch(wordsChange(wordsetSelect));
    }
  }, [wordsetSelect]);
   */

  // 변수 words 가 변경될때마다 words의 배열값을 로컬스토리지에 저장시킨다.
  useEffect(() => {
    localStorage.setItem(wordsetSelect, JSON.stringify(wordsR));
  }, [wordsR]);

  // 로컬스토리지에 저장된 배열 words가 변경될 때마다 배열을 재탐색하여 index+1이 되는 속성값을 id에 저장한다.
  useEffect(() => {
    function resetIds(wordsR) {
      return wordsR.map((word, index) => ({ ...word, id: index + 1 }));
    }
    let storedWords = localStorage.getItem(wordsetSelect);
    // setWords(resetIds(JSON.parse(storedWords)));
    dispatch(wordsChange(resetIds(JSON.parse(storedWords))));
  }, [localStorage.getItem(wordsetSelect)]);

  // 선택시 아래로 버튼 내려오는것 상태 저장 스테이트.
  // 초기상태는 빈 객체로 시작합니다. 객체를 사용하는 이유는 아이디를 쉽게 조회하고 변경할 수 있기 때문입니다.
  const [selected, setSelected] = useState({});

  // handleClick 함수는 리스트 항목을 클릭할 때 호출되는 함수입니다.
  // 이 함수는 인자로 전달된 id를 사용하여 선택된 상태를 업데이트합니다.
  const handleClick = (id) => {
    // setSelected 함수를 사용하여 상태를 업데이트합니다. prevState는 이전 상태를 나타냅니다.
    setSelected((prevState) => {
      // 클릭한 항목이 이미 선택된 상태라면 해당 항목을 선택 해제합니다.
      if (prevState[id]) {
        // 선택 해제할 항목의 id 키 값을 false로 설정하고, 나머지 항목은 변경 없이 그대로 유지합니다.
        return { ...prevState, [id]: false }; // 선택 해제

        // 클릭한 항목이 선택되지 않은 상태라면 해당 항목을 선택합니다.
      } else {
        // 선택할 항목의 id 키 값을 true로 설정합니다. 그 외의 항목은 해제되어 있습니다.
        return { [id]: true }; // 다른 항목 선택
      }
    });
    // id 값을 상위컴포넌트, 최종적으로는 ModalUpdate와 ModalDelete에 전달하기 위함
    dispatch(updateIdChange(id));

  };

  // 선택된 항목 바깥 클릭 시 선택 해제
  // useEffect 정리 : 이 훅은 React 컴포넌트가 렌더링될 때마다, 반환될 때마다, 또는 의존성 목록의 변수가 변경될 때마다 부수 효과(side effect)를 수행합니다. 여기서는 의존성 목록([])이 빈 배열이므로, useEffect 내부의 함수는 컴포넌트가 마운트될 때만 실행되며, 반환되는 함수는 언마운트될 때 실행됩니다.

  useEffect(() => {
    // 이 함수는 클릭 이벤트 객체를 인자로 받아, 이벤트가 발생한 대상의 가장 가까운 상위 요소 중 CSS 클래스 .section 갖는 요소를 찾습니다(event.target.closest('.section')). 만약 그런 요소가 없다면, 클릭한 위치는 항목 바깥이라고 판단하고 setSelected({})를 호출하여 선택을 해제합니다.
    // top_option, bottom_option, tap_page 를 클릭할때로 수정 (이유 : 모달창을 클릭할 때 자꾸 선택이 풀리는 것이 어색해서)
    const handleOuterClick = (event) => {
      if (
        event.target.closest('.top_option') ||
        event.target.closest('.bottom_option') ||
        event.target.closest('.tap_page')
      ) {
        setSelected({});
      }
    };

    //document.addEventListener('click', handleOuterClick)를 통해 전체 문서에 대한 클릭 이벤트 리스너를 등록하고, handleOuterClick 함수를 이벤트 핸들러로 사용합니다. 이로써 모든 클릭 이벤트가 발생할 때마다 handleOuterClick 함수가 호출됩니다.
    document.addEventListener('click', handleOuterClick);
    return () => {
      //useEffect 내부에서 반환되는 함수는 컴포넌트가 언마운트될 때 실행됩니다. 여기서는 이벤트 리스너를 제거하는 함수인 document.removeEventListener('click', handleOuterClick)를 반환하므로, 컴포넌트가 언마운트될 때 등록된 클릭 이벤트 리스너가 제거됩니다. 이렇게 함으로써, 컴포넌트가 삭제되어도 클릭 이벤트 리스너가 계속 동작하여 발생할 수 있는 메모리 누수를 방지할 수 있습니다.
      document.removeEventListener('click', handleOuterClick);
    };
  }, []);

  const hidingClass = ['list_right', isHiding ? 'list_hiding' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {wordsR.map((word, i) => {
        const isSelected = selected[word.id];
        const classes = ['list', isSelected ? 'selected' : null]
          .filter(Boolean)
          .join(' '); // 공백을 포함시켜주어야 클래스명이 올바르게 동작 그렇지 않으면 클래스 사이에 쉼표처리됨

        return (
          <div
            className={classes}
            onClick={() => handleClick(word.id)}
            key={i}
          >
            {!isOpposit && (
              <div className="list_top">
                <div className="list_left">{word.left}</div>
                <div className={hidingClass}>{word.right}</div>
              </div>
            )}
            {isOpposit && (
              <div className="list_top">
                <div className="list_left">{word.right}</div>
                <div className={hidingClass}>{word.left}</div>
              </div>
            )}
            <div>
              {isSelected && (
                <div
                  className="list_bottom"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className="btn_list"
                    onClick={() => dispatch(modalWordModToggle(true))}
                  >
                    Update
                  </button>
                  <button
                    className="btn_list"
                    onClick={() => dispatch(modalWordDelToggle(true))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default List;
