/**
 * EmptyObject
 */
type EmptyObject = Record<string, never>;

/**
 * EmptyObject
 */
type AddNullVal<T extends LiteralObject> = {
  [i in keyof T]: T[i] | null;
};

/**
 * LiteralObject
 */
type LiteralObject<T = unknown> = Record<string, T>;
