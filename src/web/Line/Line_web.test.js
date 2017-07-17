import React from 'react';
import renderer from 'react-test-renderer';

import LineProgressor from './Line';


test('It renders without errors', () => {
  const tree = renderer.create(
    <LineProgressor />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
