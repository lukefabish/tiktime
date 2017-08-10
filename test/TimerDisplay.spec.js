import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TimerDisplay from '../app/TimerDisplay.jsx';

describe('TimerDisplay', () => {
  const nullFn = () => {};

  it('displays 0 as padded-zero time', () => {
    const wrapper = shallow(
      <TimerDisplay
        timerVal={0}
        timing={false}
        toggleTimerFn={nullFn}
        resetTimerFn={nullFn}
      />
    );

    expect(wrapper.find('.timeRemaining').text()).to.equal('00:00');
  });
});
