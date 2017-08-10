import React from 'react';
import PropTypes from 'prop-types';

export default function AudioMute(props) {
  let muteImg = 'img/speaker-vol.png';
  if (props.muted === true) {
    muteImg = 'img/speaker-no-vol.png';
  }

  const defaultDimension = '3em';
  const styles = {
    backgroundImage: `url('${muteImg}')`,
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    width: defaultDimension,
    height: defaultDimension,
  };

  return (
    <div className="audioMute">
      <button
        style={styles}
        onClick={props.clickFn}
      />
    </div>
  );
}

AudioMute.propTypes = {
  muted: PropTypes.bool.isRequired,
  clickFn: PropTypes.func.isRequired,
};
