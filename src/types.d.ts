/**
 * EmptyObject
 * @description 空对象类型
 */
type EmptyObject = Record<string, never>;

/**
 * AddNullVal
 * @deprecated 扩展类型 `value｜ null`
 */
type AddNullVal<T extends LiteralObject> = {
  [i in keyof T]: T[i] | null;
};

/**
 * LiteralObject
 * @description plain对象类型
 */
type LiteralObject<T = unknown> = Record<string, T>;
