import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import LineProgressor from './Line';


it('Renders correctly', () => {
  const tree = renderer.create(
    <LineProgressor />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
