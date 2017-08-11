import React from 'react';
import PropTypes from 'prop-types';

export default class TimerSelect extends React.Component {

  static get propTypes() {
    return {
      label: PropTypes.string.isRequired,
      updateFn: PropTypes.func.isRequired,
      time: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateFn(parseInt(e.target.value, 10));
  }

  render() {
    const activeOpacity = 1;
    const inactiveOpacity = 0.4;
    const styles = {
      opacity: this.props.active ? activeOpacity : inactiveOpacity,
    };
    const timeValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    return (
      <div>
        <label
          style={styles}
          htmlFor={this.props.label}
        >
          { this.props.label }
        </label>
        <select
          id={this.props.label}
          onChange={this.handleChange}
          value={this.props.time}
        >
          {
            timeValues.map(val => (
              <option key={val} value={val}>{val}</option>
            ))
          }
        </select>
      </div>
    );
  }
}
