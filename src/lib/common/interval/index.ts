
/**
 * interval -  用setTimeout实现setInterval
 * @param cb
 * @param delay
 * @returns
 */
export function interval(
  cb: (...args: unknown[]) => unknown,
  delay: number,
  immediate?: boolean
) {
  let timeId: NodeJS.Timeout;
  let timeCount = 0;
  const fn = () => {
    timeId = setTimeout(() => {
      fn();
      cb?.(++timeCount);
    }, delay);
  };
  if (immediate) cb?.();
  fn();
  return () => {
    clearTimeout(timeId);
  };
}
