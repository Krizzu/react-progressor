import React from 'react';
import renderer from 'react-test-renderer';

import HalfCircleProgressor from './HalfCircle';


test('It renders without errors', () => {
  const tree = renderer.create(
    <HalfCircleProgressor />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
