const add = (a, b) => a + b;

// testing
test('Add 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
