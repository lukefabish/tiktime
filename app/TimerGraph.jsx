import React from 'react';
import PropTypes from 'prop-types';
import { TimerStore } from './TimerStore';
import { todayStrLess, hoursMinutesStr } from './timer-util';

function getRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function setSkew(degrees) {
  return Math.atan(getRadians(degrees));
}

function dayCountToHeight(dayCount) {
  const max = 12 * 60; // Max 12 hours work time / day!
  return (dayCount / (max / 100));
}

function dayCountToHeightShadow(dayCount) {
  return dayCountToHeight(dayCount) + (dayCountToHeight(dayCount) * 0.1);
}

function skewCompensation(dayCount) {
  const skewDeg = 10; // Must match CSS skew deg.
  return (setSkew(skewDeg) * dayCountToHeightShadow(dayCount)) + 18;
}

export default function TimerGraph(props) {
  const days = TimerStore.getDayStats();
  // Pad dates with empties so graph doesn't look weird.
  if (days.length < 7) {
    for (let i = days.length; i < 7; i += 1) {
      days[i] = TimerStore.newEntry(todayStrLess(new Date(), i));
      days[i].date += 'Padding'; // Avoid conflict with actual data
    }
  }
  days.reverse();

  const handleClick = (date, count) => {
    props.graphClickFn(date, count)
  }

  return (
    <ul className="timerGraph">
      {
        days.map(day => (
          <li key={day.date} >
            <span
              className="graphBarShadow"
              style={{
                display: (day.count > 0) ? 'block' : 'none',
                height: `${dayCountToHeightShadow(day.count)}%`,
                marginLeft: `${skewCompensation(day.count)}%`,
              }}
            />
            <a href="#EditTimeWorked">
              <span
                id={day.date}
                title={hoursMinutesStr(day.count * 60)}
                className="graphBar"
                onClick={handleClick.bind(this, day.date, day.count)}
                style={{
                  display: (day.count > 0) ? 'block' : 'none',
                  height: `${dayCountToHeight(day.count)}%`,
                }}
              />
            </a>
          </li>
        ))
      }
    </ul>
  );
}

TimerGraph.propTypes = {
  graphClickFn: PropTypes.func.isRequired,
};
