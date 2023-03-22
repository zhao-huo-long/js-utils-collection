/**
 * isPositiveUnsignedInt
 * @description 判断是否为正整数
 * @param n {number}
 * @returns {boolean}
 */
export const isPositiveUnsignedInt = (n: number): n is number =>
  n > 0 && n === parseInt(`${n}`);

/**
 * isUnsignedInt
 * @description 判断是否为自然数(包含0)
 * @param n {number}
 * @returns {boolean}
 */
export const isUnsignedInt = (n: number): n is number =>
  n >= 0 && n === parseInt(`${n}`);
