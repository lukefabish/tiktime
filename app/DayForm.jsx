import React from 'react';
import PropTypes from 'prop-types';

export default class DayForm extends React.Component {

  static get propTypes() {
    return {
      updateTimeWorkedFn: PropTypes.func.isRequired,
      day: PropTypes.number.isRequired,
      workTime: PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(timeVal) {
    this.props.updateWorkTimeFn(timeVal);
  }

  render() {
    return (
      <form id="timeWorkedForm" onSubmit={this.handleSubmit}>
        <label htmlFor="timeWorked">Update time worked</label>
        <input id="timeWorked" type="text" />
        <input type="submit" value="Update"/>
        <button value="Cancel"/>
      </form>
    );
  }
}
