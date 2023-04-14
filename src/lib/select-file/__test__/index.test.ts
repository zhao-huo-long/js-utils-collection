/**
 * @jest-environment jsdom
 */

import { filesChecker } from '..';

test("test select-file", () => {
  const txtA = new File(['test file content a'], 'test_a.file.txt',)
  const txtB = new File(['test file content b more txt'], 'test_b.file.txt',)
  expect(filesChecker([txtA], {
    minSize: 1,
    maxSize: 10,
  })[0],).toBe(true);

  expect(filesChecker([txtB], {
    minSize: 1,
    maxSize: 1024,
  })[0],).toBe(false);

  expect(filesChecker([txtA, txtB], {
    len: 1,
    minSize: 1,
    maxSize: 1024,
  })[0]).toBe(true)

  expect(filesChecker([txtA, txtB], {
    len: 10,
    minSize: 1,
    maxSize: 1024,
  })[0]).toBe(false)


  expect(filesChecker([txtA, txtB], {
    len: 10,
    minSize: 1,
    maxSize: 20,
  })[0]).toBe(true)
})
