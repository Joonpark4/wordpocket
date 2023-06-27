/*eslint-disable*/
import React from 'react';

export default function TypingTest() {
  return (
    <div className="pageTypingTest">
      <div className="TypingTestUp">
        <span className='TypingTestText'>Qestion : </span>
        <input type="text" className="TypingTestQuestion" />
      </div>
      <div className="TypingTestDown">
        <span className='TypingTestText'>Answer : </span>
        <input type="text" className="TypingTestAnswer" placeholder='Your answer here' />
      </div>
    </div>
  );
}
