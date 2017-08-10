import React from 'react';
import PropTypes from 'prop-types';
import TimerSelect from './TimerSelect';

export default class TimerForm extends React.Component {

  static get propTypes() {
    return {
      updateWorkTimeFn: PropTypes.func.isRequired,
      updateRestTimeFn: PropTypes.func.isRequired,
      workTime: PropTypes.number.isRequired,
      restTime: PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleWorkTimeChange = this.handleWorkTimeChange.bind(this);
    this.handleRestTimeChange = this.handleRestTimeChange.bind(this);
  }

  handleWorkTimeChange(timeVal) {
    this.props.updateWorkTimeFn(timeVal);
  }

  handleRestTimeChange(timeVal) {
    this.props.updateRestTimeFn(timeVal);
  }

  render() {
    return (
      <form>
        <TimerSelect
          label="Work:"
          time={this.props.workTime}
          updateFn={this.handleWorkTimeChange}
        />
        <TimerSelect
          label="Rest:"
          time={this.props.restTime}
          updateFn={this.handleRestTimeChange}
        />
      </form>
    );
  }
}
