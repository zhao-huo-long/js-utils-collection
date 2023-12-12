/**
 * isInt
 * @description 判断是否为整数
 * @param n {number}
 * @returns boolean
 */
export const isInt = (n: number): n is number =>
  typeof n === "number" && n === parseInt(`${n}`);

/**
 * isPositiveUnsignedInt
 * @description 判断是否为正整数
 * @param n {number}
 * @returns boolean
 */
export const isPositiveUnsignedInt = (n: number): n is number =>
  isInt(n) && n > 0;

export const isUintNoZero = isPositiveUnsignedInt;

/**
 * isUnsignedInt
 * @description 判断是否为正整数且大于0
 * @param n {number}
 * @returns {boolean}
 */
export const isUnsignedInt = (n: number): n is number => n >= 0 && isInt(n);

export const isUint = isUnsignedInt;
