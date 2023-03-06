import { isBrowser } from "../helper";
/**
 * StorageWithType
 */
export type StorageType = "localStorage" | "sessionStorage";

export class StorageWithType<T extends LiteralObject = EmptyObject>
  implements Omit<Storage, "getItem">
{
  protected storage = window.localStorage;
  protected storageType: StorageType = "localStorage";
  constructor(type: StorageType) {
    if (!isBrowser || !window?.localStorage || !window?.sessionStorage) {
      throw new Error(
        "window.localStorage or window.sessionStorage is undefined"
      );
    }
    if (type === "localStorage") {
      this.storage = window.localStorage;
    }
    if (type === "sessionStorage") {
      this.storage = window.sessionStorage;
    }
  }
  setItem<Key extends keyof T>(key: Key, val: T[Key]) {
    if (typeof key === "string") {
      this.storage.setItem(key, JSON.stringify(val));
    }
    throw new Error("key must be string");
  }
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
