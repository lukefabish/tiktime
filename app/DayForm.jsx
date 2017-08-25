import React from 'react';
import PropTypes from 'prop-types';

export default class DayForm extends React.Component {

  static get propTypes() {
    return {
      hideFormFn: PropTypes.func.isRequired,
      day: PropTypes.number.isRequired,
      workTime: PropTypes.number.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.hideFormFn();
  }

  render() {
    return (
      <div className="dayFormContainer">
        <form id="timeWorkedForm" onSubmit={this.handleSubmit}>
          <label htmlFor="timeWorked">Update time worked</label>
          <input id="timeWorked" type="text" />
          <input type="button" value="Cancel" />
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
