import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AudioMute from '../app/AudioMute';

describe('AudioMute', () => {
  const nullFn = () => {};
  const expectedElement = 'button';
  const audioOnImg = "url('img/speaker-vol.png')";
  const audioOffImg = "url('img/speaker-no-vol.png')";

  const defaultWrapper = shallow(
    <AudioMute
      muted={false}
      clickFn={nullFn}
    />
  );

  it('displays image', () => {
    expect(defaultWrapper.find(expectedElement)).to.have.length(1);
  });

  it('displays "audio on" image with muted is false', () => {
    let theImage = defaultWrapper.find(expectedElement);
    expect(theImage.prop('style').backgroundImage).to.equal(audioOnImg);
  });

  it('displays "audio off" image with muted is true', () => {
    const wrapper = shallow(
      <AudioMute
        muted={true}
        clickFn={nullFn}
      />
    );

    let theImage = wrapper.find(expectedElement);
    expect(theImage.prop('style').backgroundImage).to.equal(audioOffImg);
  });

  it('execute clickFn property function when clicked', () => {
    let clickFn_spy = sinon.spy();
    const wrapper = shallow(
      <AudioMute
        muted={true}
        clickFn={clickFn_spy}
      />
    );
    let theImage = wrapper.find(expectedElement);
    theImage.simulate('click');
    expect(clickFn_spy.calledOnce).to.be.true;
  });

});
