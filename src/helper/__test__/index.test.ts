import { isBrowser, isNode, } from "..";

test("test constant: isBrowser", () => {
  expect(isBrowser).toBe(false);
});

test("test constant: isNode", () => {
  expect(isNode).toBe(true);
});
