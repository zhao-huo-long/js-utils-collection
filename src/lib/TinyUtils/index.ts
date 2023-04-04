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

/**
 * reqFaker - 模拟ajax的等待,返回效果
 * @param body
 * @param delay
 * @returns
 */
export async function reqFaker<T>(body: T, delay = 1000) {
  await wait(delay);
  return body;
}

/**
 * interval -  用setTimeout实现setInterval
 * @param cb
 * @param delay
 * @returns
 */
export function interval(cb: (...args: unknown[]) => unknown, delay: number) {
  let timeId: NodeJS.Timeout;
  const clear = () => clearTimeout(timeId);
  const fn = () => {
    timeId = setTimeout(() => {
      cb();
      fn();
    }, delay);
  };
  fn();
  return clear;
}

export type Tree = {
  children?: Tree[];
  [key: string]: unknown;
};

export function treeToMap<M extends Tree>(
  tree: M[],
  key: keyof Omit<M, "children">
) {
  const arr = [...tree];
  const res: Record<string, Tree> = {};
  while (arr.length) {
    const item = arr.shift();
    if (Array.isArray(item?.children)) {
      arr.unshift(...(item!.children as M[]));
    }
    if (item?.[key]) {
      const m = item[key] as string;
      res[m] = { ...item, children: undefined };
    }
  }
  return res;
}
