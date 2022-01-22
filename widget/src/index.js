import React from 'react';
import ReactDOM from 'react-dom';
import Result from './components/Result';
import reportWebVitals from './reportWebVitals';
import './semantic/dist/semantic.min.css'
import './fonts/silka.css';
import './index.css';


const targets = document.querySelectorAll('.mj-root');
console.log(targets)
Array.prototype.forEach.call(targets, target => {
  const id = target.dataset.id;
  const defaultSettings = {
    name: 'My Candidate',
    grades: "1;2;8;190;10",
    rank: 2
  }
  const settings = window.mjSettings ? window.mjSettings[id] : defaultSettings;
  const grades = settings.grades.split(";").map(g => parseInt(g))

  ReactDOM.render(<Result name={settings.name} grades={grades} rank={settings.rank} />, target)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
