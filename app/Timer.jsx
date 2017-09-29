import React from 'react';
import TimerDisplay from './TimerDisplay';
import TimerForm from './TimerForm';
import TimerGraph from './TimerGraph';
import AudioMute from './AudioMute';
import { TimerStore } from './TimerStore';

export default class Timer extends React.Component {

  static playAudio(muted) {
    if (!muted) {
      const a = new Audio('audio/crash-acoustic.wav');
      // Default sound is super-loud
      a.volume = 0.1;
      a.play();
    }
  }

  constructor(props) {
    const DEFAULT_WORK = 25;
    const DEFAULT_REST = 5;

    super(props);
    this.state = {
      workTime: DEFAULT_WORK,
      restTime: DEFAULT_REST,
      timeRemaining: DEFAULT_WORK * 60000,
      timerIntRef: undefined,
      timing: true,
      timingWork: true,
      lastTimestamp: new Date().getTime(),
      lastTimeRecorded: -1,
      muted: false,
    };

    this.updateWorkTime = this.updateWorkTime.bind(this);
    this.updateRestTime = this.updateRestTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateTimeRemaining = this.updateTimeRemaining.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.endTimingPeriod = this.endTimingPeriod.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
  }

  componentDidMount() {
    this.startTimer(this.state.workTime);
  }

  updateWorkTime(timeValue) {
    let newTimeRemaining = this.state.timeRemaining;

    if (!this.state.timing) {
      newTimeRemaining = timeValue * 60000;
    }

    this.setState({
      workTime: timeValue,
      timingWork: true,
      timeRemaining: newTimeRemaining,
    });
  }

  updateRestTime(timeValue) {
    this.setState({
      restTime: timeValue,
    });
  }

  toggleTimer() {
    if (this.state.timing) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
    this.setState({ timing: !this.state.timing });
  }

  resetTimer() {
    this.stopTimer();
    this.setState({
      timing: false,
      timingWork: true,
      timeRemaining: this.state.workTime * 60000,
    });
  }

  endTimingPeriod() {
    Timer.playAudio(this.state.muted);

    if (this.state.timingWork) {
      // Finished work, so go on to rest period.
      this.setState({
        timingWork: false,
        timeRemaining: this.state.restTime * 60000,
      });
    } else {
      // Finished rest, so reset timer to work time,
      // and stop the timer.
      this.setState({
        timingWork: true,
        timeRemaining: this.state.workTime * 60000,
      });
      this.stopTimer();
    }
  }

  updateTimeRemaining() {
    const millisNow = new Date().getTime();
    const elapsedMillis = millisNow - this.state.lastTimestamp;
    const updatedTimeRemaining = this.state.timeRemaining - elapsedMillis;

    this.setState({ lastTimestamp: millisNow });

    if (updatedTimeRemaining <= 0) {
      this.endTimingPeriod();
    } else {
      if (this.state.timingWork) {
        // Make sure the graph has something to display, even
        // if a minute hasn't passed yet.
        if (!TimerStore.recordedToday()) {
          TimerStore.incToday(0);
        }

        const timeRemainingNearestK = Math.round(updatedTimeRemaining / 1000) * 1000;
        const alreadyRecorded = (timeRemainingNearestK === this.state.lastTimeRecorded);

        if (!alreadyRecorded && timeRemainingNearestK % 60000 === 0) {
          // Update count every minute we're working.
          TimerStore.incToday(1);
          // Make sure we don't count twice:
          this.setState({ lastTimeRecorded: timeRemainingNearestK });
        }
      }
      this.setState({
        timeRemaining: updatedTimeRemaining,
      });
    }
  }

  startTimer() {
    const intRef = setInterval(this.updateTimeRemaining, 333);
    this.setState({
      timerIntRef: intRef,
      timing: true,
      lastTimestamp: new Date().getTime(),
    });
  }

  stopTimer() {
    clearInterval(this.state.timerIntRef);
    this.setState({
      timerIntRef: undefined,
      timing: false,
    });
  }

  toggleAudio() {
    this.setState({ muted: (!this.state.muted) });
  }

  render() {
    return (
      <div>
        <AudioMute muted={this.state.muted} clickFn={this.toggleAudio} />
        <TimerForm
          workTime={this.state.workTime}
          updateWorkTimeFn={this.updateWorkTime}
          restTime={this.state.restTime}
          updateRestTimeFn={this.updateRestTime}
          timingWork={this.state.timingWork}
        />
        <TimerDisplay
          timerVal={this.state.timeRemaining / 1000}
          timing={this.state.timing}
          toggleTimerFn={this.toggleTimer}
          resetTimerFn={this.resetTimer}
        />
        <TimerGraph />
      </div>
    );
  }
}
