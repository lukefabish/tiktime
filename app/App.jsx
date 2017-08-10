import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';

export default function App() {
  return (
    <div className="timerApp">
      <h1>tikti<span className="meh1">.me</span></h1>
      <Timer />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('timer-content'),
);
