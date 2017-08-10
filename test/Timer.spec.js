import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Timer from '../app/Timer';
import AudioMute from '../app/AudioMute';

describe('Timer component', () => {

  const defaultWrapper = shallow( <Timer />);

  it('has an AudioMute component', () => {
    expect(defaultWrapper.find(AudioMute)).to.have.length(1);
  });

});
