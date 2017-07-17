import React from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  Container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export const Container = ({ style, children }) => (
  <View style={[Styles.Container, style]}>
    {children}
  </View>
);

export const Block = ({ width, height, active, aColor, iaColor, style, children }) => (
  <View style={[{
    width: (width / 11),
    height: active ? height : (height * 2) / 3,
    backgroundColor: active ? aColor : iaColor,
  }, style]}
  >
    {children}
  </View>
);

Container.propTypes = {
  style: propTypes.object,
  children: propTypes.oneOfType([propTypes.element, propTypes.array]),
};

Block.propTypes = {
  style: propTypes.object,
  children: propTypes.element,
  active: propTypes.bool,
  aColor: propTypes.string,
  iaColor: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
};
