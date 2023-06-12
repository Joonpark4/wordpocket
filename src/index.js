import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// App.js
Modal.setAppElement('#root')