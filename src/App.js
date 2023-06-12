/*eslint-disable*/
import { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './component/List';
import ModalOkay from './component/ModalOkay';
import ModalAddWords from './component/ModalAddWords';
import ModalUpdateWords from './component/ModalUpdateWords';
import ModalDeleteWords from './component/ModalDeleteWords';

function App() {
  // 단어 수정, 삭제 모달
  const [modalUpdateWords, setModalUpdateWords] = useState(false)
  const [modalDeleteWords, setModalDeleteWords] = useState(false)
  const [updateId, setUpdateId] = useState(0);

  // 탭 선택
  const [tap, setTap] = useState('List');

  // 리스트 선택
  const [listSelect, setListSelect] = useState('Default List');

  // 먼저 useState로 words를 설정하여 setWords로 값이 변할때마다 리렌더링을 하도록 선언한다.
  // 이 때 storedWords라는 값에 로컬스토리지 words라는 이름의 배열값을 집어넣는데, words라는 이름으로 저장된 배열이 없다면 default_words 즉 기본으로 저장된 값을 storedWords에 저장하도록 한다. 그 후 storedWords는 words의 값이 된다
  const default_words = [
    { id: 1, left: 'Oi', right: 'Hey' },
    { id: 2, left: 'Cerveja', right: 'Beer' },
    { id: 3, left: 'Laranja', right: 'Orange' },
    { id: 4, left: 'Livro', right: 'Book' },
    { id: 5, left: 'Carta', right: 'Letter' },
    { id: 6, left: 'Chave', right: 'Key' },
    { id: 7, left: 'Gato', right: 'Cat' },
    { id: 8, left: 'Cachorro', right: 'Dog' },
    { id: 9, left: 'Como', right: 'Eat' },
    { id: 10, left: 'Bebo', right: 'Drink' },
    { id: 11, left: 'Casa', right: 'House' },
    { id: 12, left: 'Namorada', right: 'Girlfriend' },
  ];

  // 현재 선택된 리스트의 상태입니다. listSelect로 현재 선택된 리스트가 로컬스토리지에 있으면 그것을 가져다씁니다.
  // 만약 storedWords가 거짓이라면(listSelect변수의 이름과 같은 배열이름이 로컬스토리지에 없다면)
  // 미리 저장된 default_words를 가져다 씁니다.
  // 리스트 정렬과 리렌더 관련 코드는 List.jsx에 있고, 리스트 내 단어 생성 관련 코드는 ModalAddWords.jsx에 있습니다.
  const [words, setWords] = useState(() => {
    let storedWords = localStorage.getItem(listSelect);
    return storedWords ? JSON.parse(storedWords) : default_words;
  });


  // 탭에 따른 섹션 내용 변경
  let section;
  if (tap === 'List') {
    section = <List words={words} setWords={setWords} listSelect={listSelect} modalUpdateWords={modalUpdateWords} setModalUpdateWords={setModalUpdateWords} setUpdateId={setUpdateId} setModalDeleteWords={setModalDeleteWords} />;
  } else if (tap === 'Test') {
    section = <div className="warning">Test 탭은 준비중입니다.</div>;
  } else if (tap === 'Online') {
    section = <div className="warning">Online 탭은 준비중입니다.</div>;
  }

  // 기능 경고 모달
  const [modalWarn, setModalWarn] = useState(false)

  // 단어 생성 모달
  const [modalAddWords, setModalAddWords] = useState(false)

  return (
    <div className="App">
      {/* 타이틀 */}
      <div className="black-nav">Word Pocket</div>

      {/* 상단옵션바 */}
      <div className="top_option">
        <form action="#">
          <select className="dropdown" name="listname" id="listname" onChange={(e)=>{setListSelect(e.target.value);}} value={listSelect}>
            <option value="Default List">Default List</option>
            <option value="Basic Words">Basic Words</option>
            <option value="interrogative">Interrogative</option>
          </select>
          <button id="btn_ListAdd">Add List</button>
          <button id="btn_ListAdd">Mod List</button>
          <button id="btn_ListAdd">Del List</button>
        </form>
      </div>

      {/* 섹션 */}
      <div className="section">{section}</div>

      {/* 하단옵션바 */}
      <div className="bottom_option">
        <div>
          <div className="btn_option list_option">
            Hide<br />Words
          </div>
          <div className="btn_option list_option">Opposite</div>
          <div className="btn_option list_option" onClick={() => setModalAddWords(true)}>
            Add<br />Words
          </div>
          <div className="btn_option list_option"
            onClick={() => setModalWarn(true)}>
            Delete<br />List
          </div>
        </div>
      </div>

      {/* 탭 페이지 */}
      <div className="tap_page">
        <div className="btn" onClick={() => { setTap('List'); }}>
          List
        </div>
        <div className="btn" onClick={() => {setTap('Test');}}>
          Test
        </div>
        <div className="btn" onClick={() => {setTap('Online');}}>
          Online
        </div>
      </div>
      

      <ModalOkay modalWarn={modalWarn} setModalWarn={setModalWarn} />
      <ModalAddWords words={words} setWords={setWords} modalAddWords={modalAddWords} setModalAddWords={setModalAddWords} />
      <ModalUpdateWords words={words} setWords={setWords} modalUpdateWords={modalUpdateWords} setModalUpdateWords={setModalUpdateWords} updateId={updateId} />
      <ModalDeleteWords words={words} setWords={setWords} modalDeleteWords={modalDeleteWords} setModalDeleteWords={setModalDeleteWords} updateId={updateId} />
    </div>
  );
}

export default App;
