import { isBrowser, libError } from "@/helper";

export interface FileCheckerRule {
  len?: number;
  maxSize?: number;
  minSize?: number;
  accept?: string;
}

/**
 * filesChecker - file检测
 * @param files
 * @param rule
 * @returns
 */
export function filesChecker(files: File[] = [], rule: FileCheckerRule) {
  const {
    len = 1,
    maxSize = Number.MAX_SAFE_INTEGER,
    minSize = 0,
  } = rule;

  let error: [boolean, string] = [false, ``];

  if (files.length > len) {
    return [true, `file more than ${len}`];
  }
  for (const file of files) {
    if (file.size > maxSize) {
      error = [
        true,
        `[${file.name}] size is more than ${maxSize}`,
      ];
      break;
    }
    if (file.size < minSize) {
      error = [
        true,
        `[${file.name}] size is less than ${minSize}`,
      ];
      break;
    }
  }
  return error;
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
 * @returns `Promise<File[]>`
 */
export function selectFile(
  accept = "*",
  rule: FileCheckerRule = {}
) {
  if (!isBrowser) {
    throw new Error(libError("function `selectFile` only can run in browser"));
  }
  const input = document.createElement("input");
  rule.len = rule?.len || 1
  input.accept = accept;
  input.multiple = rule.len > 1;
  input.type = "file";
  return new Promise((res, rej) => {
    input.onchange = function () {
      if (input.files?.[Symbol.iterator]) {
        const files = [...input.files];
        const [error, errorMsg] = filesChecker(files, rule || {});
        if (error) {
          rej(new Error(errorMsg as string));
        } else {
          res(files);
        }
        return;
      }
      res([]);
      return;
    };
    input.click();
    setTimeout(() => input.remove(), 500)
  })
}
