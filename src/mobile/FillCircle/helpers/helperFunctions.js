import { scaleLinear } from 'd3-scale';

export const scaleProgressToRadius = radius => scaleLinear()
  .domain([0, 100])
  .range([0, radius]);
