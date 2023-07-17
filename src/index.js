import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import store from './component/Redux/Store'
import ListPage from './Router/ListPage'; // 페이지 테스트용
import TestPage from './Router/TestPage'; // 페이지 테스트용

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
    {/* <ListPage/> */}
    {/* <TestPage/> */}
  </Provider>
);

// App.js
Modal.setAppElement('#root');
