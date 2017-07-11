import React from 'react';
import propTypes from 'prop-types';

import { Container, Overflow, Circle } from './helpers/subComponents';

class HalfCircleProgressor extends React.Component {
  /* Converting a value (0-100)% to degrees.
   * 100% = 180°; ° = % * 1.8
   * 45 is to add to rotation to have our progress start at the bottom
   */
  valueToDegrees = val => 45 + (val * 1.8);

  render() {
    const {
      size,

      progress,

      circleHeight,
      circleColor,
      progressColor,

      transitionFunc,
      transitionDuration,
    } = this.props;

    const overflowHeight = size / 2;
    let currentProgress = progress;

    if (progress > 100) currentProgress = 100;
    if (progress < 0) currentProgress = 0;

    const rotateDegrees = this.valueToDegrees(currentProgress); // convert progress to degrees

    return (
      <Container
        style={{ width: size, height: size }}
      >
        <Overflow
          style={{ width: size, height: overflowHeight }}
        >

          <Circle
            progress={rotateDegrees}
            time={transitionDuration}
            func={transitionFunc}
            style={{ width: size, height: size }}
            bHeight={circleHeight} // Circle height (border-width)
            bColor={circleColor} // Circle color
            pColor={progressColor} // border-right, border-bottom color
          />

        </Overflow>
      </Container>
    );
  }
}


// Default props
HalfCircleProgressor.defaultProps = {
  size: 120,

  progress: 0,

  circleHeight: 5,
  circleColor: '#eee',
  progressColor: '#8DE969',

  transitionFunc: 'linear',
  transitionDuration: 200,
};

// Prop type checking
HalfCircleProgressor.propTypes = {
  size: propTypes.number.isRequired,

  progress: propTypes.number.isRequired,

  circleHeight: propTypes.number,
  circleColor: propTypes.string,
  progressColor: propTypes.string,

  transitionFunc: propTypes.string,
  transitionDuration: propTypes.number,

};

export default HalfCircleProgressor;
