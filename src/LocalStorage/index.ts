class LocalStorageWithType<T extends LiteralObject = Record<string, never>>
  implements Omit<Storage, "getItem">
{
  protected storage = window.localStorage;
  // constructor() {}
  setItem<Key extends keyof T>(key: Key, val: T[Key]) {
    if (typeof key === "string") {
      this.storage.setItem(key, JSON.stringify(val));
    }
    throw new Error("key must be string");
  }
  getItem<Key extends keyof T>(key: Key): T[Key] | null {
    if (typeof key === "string") {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }
}
