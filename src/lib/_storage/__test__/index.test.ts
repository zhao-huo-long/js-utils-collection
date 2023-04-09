/**
 * @jest-environment jsdom
 */

import { storageBuilder } from '..'

test("test storage", () => {
  const storage = storageBuilder()
  expect(storage.getItem('test')).toEqual(null);
  storage.setItem("name", "jerry.lee");
  storage.setItem("email", "lijiuyi1995@outlook.com");
  expect(storage.getItem('name')).toEqual("jerry.lee");
  expect(storage.getItem('email')).toEqual("lijiuyi1995@outlook.com");
})

test("test storage session", () => {
  const session = storageBuilder('sessionStorage')
  expect(session.getItem('test')).toEqual(null);
  session.setItem("name", "jerry.lee");
  session.setItem("email", "lijiuyi1995@outlook.com");
  expect(session.getItem('name')).toEqual("jerry.lee");
  expect(session.getItem('email')).toEqual("lijiuyi1995@outlook.com");
})
