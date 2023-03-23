import fs from "fs";
import path from "path";
import { isNode } from "../../helper";

/**
 * 探测结果类型
 */
export type DetectRes = "NOT_FOUND" | "FILE" | "DIR";

/**
 * fsPathDetect - 检测路径指向目标的类型
 * 1. 404
 * 2. file
 * 3. dir
 * @param p
 * @returns  "NOT_FOUND" | "FILE" | "DIR"
 */
export function fsPathDetect(p: string): DetectRes {
  if (!isNode) throw new Error("function [fsPathDetect] must be run in node");
  let targetType: DetectRes = "NOT_FOUND";
  if (!fs.existsSync(p)) {
    return targetType;
  }
  const fd = fs.openSync(p, "r");
  const stat = fs.fstatSync(fd);
  if (stat.isFile()) {
    targetType = "FILE";
  } else if (stat.isDirectory()) {
    targetType = "DIR";
  }
  fs.closeSync(fd);
  return targetType;
}

/**
 * fsReadDir - 读取目录下的文件和目录
 * @param p
 * @returns
 */
export function fsReadDir(p: string) {
  if (!isNode) throw new Error("function [fsReadDir] must be run in node");
  if (fsPathDetect(p) !== "DIR") {
    return [];
  }
  return fs.readdirSync(p).map((i) => {
    const itemPath = path.join(p, i);
    const fd = fs.openSync(itemPath, "r");
    const stat = fs.fstatSync(fd);
    const info = {
      name: i,
      path: itemPath,
      isDir: stat.isDirectory(),
      isFile: stat.isFile(),
      size: stat.size,
      mtime: stat.mtime,
      ctime: stat.ctime,
    };
    fs.closeSync(fd);
    return info;
  });
}

export function fsDirSize(p: string): number {
  if (!isNode) throw new Error("function [fsReadDir] must be run in node");
  if (fsPathDetect(p) !== "DIR") {
    return 0;
  }
  return fsReadDir(p).reduce((size, item) => {
    if (item.isDir) {
      return size + (fsDirSize(item.path) || 0);
    }
    return size + item.size;
  }, 0);
}
