import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TimerSelect from '../app/TimerSelect';

describe('TimerSelect', () => {
  const nullFn = () => {};
  const activeOpacity = 1;
  const inactiveOpacity = 0.4;
  const defLabel = "Test Label";
  const defTime = 5;
  const defWrapper = shallow(
    <TimerSelect
      label={defLabel}
      time={defTime}
      updateFn={nullFn}
      active={true}
    />
  );

  const inactiveWrapper = shallow(
    <TimerSelect
      label={defLabel}
      time={defTime}
      updateFn={nullFn}
      active={false}
    />
  );

  it('displays HTML select element', () => {
    expect(defWrapper.find('select')).to.have.length(1);
  });

  it('displays HTML label element', () => {
    expect(defWrapper.find('label')).to.have.length(1);
  });

  it(`has opacity of ${activeOpacity} when active is true`, () => {
    const lbl = defWrapper.find('label')
    expect(lbl.prop('style').opacity).to.equal(activeOpacity);
  });

  it(`has opacity of ${inactiveOpacity} when active is false`, () => {
    const lbl = inactiveWrapper.find('label')
    expect(lbl.prop('style').opacity).to.equal(inactiveOpacity);
  });
});
