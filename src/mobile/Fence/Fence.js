import React from 'react';
import propTypes from 'prop-types';
import { LayoutAnimation, NativeModules } from 'react-native';

import { Container, Block } from './helpers/subcomponents';

/*
  Using Layout animation.
  To make it work on android, we need to enable it first.
*/
const { UIManager } = NativeModules; // eslint-disable-line
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


class FenceProgressor extends React.Component {
  componentWillReceiveProps(nextProps: Object) {
    const { progress, animDuration, animEasing } = this.props;

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

  render() {
    const {
      progress,

      blockNumber,

      width,
      height,

      activeColor,
      inactiveColor,
    } = this.props;

    let activeBlocks = new Array(blockNumber).fill(false);
    let currentProgress = progress;

    if (currentProgress > 100) {
      currentProgress = 100;
    } else if (currentProgress < 0) {
      currentProgress = 0;
    }

    // Get an array of true/false to determine if block should be active or not
    activeBlocks = activeBlocks.map((block, i) => {
      const activeBlockNumber = Math.floor((currentProgress * blockNumber) / 100);

      return i <= activeBlockNumber - 1;
    });


    return (
      <Container style={{ width, height }}>

        {activeBlocks.map((_, i) => (
          <Block
            key={i}
            width={width}
            height={height}
            aColor={activeColor}
            iaColor={inactiveColor}
            active={activeBlocks[i]}
          />),
        )}

      </Container>
    );
  }
}

FenceProgressor.defaultProps = {
  progress: 0,

  blockNumber: 10,

  width: 200,
  height: 30,

  activeColor: '#8DE969',
  inactiveColor: '#eee',

  animDuration: 400,
  animEasing: 'spring',
};


FenceProgressor.propTypes = {
  progress: propTypes.number.isRequired,

  blockNumber: propTypes.number,

  width: propTypes.number.isRequired,
  height: propTypes.number,

  activeColor: propTypes.string,
  inactiveColor: propTypes.string,

  animDuration: propTypes.number,
  animEasing: propTypes.string,
};

export default FenceProgressor;
