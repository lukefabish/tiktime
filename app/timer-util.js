function zpad(val) {
  let toPad = parseInt(val, 10);
  if (val < 10) {
    toPad = `0${val}`;
  }
  return toPad;
}

const separator = ':';

function hms(totalSeconds) {
  const hours = Math.trunc(totalSeconds / 3600);
  const minutes = Math.trunc((totalSeconds % 3600) / 60);
  const secs = Math.trunc(totalSeconds - ((hours * 3600) + (minutes * 60)));

  return { h: hours, m: minutes, s: secs };
}

function timeStr(totalSeconds) {
  const t = hms(totalSeconds);
  return `${zpad(t.m)}${separator}${zpad(t.s)}`;
}

function hmsStr(totalSeconds) {
  const t = hms(totalSeconds);
  return `${zpad(t.h)}${separator}${zpad(t.m)}${separator}${zpad(t.s)}`;
}

function hoursMinutesStr(totalSeconds) {
  const t = hms(totalSeconds);
  const hourLabel = (t.h === 1) ? 'hour' : 'hours';
  const minuteLabel = (t.m === 1) ? 'minute' : 'minutes';
  return `${t.h} ${hourLabel}, ${t.m} ${minuteLabel}.`;
}

function todayStrLess(d, lessDays) {
  d.setDate(d.getDate() - lessDays);
  return `${d.getFullYear()}${zpad(d.getMonth() + 1)}${zpad(d.getDate())}`;
}

function todayStr(d = new Date()) {
  return todayStrLess(d, 0);
}

function undef(v) {
  return (typeof v === 'undefined');
}

module.exports = { zpad, timeStr, todayStr, todayStrLess, undef, hms, hmsStr, hoursMinutesStr };
