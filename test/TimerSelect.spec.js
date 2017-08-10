import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TimerSelect from '../app/TimerSelect';

describe('TimerSelect', () => {
  const nullFn = () => {};
  const defLabel = "Test Label";
  const defTime = 5;
  const defWrapper = shallow(
    <TimerSelect
      label={defLabel}
      time={defTime}
      updateFn={nullFn}
    />
  );

  it('displays HTML select element', () => {
    expect(defWrapper.find('select')).to.have.length(1);
  });

});
