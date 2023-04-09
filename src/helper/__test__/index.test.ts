import { isBrowser, isNode, isInt, isUint, isPositiveUnsignedInt } from '..'


test('test constant: isBrowser', () => {
  expect(isBrowser).toBe(false);
});

test('test constant: isNode', () => {
  expect(isNode).toBe(true);
});

test('test fn: isInt', () => {
  expect(isInt('1' as any)).toBe(false);
  expect(isInt('2' as any)).toBe(false);
  expect(isInt(3)).toBe(true);
  expect(isInt(0)).toBe(true);
  expect(isInt(-8)).toBe(true);
  expect(isInt(NaN)).toBe(false);
})

test('test fn: isUint', () => {
  expect(isUint('1' as any)).toBe(false);
  expect(isUint('2' as any)).toBe(false);
  expect(isUint(3)).toBe(true);
  expect(isUint(0)).toBe(true);
  expect(isUint(-8)).toBe(false);
  expect(isUint(NaN)).toBe(false);
})


test('test fn: isPositiveUnsignedInt', () => {
  expect(isPositiveUnsignedInt('1' as any)).toBe(false);
  expect(isPositiveUnsignedInt('2' as any)).toBe(false);
  expect(isPositiveUnsignedInt(3)).toBe(true);
  expect(isPositiveUnsignedInt(0)).toBe(false);
  expect(isPositiveUnsignedInt(-8)).toBe(false);
  expect(isPositiveUnsignedInt(NaN)).toBe(false);
})


