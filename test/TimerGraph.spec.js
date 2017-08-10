import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import TimerGraph from '../app/TimerGraph.jsx';

describe('TimerGraph', () => {
  const nullFn = {};

  it('has 7 x 2 spans', () => {
    const wrapper = mount(<TimerGraph />);

    expect(wrapper.find('span')).to.have.length(14);
  });
});
