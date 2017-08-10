import React from 'react';
import PropTypes from 'prop-types';
import { timeStr } from './timer-util';

export default function TimerDisplay(props) {
  return (
    <div className="timerDisplay">
      <div className="timeRemaining">{timeStr(props.timerVal)}</div>
      <div id="timerButtons">
        {
          props.timing ?
            <button className="left" onClick={props.toggleTimerFn}>
              <div className="buttonInner pause" />
            </button>
            : <button className="left" onClick={props.toggleTimerFn}>
              <div className="buttonInner start" />
            </button>
        }
        <button className="right" onClick={props.resetTimerFn}>
          <div className="buttonInner reset" />
        </button>
      </div>
    </div>
  );
}

TimerDisplay.propTypes = {
  timerVal: PropTypes.number.isRequired,
  timing: PropTypes.bool.isRequired,
  toggleTimerFn: PropTypes.func.isRequired,
  resetTimerFn: PropTypes.func.isRequired,
};
