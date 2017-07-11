import React from 'react';
import propTypes from 'prop-types';

const absoluteStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
};

export const Container = ({ style, children }) => (
  <div style={Object.assign(style, {
    position: 'relative',
  })}
  >
    {children}
  </div>
);

export const Track = ({ style, children }) => (
  <div style={Object.assign(style, absoluteStyle)}>
    {children}
  </div>
);

export const CompletedTrack = ({ style, children, func, time }) => (
  <div style={Object.assign(style, absoluteStyle, {
    transition: `width ${time}ms ${func}`,
  })}
  >
    {children}
  </div>
);

Container.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
};

Track.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
};

CompletedTrack.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
  func: propTypes.string,
  time: propTypes.number,
};
