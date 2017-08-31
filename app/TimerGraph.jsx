import React from 'react';
import DayForm from './DayForm';
import TimerGraphBar from './TimerGraphBar';
import { TimerStore } from './TimerStore';
import { todayStrLess } from './timer-util';

export default class TimerGraph extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDayForm: false,
      clickDay: undefined,
      clickTimeWorked: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
    this.hideDayForm = this.hideDayForm.bind(this);
  }

  handleClick(dayDate, dayCount) {
    this.setState({
      showDayForm: true,
      clickDay: dayDate,
      clickTime: dayCount,
    });
  }

  hideDayForm() {
    this.setState({
      showDayForm: false,
      clickDay: undefined,
      clickTime: undefined,
    });
  }

  render() {
    const days = TimerStore.getDayStats();
    // Pad dates with empties so graph doesn't look weird.
    if (days.length < 7) {
      for (let i = days.length; i < 7; i += 1) {
        days[i] = TimerStore.newEntry(todayStrLess(new Date(), i));
        days[i].date += 'Padding'; // Avoid conflict with actual data
      }
    }
    days.reverse();

    return (
      <div>
        {
          this.state.showDayForm ?
            <DayForm
              day={this.state.clickDay}
              workTime={this.state.clickTime}
              hideFormFn={this.hideDayForm}
            />
          : null
        }
        <ul className="timerGraph">
          {
            days.map(day => (
              <TimerGraphBar
                key={day.date}
                dayDate={day.date}
                dayCount={day.count}
                clickFn={this.handleClick}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}
