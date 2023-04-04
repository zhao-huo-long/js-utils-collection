/**
 * isPositiveUnsignedInt
 * @description 判断是否为正整数
 * @param n {number}
 * @returns {boolean}
 */
export const isPositiveUnsignedInt = (n: number): n is number =>
  n > 0 && n === parseInt(`${n}`);

export const isUintNoZero = isPositiveUnsignedInt;
/**
 * isUnsignedInt
 * @description 判断是否为无符号整数
 * @param n {number}
 * @returns {boolean}
 */
export const isUnsignedInt = (n: number): n is number =>
  n >= 0 && n === parseInt(`${n}`);

export const isUint = isUnsignedInt;
