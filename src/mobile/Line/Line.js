import React from 'react';
import propTypes from 'prop-types';
import { NativeModules, LayoutAnimation } from 'react-native';

import { Container, Track, ProgressTrack } from './helpers/subcomps';

/*
  Using Layout animation.
  To make it work on android, we need to enable it first.
*/
const { UIManager } = NativeModules; // eslint-disable-line
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class LineProgressor extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { progress, animDuration, animEasing } = this.props;

    // Config for LayoutAnimation
    const config = {
      duration: animDuration,
      update: {
        type: LayoutAnimation.Types[animEasing],
      },
    };

    if (progress !== nextProps.progress) {
      LayoutAnimation.configureNext(config);
    }
  }

  // Change value (0-100, from progress) to width
  valueInterpolate = (val) => {
    const { width = 150 } = this.props;
    return ((val / 100) * width);
  }

  render() {
    const {
      progress,

      width,
      height,

      trackColor,
      progressColor,
    } = this.props;

    let currentProgress = progress;

    if (currentProgress > 100) {
      currentProgress = 100;
    } else if (currentProgress < 0) {
      currentProgress = 0;
    }

    const fillWidth = this.valueInterpolate(currentProgress);

    return (
      <Container style={{ width, height }} >

        <Track
          color={trackColor}
          style={{ width, height }}
        />

        <ProgressTrack
          color={progressColor}
          style={{ width: fillWidth, height }}
        />

      </Container>
    );
  }
}

LineProgressor.defaultProps = {
  progress: 0,

  width: 200,
  height: 20,

  animDuration: 200,
  animEasing: 'easeInEaseOut',

  trackColor: '#eee',
  progressColor: '#8DE969',
};

LineProgressor.propTypes = {
  progress: propTypes.number.isRequired,

  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,

  animDuration: propTypes.number,
  animEasing: propTypes.string,

  trackColor: propTypes.string,
  progressColor: propTypes.string,
};

export default LineProgressor;
