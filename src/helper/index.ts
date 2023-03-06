export const isBrowser =
  typeof window === "object" && typeof window.document === "object";

export const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;
