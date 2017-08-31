import React from 'react';
import PropTypes from 'prop-types';
import { hoursMinutesStr } from './timer-util';

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

export default class TimerGraphBar extends React.Component {

  static get propTypes() {
    return {
      dayDate: PropTypes.string.isRequired,
      dayCount: PropTypes.number.isRequired,
      clickFn: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showDayForm: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickFn(this.props.dayDate, this.props.dayCount);
  }

  render() {
    return (
      <li key={this.props.dayDate} >
        <span
          className="graphBarShadow"
          style={{
            display: (this.props.dayCount > 0) ? 'block' : 'none',
            height: `${dayCountToHeightShadow(this.props.dayCount)}%`,
            marginLeft: `${skewCompensation(this.props.dayCount)}%`,
          }}
        />
        <a
          href="#EditTimeWorked"
          onClick={this.handleClick}
        >
          <span
            id={this.props.dayDate}
            title={hoursMinutesStr(this.props.dayDate * 60)}
            className="graphBar"
            style={{
              display: (this.props.dayCount > 0) ? 'block' : 'none',
              height: `${dayCountToHeight(this.props.dayCount)}%`,
            }}
          />
        </a>
      </li>
    );
  }
}
