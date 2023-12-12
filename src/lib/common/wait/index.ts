/**
 * wait - 阻塞一段时间的promise
 * @param delay - 延迟时间, 默认 1000ms
 * @returns
 */
export function wait(delay = 1000) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}
