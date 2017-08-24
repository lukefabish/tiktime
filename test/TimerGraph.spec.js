import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TimerGraph from '../app/TimerGraph.jsx';

describe('TimerGraph', () => {
  const nullFn = ()=>{};

  it('has 7 x 2 spans', () => {
    const wrapper = mount(<TimerGraph graphClickFn={nullFn} />);
    expect(wrapper.find('span')).to.have.length(14);
  });

  it('executes click-handler on click', () => {
    const clickSpy = sinon.spy();
    const wrapper = mount(<TimerGraph graphClickFn={clickSpy}/>);
    const graphBars = wrapper.find('span[className="graphBar"]');
    graphBars.at(1).simulate('click');
    expect(clickSpy.calledOnce).to.be.true;
  });
});
