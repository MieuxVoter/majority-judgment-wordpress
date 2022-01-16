import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Result from './components/Result';
import reportWebVitals from './reportWebVitals';


const targets = document.querySelectorAll('.mj-root');
Array.prototype.forEach.call(targets, target => {
  const id = target.dataset.id;
  const settings = window.mjSettings[id];
  ReactDOM.render(<Result name={settings.name} grades={settings.grades} />, target)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
