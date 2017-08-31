import React from 'react';
import PropTypes from 'prop-types';
import { TimerStore } from './TimerStore';

export default class DayForm extends React.Component {

  static get propTypes() {
    return {
      hideFormFn: PropTypes.func.isRequired,
      day: PropTypes.string.isRequired,
      workTime: PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      newWorkTime: props.workTime,
      validationMsg: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.emitValidationMsg = this.emitValidationMsg.bind(this);
  }

  handleChange(e) {
    this.setState({ newWorkTime: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const asNumber = (m) => {
      if (typeof m === 'string') { return parseInt(m, 10); }
      return m;
    };

    const newWorkTime = asNumber(this.state.newWorkTime);
    if (newWorkTime > 720) {
      this.setState({ validationMsg: 'Maximum work time: 12 hours (720 minutes).' });
      return;
    }

    if (this.state.newWorkTime !== this.props.workTime) {
      TimerStore.setHoursWorked(this.props.day, newWorkTime);
    }

    this.props.hideFormFn();
  }

  handleCancelClick() {
    this.props.hideFormFn();
  }

  emitValidationMsg() {
    return this.state.validationMsg ?
      <div id="validationErr">{this.state.validationMsg}</div>
      : null;
  }

  render() {
    return (
      <div className="dayFormContainer">
        <form id="timeWorkedForm" onSubmit={this.handleSubmit}>
          <label htmlFor="timeWorked">Update minutes worked</label>
          { this.emitValidationMsg() }
          <input
            id="timeWorked"
            value={this.state.newWorkTime}
            type="number"
            onChange={this.handleChange}
          />
          <input type="button" value="Cancel" onClick={this.handleCancelClick} />
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
