import React from 'react';
import propTypes from 'prop-types';

export const Container = ({ style, children }) => (
  <div style={Object.assign(style, {
    position: 'relative',
    display: 'inline-block',
  })}
  >
    {children}
  </div>
);

export const Overflow = ({ style, children }) => (
  <div style={Object.assign(style, {
    overflow: 'hidden',
    position: 'relative',
  })}
  >
    {children}
  </div>
);

export const Circle = ({ bHeight, bColor, pColor, progress, time, func, style, children }) => (
  <div style={Object.assign(style, {
    position: 'absolute',
    left: 0,
    top: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
  }, {
    transition: `transform ${time}ms ${func}`,
    transform: `rotate(${progress}deg)`,
    borderStyle: 'solid',
    borderWidth: bHeight,
    borderBottomColor: pColor,
    borderRightColor: pColor,
    borderTopColor: bColor,
    borderLeftColor: bColor,
  })}
  >
    {children}
  </div>
);

Container.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
};

Overflow.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
};

Circle.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
  bHeight: propTypes.number,
  bColor: propTypes.string,
  pColor: propTypes.string,
  progress: propTypes.number,
  time: propTypes.number,
  func: propTypes.string,
};
