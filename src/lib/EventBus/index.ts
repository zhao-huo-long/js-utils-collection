export type TransformMap<T extends LiteralObj> = {
  [key in keyof T]?: (arg?: T[key]) => unknown;
};

export type TransformMapArr<T extends LiteralObj> = {
  [key in keyof T]?: ((arg?: T[key]) => unknown)[];
};

/**
 * 事件总线 - EventBus
 * @description 事件总线类, 对事件名和事件回调参数类型提示比较友好
 * @example
 * ```ts
 * import { newEventBus } from 'utils-collection'
 *
 * interface EventMap {
 *  eventName: number
 * }
 *
 * const eventBus = newEventBus<EventMap>()
 *
 * eventBus.on('eventName', (value) => {
 * // typescript will known `s` is number or undefined
 * })
 *
 * eventBus.fire('eventName', 2023)
 * // if your code is '2023', ts will throw a type error
 * ```
 */
export class EventBus<T extends LiteralObj = Record<string, any>> {
  protected handlerStore: TransformMapArr<T> = {};
  /*
    why WeakMap?
    url: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
  */
  protected onceHandlerMap = new WeakMap<AnyFn, AnyFn>([]);
  /**
   * 注册事件处理
   * @param name
   * @param handler
   * @returns
   */
  on = <EventName extends keyof TransformMap<T>>(
    name: EventName,
    handler: TransformMap<T>[EventName]
  ) => {
    if (typeof handler !== "function") {
      return;
    }
    if (Array.isArray(this.handlerStore[name])) {
      this.handlerStore[name]?.push(handler);
      return;
    }
    this.handlerStore[name] = [handler];
  };

  /**
   * 取消事件处理
   * @param name
   * @param handler
   */
  off = <EventName extends keyof TransformMap<T>>(
    name: EventName,
    handler: TransformMap<T>[EventName]
  ) => {
    if (typeof handler !== "function") {
      return;
    }
    const handlerList = this.handlerStore[name] || [];
    const onceHandler = this.onceHandlerMap.get(handler);
    if (onceHandler instanceof Function) {
      this.handlerStore[name] = handlerList.filter((i) => i !== onceHandler);
    } else {
      this.handlerStore[name] = handlerList.filter((i) => i !== handler);
    }
  };

  /**
   * 触发事件
   * @param name
   * @param arg
   */
  fire = <EventName extends keyof TransformMap<T>>(
    name: EventName,
    arg?: T[EventName]
  ) => {
    const handlerList = this.handlerStore[name] || [];
    for (const handler of handlerList) {
      handler?.(arg);
    }
  };

  /**
   * 注册一次性事件处理器
   * @param name
   * @param handler
   */
  once = <EventName extends keyof TransformMap<T>>(
    name: EventName,
    handler: TransformMap<T>[EventName]
  ) => {
    if (typeof handler === "function") {
      const wrapperHandler: TransformMap<T>[EventName] = (...args) => {
        handler(...args);
        this.off(name, wrapperHandler);
      };
      this.onceHandlerMap.set(handler, wrapperHandler);
      this.on(name, wrapperHandler);
    }
  };

  __inspectHandlerStore__ = <EventName extends keyof TransformMap<T>>(
    name?: EventName
  ) => {
    if (typeof name === "string") {
      return this.handlerStore[name] || [];
    }
    return this.handlerStore;
  };
}

export function newEventBus<T extends LiteralObj = Record<string, any>>() {
  return new EventBus<T>();
}
