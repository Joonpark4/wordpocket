/*eslint-disable*/
import React from 'react';
import { useState, useEffect } from 'react';

function List({words, setWords}) {
  // 변수 words 가 변경될때마다 words의 배열값을 로컬스토리지에 저장시킨다.
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  // 로컬스토리지에 저장된 배열 words가 변경될 때마다 배열을 재탐색하여 index+1이 되는 속성값을 id에 저장한다.
  useEffect(() => {
    function resetIds(words) {
      return words.map((word, index) => ({ ...word, id: index + 1 }));
    }
    let storedWords = localStorage.getItem('words');
    setWords(resetIds(JSON.parse(storedWords)));
  }, [localStorage.getItem('words')]);

  return (
    <>
      {words.map((word) => (
        <div className="list" key={word.id}>
          <div className="list_top">
            <div className="list_left">{word.left}</div>
            <div className="list_right">{word.right}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default List;
