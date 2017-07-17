import React from 'react';
import propTypes from 'prop-types';

import { View, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  Container: {
    position: 'relative',
  },
  Absolute: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export const Container = ({ width, height, children, style }) => (
  <View style={[Styles.Container, { width, height }, style]}>
    {children}
  </View>
);

export const Track = ({ color, style, children }) => (
  <View style={[Styles.Absolute, { backgroundColor: color }, style]}>
    {children}
  </View>
);

export const ProgressTrack = ({ color, style, children }) => (
  <View style={[Styles.Absolute, { backgroundColor: color }, style]}>
    {children}
  </View>
);

Container.propTypes = {
  children: propTypes.any,
  style: propTypes.object,
  width: propTypes.number,
  height: propTypes.number,
};

Track.propTypes = {
  children: propTypes.element,
  style: propTypes.object,
  color: propTypes.string,
};

ProgressTrack.propTypes = {
  children: propTypes.element,
  style: propTypes.object,
  color: propTypes.string,
};
