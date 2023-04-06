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

export interface TraverseFn {
  (item: Record<string, unknown>, parents: Record<string, unknown>[]): any;
}

/**
 * traverseTrees
 * @param trees
 * @param cb
 */
export function traverseTrees(
  trees: Record<string, unknown>[] = [],
  cb?: TraverseFn
) {
  const stack = [...trees];
  const contextStack: Record<string, unknown>[][] = [];
  while (stack.length) {
    const item = stack.shift()!;
    const context = contextStack.shift() || [];
    cb?.(item, context);
    if (Array.isArray(item?.children)) {
      stack.unshift(...(item?.children || []));
      contextStack.unshift(
        ...new Array(item?.children.length).fill([...context, item])
      );
    }
  }
}

/**
 * treesMap
 * @param trees
 */
export function treesMap(
  trees: Record<string, unknown>[] = [],
  cb?: TraverseFn
) {
  const res: Record<string, unknown>[] = [];
  const contextMap = new Map();
  traverseTrees(trees, (item, parents) => {
    const i: Record<string, unknown> = {
      ...(cb?.({ ...item }, parents) || item),
      children: undefined,
    };
    contextMap.set(item, i);
    if (parents?.length) {
      const context = parents.at(-1);
      if (contextMap.get(context)) {
        contextMap.get(context).children =
          contextMap.get(context).children || [];
        contextMap.get(context).children.push(i);
      }
    } else {
      res.push(i);
    }
  });
  contextMap.clear();
  return res;
}
