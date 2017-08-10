import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AudioMute from '../app/AudioMute';

describe('AudioMute', () => {
  const nullFn = () => {};
  const audioOnImg = "img/speaker-vol.png";
  const audioOffImg = "img/speaker-no-vol.png";

  const defaultWrapper = shallow(
    <AudioMute
      muteOn={false}
      clickFn={nullFn}
    />
  );

  it('displays image', () => {
    expect(defaultWrapper.find('img')).to.have.length(1);
  });

  it('displays "audio on" image with muteOn is false', () => {
    let theImage = defaultWrapper.find('img');
    expect(theImage.prop('src')).to.equal(audioOnImg);
  });

  it('displays "audio off" image with muteOn is true', () => {
    const wrapper = shallow(
      <AudioMute
        muteOn={true}
        clickFn={nullFn}
      />
    );

    let theImage = wrapper.find('img');
    expect(theImage.prop('src')).to.equal(audioOffImg);
  });

  it('execute clickFn property function when clicked', () => {
    let clickFn_spy = sinon.spy();
    const wrapper = shallow(
      <AudioMute
        muteOn={true}
        clickFn={clickFn_spy}
      />
    );
    let theImage = wrapper.find('img');
    theImage.simulate('click');
    expect(clickFn_spy.calledOnce).to.be.true;
  });

});
