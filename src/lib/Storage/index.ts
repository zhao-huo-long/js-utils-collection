import { isBrowser } from "../../helper";

/**
 * @description StorageType 存储类型
 */
export type StorageType = "localStorage" | "sessionStorage";

/**
 * StorageWithType
 * @description 存储类, 能对Key和Value类型提示比较友好
 * @example
 * ```typescript
 * import { storageBuilder } from 'js-utils-collection'
 *
 * interface KeyValType {
 *  id: number
 *  username: string
 * }
 *
 * const storage = storageBuilder<KeyValType>('sessionStorage')
 *
 * storage.setItem('id', 2)
 * // if you write storage.setItem('id', '2'), typescript will throw type error
 *
 * storage.getItem('id')
 * // if you write storage.getItem('ids'), typescript will throw type error
 * ```
 */
export class Storage<T = Record<string, unknown>> {
  /**
   * storage
   * @default `window.localStorage`
   */
  protected storage = window.localStorage;
  /**
   * storage type `localStorage` or `sessionStorage`
   */
  protected storageType: StorageType = "localStorage";
  /**
   * @param type {StorageType}
   */
  constructor(type?: StorageType) {
    if (!isBrowser || !window?.localStorage || !window?.sessionStorage) {
      throw new Error(
        "window.localStorage or window.sessionStorage is undefined"
      );
    }
    if (type === "sessionStorage") {
      this.storage = window.sessionStorage;
    }
    this.storage = window.localStorage;
  }
  /**
   * @description 设置存储的 key, value
   */
  setItem<Key extends keyof T>(key: Key, val: T[Key]) {
    if (typeof key === "string") {
      this.storage.setItem(key, JSON.stringify(val));
      return
    }
    throw new Error("key must be string");
  }
  /**
   * @description 通过 key 获取存储的 value
   */
  getItem<Key extends keyof T>(key: Key): T[Key] | null {
    if (typeof key === "string") {
      const val = this.storage.getItem(key);
      if (typeof val === "string") {
        return JSON.parse(val);
      }
    }
    return null;
  }
}

export function storageBuilder<T = Record<string, unknown>>(
  type?: StorageType
) {
  return new Storage<T>(type);
}
