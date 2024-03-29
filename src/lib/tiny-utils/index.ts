
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
export async function fakeRequest<T>(body: T, delay = 1000) {
  await wait(delay);
  return body;
}

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


export interface TPipelineOption {
  speed?: number
  signal?: AbortSignal
  mode?: "append" | "single"
}

export class StringBox extends String {
  public pipelineChar = (
    cb: (str: string, next: boolean) => void,
    optionOuter: TPipelineOption = {}
  ) => {
    const defaultOptions = { speed: 200, mode: 'append' }
    const option = Object.assign({}, defaultOptions, optionOuter)
    let index = 0
    return new Promise<void>((res, rej) => {
      const stop = interval(() => {
        const next = index + 1 < this.length
        if (option.mode === 'single') {
          cb(this.at(index++) as string, next,)
        }
        if (option.mode === 'append') {
          cb(this.slice(0, (index++) + 1), next)
        }
        if (!next) {
          stop()
          res()
        }
      }, option.speed)
      option.signal?.addEventListener?.('abort', () => {
        stop()
        rej(new Error('you emit the abort event'))
      })
    })
  }
}

export function toStringBox(v: unknown){
  return new StringBox(v)
}