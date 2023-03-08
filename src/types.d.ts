/**
 * EmptyObj
 * @description 空对象类型
 */
type EmptyObj = Record<string, never>;

/**
 * AddNullVal
 * @description 扩展类型 `value｜ null`
 */
type AddNullVal<T extends LiteralObj> = {
  [i in keyof T]: T[i] | null;
};

/**
 * LiteralObj
 * @description plain对象类型
 */
type LiteralObj<T = unknown> = Record<string, T>;

/**
 * AnyFn
 * @description 任意函数类型
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFn = (...args: any[]) => any;
