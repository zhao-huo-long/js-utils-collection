/**
 * EmptyObject
 * @description 空对象类型
 */
type EmptyObject = Record<string, never>;

/**
 * AddNullVal
 * @description 扩展类型 `value｜ null`
 */
type AddNullVal<T extends LiteralObject> = {
  [i in keyof T]: T[i] | null;
};

/**
 * LiteralObject
 * @description plain对象类型
 */
type LiteralObject<T = unknown> = Record<string, T>;

/**
 * AnyFn
 * @description 任意函数类型
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFn = (...args: any[]) => any;
