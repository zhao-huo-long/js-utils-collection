import { isBrowser } from "../../helper";

/**
 * fileSelect
 * @description  文件选择函数,唤起文件选择对话框 
 * @example
 * ```
 * import { fileSelect } from 'js-utils-collection'
 * fileSelect('image/*')
 * .then((file) => {
 *   console.log(file)
 * })
 * // multiple
 * fileSelect('image/*')
 * .then((fileList) => {
 *  console.log(fileList)
 * })
 * ```
 * @param accept
 * @param multiple
 * @returns `Promise<File | File[]>`
 */

export function fileSelect<T extends boolean>(
  accept = "*",
  option?: {
    multiple?: T;
    fileMaxSize?: number;
    max?: number;
  }
) {
  if (isBrowser) {
    const {
      multiple = false,
      fileMaxSize = Number.MAX_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
    } = option || {};
    const input = document.createElement("input");
    input.accept = accept;
    input.multiple = multiple || false;
    input.type = "file";
    type PromiseRes = T extends true ? File[] : File;
    return new Promise<PromiseRes>((res, rej) => {
      input.onchange = function () {
        if (multiple && input.files?.[Symbol.iterator]) {
          const files = [...input.files];
          res(files as PromiseRes);
          if (files.length > max) {
            rej(`[error]: only can select less than ${max} files`);
            return;
          }
          for (const file of files) {
            if (file.size > fileMaxSize) {
              rej(`[${file.name}] size ${file.size} > ${fileMaxSize}`);
              break;
            }
          }
        } else {
          const file = input.files?.[0];
          if ((file?.size || 0) > fileMaxSize) {
            rej(`[${file?.name}].size ${file?.size} > ${fileMaxSize}`);
          } else {
            res(input.files?.[0] as PromiseRes);
          }
        }
        input.remove();
      };
    });
  } else {
    throw new Error("function `fileSelect` only can run in browser");
  }
}
