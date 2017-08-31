import { todayStr, undef } from './timer-util';

const TIMER_DATES = 'timer-dates';

const TimerStore = {
  incToday(howMuch = 1) {
    const today = todayStr();
    let dates = this.getDayStats();

    if (!this.recordedToday(today, dates)) {
      dates = this.addToday(today, dates);
    }

    dates[0].count += howMuch;

    if (dates.length > 7) {
      dates.pop();
    }

    localStorage.setItem(TIMER_DATES, JSON.stringify(dates));
  },

  setHoursWorked(forDate, minutesWorked) {
    const dates = this.getDayStats();
    for (let i = 0; i < dates.length; i += 1) {
      if (dates[i].date === forDate) {
        dates[i].count = minutesWorked;
        break;
      }
    }
    localStorage.setItem(TIMER_DATES, JSON.stringify(dates));
  },

  addToday(today = todayStr(), dates = this.getDayStats()) {
    dates.unshift(this.newEntry(today));
    return dates;
  },

  recordedToday(today = todayStr(), dates = this.getDayStats()) {
    let result = false;
    if (dates.length > 0) {
      if (dates[0].date === today) {
        result = true;
      }
    }

    return result;
  },

  getDayStats() {
    let dates = JSON.parse(localStorage.getItem(TIMER_DATES));

    if (undef(dates) || dates === null) {
      dates = [];
    }

    return dates;
  },

  newEntry(dateStr) {
    return {
      date: dateStr,
      count: 0,
    };
  },
};

module.exports = { TimerStore };
