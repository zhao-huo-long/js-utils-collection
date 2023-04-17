import { fakeRequest, interval, wait } from "..";

// mock timer
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("test fn wait", () => {
  wait(2000);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);

  wait();
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test(`test fn fakeRequest`, () => {
  fakeRequest(
    {
      msg: "hello world",
    },
    3000
  ).then((i) => {
    expect(i).toEqual({ msg: "hello world" });
  });

  expect(setTimeout).toHaveBeenCalledTimes(3);
});

test(`test fn interval`, async () => {
  let i = 0;
});
