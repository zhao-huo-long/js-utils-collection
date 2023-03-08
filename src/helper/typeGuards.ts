/**
 * isPositiveInt
 * @description 判断是否为正整数
 * @param n {number}
 * @returns {boolean}
 */
export const isPositiveInt = (n: number): n is number =>
  n > 0 && n === parseInt(`${n}`);

/**
 * isNaturalInt
 * @description 判断是否为自然数(包含0)
 * @param n {number}
 * @returns {boolean}
 */
export const isNaturalInt = (n: number): n is number =>
  n >= 0 && n === parseInt(`${n}`);
