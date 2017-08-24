import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DayForm from '../app/DayForm';

describe('DayForm', () => {
  const nullFn = () => {};

  const defaultWrapper = shallow(
    <DayForm
      workTime={5}
      day={5}
      updateTimeWorkedFn={nullFn}
    />
  );

  it('displays HTML form element', () => {
    expect(defaultWrapper.find('form')).to.have.length(1);
  });

  it('displays HTML input text element', () => {
    expect(defaultWrapper.find('input[type="text"]')).to.have.length(1);
  });

  it('displays HTML label element', () => {
    expect(defaultWrapper.find('label')).to.have.length(1);
  });

  it('displays HTML submit element', () => {
    expect(defaultWrapper.find('input[type="submit"]')).to.have.length(1);
  });

  it('displays HTML button element "Cancel"', () => {
    expect(defaultWrapper.find('button[value="Cancel"]')).to.have.length(1);
  });
});
