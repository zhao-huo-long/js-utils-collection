import { isBrowser, libError } from "../../helper";

export interface FileCheckerRule {
  len?: number
  maxSize?: number
  minSize?: number
  accept?: string
}

/**
 * filesChecker - file检测
 * @param files
 * @param rule
 * @returns
 */
export function filesChecker(
  files: File[] = [],
  rule: FileCheckerRule
) {
  const {
    len = Number.MAX_SAFE_INTEGER,
    maxSize = Number.MAX_SAFE_INTEGER,
    minSize = Number.MAX_SAFE_INTEGER,
  } = rule

  let error: [boolean, string] = [false, ``]

  if (files.length > len) {
    return [true, `file more than ${len}`]
  }
  for (const file of files) {
    if (file.size > maxSize || file.size < minSize) {
      error = [true, `${file.name} file size is more than ${maxSize} or less than ${minSize}`]
      break
    }
  }
  return error
}

/**
 * selectFile
 * @description  文件选择函数,唤起文件选择对话框
 * @example
 * ```
 * import { selectFile } from 'js-utils-collection'
 * selectFile('image/*')
 * .then((file) => {
 *   console.log(file)
 * })
 * // multiple
 * selectFile('image/*')
 * .then((fileList) => {
 *  console.log(fileList)
 * })
 * ```
 * @param accept
 * @param multiple
 * @returns `Promise<File[]>`
 */
export function selectFile(
  accept = "*",
  rule?: FileCheckerRule & { multiple?: boolean }
) {
  if (!isBrowser) {
    throw new Error(libError("function `selectFile` only can run in browser"));
  }
  const input = document.createElement("input");
  input.accept = accept;
  input.multiple = rule?.multiple || false;
  input.type = "file";
  return new Promise((res, rej) => {
    input.onselect = function () {
      if (input.files?.[Symbol.iterator]) {
        const files = [...input.files];
        const [error, errorMsg] = filesChecker(files, rule || {});
        if (error) {
          rej(errorMsg)
        } else {
          res(files)
        }
        return
      }
      res([])
      return
    }
    input.click();
  })
    .finally(() => input.remove());
}
