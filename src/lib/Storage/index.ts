import { isBrowser } from "../../helper";

/**
 * @description StorageType 存储类型
 */
export type StorageType = "localStorage" | "sessionStorage";

/**
 * StorageWithType
 * @example
 * ```typescript
 * interface KeyValType {
 *  id: number
 *  username: string
 * }
 * const storage = new StorageWithType<KeyValType>('sessionStorage')
 * storage.setItem('id', 2)
 * // if you write storage.setItem('id', '2') typescript will throw type error
 * storage.getItem('id')
 * // if you write storage.getItem('ids') typescript will throw type error
 * ```
 */
export class StorageWithType<T extends LiteralObject = Record<string, any>> {
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
    }
    throw new Error("key must be string");
  }
  /**
   * @description 通过 key 获取存储的 value
   */
  getItem<Key extends keyof T>(key: Key): AddNullVal<T>[Key] {
    if (typeof key === "string") {
      const val = this.storage.getItem(key);
      if (typeof val === "string") {
        return JSON.parse(val);
      }
    }
    return null;
  }
}

export function newStorageWithType<
  T extends LiteralObject = Record<string, any>
>(type?: StorageType) {
  return new StorageWithType<T>(type);
}
