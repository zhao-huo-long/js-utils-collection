import { fakeRequest, wait, toStringBox } from "..";

jest.spyOn(global, "setTimeout");

afterEach(() => {
  jest.resetAllMocks();
});

test("test fn wait", async () => {
  await wait(2000);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);

  await wait();
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test(`test fn fakeRequest`, async () => {
  return fakeRequest(
    {
      msg: "hello world",
    },
    3000
  ).then((i) => {
    expect(i).toEqual({ msg: "hello world" });
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

test(`test fn toStringBox`, async () => {
  const fn = jest.fn(() => { })
  await toStringBox(`hello world`).pipelineChar(fn, { speed: 1, })
  expect(fn).toHaveBeenCalledTimes(11)
}, 500);
