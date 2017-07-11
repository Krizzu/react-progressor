import React from 'react';
import propTypes from 'prop-types';

import { Container, Track, CompletedTrack } from './helpers/subComponents';

class LineProgressor extends React.Component {
  valueInterpolate = (val) => {
    const { width = 150 } = this.props;
    return ((val / 100) * width);
  }

  render() {
    const {
      width,
      height,
      progress,

      trackColor,
      progressColor,

      transitionFunc,
      transitionDuration,
    } = this.props;

    // Calculate a width of progress based on passed 'progress' prop
    const interpolatedProgress = this.valueInterpolate(progress);

    // if this calculated width is bigger than width passed, do not exceed it
    const currentProgress = this.valueInterpolate(progress) > width ? width : interpolatedProgress;

    return (
      <Container
        style={{ width, height }}
      >

        <Track
          style={{ width, height, backgroundColor: trackColor }}
        />

        <CompletedTrack
          func={transitionFunc}
          time={transitionDuration}
          style={{ height, width: currentProgress, backgroundColor: progressColor }}
        />

      </Container>
    );
  }
}

// Default values for props
LineProgressor.defaultProps = {
  width: 150,
  height: 5,
  progress: 0,

  trackColor: '#eee',
  progressColor: '#8DE969',

  transitionFunc: 'linear',
  transitionDuration: 200,

};

// Prop type checking
LineProgressor.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number,

  progress: propTypes.number.isRequired,

  trackColor: propTypes.string,
  progressColor: propTypes.string,

  transitionFunc: propTypes.string,
  transitionDuration: propTypes.number,
};

export default LineProgressor;
