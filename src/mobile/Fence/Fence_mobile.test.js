import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import FenceProgressor from './Fence';

it('Renders correctly', () => {
  const tree = renderer.create(
    <FenceProgressor />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
