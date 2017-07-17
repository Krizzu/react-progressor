import React from 'react';
import propTypes from 'prop-types';
import Morph from 'art/morph/path';
import { View, ART } from 'react-native';
import { arc } from 'd3-shape';
import { scaleProgressToRadius } from './helpers/helperFunctions';


const { Surface, Shape, Group, Transform } = ART;

class FillCircle extends React.Component {
  state = {
    completedCircle: '',
  }

  componentDidMount() {
    this.computeState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeState(nextProps);
  }

  computeState = (props) => {
    // progress to be kept between 1 and 100
    // set progress to 1 to avoid 'moving circle' at the beginning
    let prog = props.progress;
    if (prog > 100) {
      prog = 100;
    } else if (prog < 1) {
      prog = 1;
    }

    // create circle and update state with it
    const completedCircle = this.makeCircle(prog);
    this.setState({
      completedCircle,
    });

    // if there is no previous circle, make it now.
    if (!this.prevCircle) this.prevCircle = completedCircle;

    // If props are the same, don't animate it.
    if (this.props.progress !== props.progress) {
      const circleFrom = this.prevCircle;
      const circleTo = completedCircle;

      cancelAnimationFrame(this.playingAnim);
      this.playingAnim = null;

      this.setState({
        completedCircle: Morph.Tween(
          circleFrom,
          circleTo,
        ),
      }, () => {
        this.animate();
      });

      this.prevCircle = completedCircle;
    }
  }


  animate = (start) => {
    const { animDuration } = this.props;
    const { completedCircle } = this.state;
    this.playingAnim = null;
    this.playingAnim = requestAnimationFrame((timeStamp) => {
      if (!start) start = timeStamp;


      const dt = (timeStamp - start) / animDuration;

      if (dt > 1) {
        this.playingAnim = null;
        this.setState({ completedCircle: this.prevCircle });
        return;
      }

      if (completedCircle.tween) {
        completedCircle.tween(dt);
      }
      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }

  makeCircle = (val) => {
    const { size } = this.props;
    const ringSize = size * 0.45;

    const s = this.scaleProgress(val);

    const newCircle = arc()
      .innerRadius(ringSize)
      .outerRadius(s)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    return newCircle();
  }

  scaleProgress = scaleProgressToRadius(this.props.size * 0.45);


  render() {
    const { size, activeColor, inactiveColor, progress } = this.props;
    const { completedCircle } = this.state;
    const moveTo = (x, y) => new Transform().translate(x, y);

    const ringSize = size * 0.45;

    const ringPath = arc()
      .innerRadius(ringSize)
      .outerRadius(0)
      .startAngle(0)
      .endAngle(Math.PI * 2);


    return (
      <View style={{ flex: 1 }}>

        <Surface width={size} height={size}>
          <Group transform={moveTo(size / 2, size / 2)}>

            <Shape fill={progress ? activeColor : inactiveColor} d={ringPath()} />
            <Shape fill={inactiveColor} d={completedCircle} />

          </Group>
        </Surface>

      </View>
    );
  }
}

FillCircle.defaultProps = {
  progress: 0,

  activeColor: '#8DE969',
  inactiveColor: '#eee',

  size: 150,

  animDuration: 100,

};

FillCircle.propTypes = {
  progress: propTypes.number.isRequired,

  activeColor: propTypes.string,
  inactiveColor: propTypes.string,

  size: propTypes.number.isRequired,
  animDuration: propTypes.number,
};

export default FillCircle;
