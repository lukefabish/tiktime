import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TimerForm from '../app/TimerForm';
import TimerSelect from '../app/TimerSelect';

describe('TimerForm', () => {
  const nullFn = () => {};

  const defaultWrapper = shallow(
    <TimerForm
      workTime={5}
      restTime={5}
      updateWorkTimeFn={nullFn}
      updateRestTimeFn={nullFn}
      timingWork={true}
    />
  );

  it('displays HTML form element', () => {
    expect(defaultWrapper.find('form')).to.have.length(1);
  });

  it('displays two TimerSelect components', () => {
    expect(defaultWrapper.find(TimerSelect)).to.have.length(2);
  });
});
