/**
 * @description 是否在浏览器环境
 */
export const isBrowser =
  typeof window === "object" && typeof window.document === "object";

/**
 * @description 是否在node环境
 */
export const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;
