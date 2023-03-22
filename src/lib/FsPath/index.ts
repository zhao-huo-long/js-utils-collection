import fs from "fs";
import path from "path";
import { isNode } from "../../helper";

export enum ReadResType {
  NOT_FOUND = "NOT_FOUND",
  FILE = "FILE",
  DIR = "DIR",
}

/**
 * fsPathDetect - 检测路径指向目标的类型
 * 1. 404
 * 2. file
 * 3. dir
 * @param p
 * @returns  "NOT_FOUND" | "FILE" | "DIR"
 */
export function fsPathDetect(p: string): ReadResType {
  if (!isNode) throw new Error("function [fsPathDetect] must be run in node");
  let targetType = ReadResType.NOT_FOUND;
  if (!fs.existsSync(p)) {
    return targetType;
  }
  const fd = fs.openSync(p, "r");
  const stat = fs.fstatSync(fd);
  if (stat.isFile()) {
    targetType = ReadResType.FILE;
  } else if (stat.isDirectory()) {
    targetType = ReadResType.DIR;
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
  if (fsPathDetect(p) !== ReadResType.DIR) {
    return [];
  }
  return fs.readdirSync(p).map((i) => {
    const itemPath = path.join(p, i);
    const fd = fs.openSync(itemPath, "r");
    const stat = fs.fstatSync(fd);
    return {
      name: i,
      path: itemPath,
      isDir: stat.isDirectory(),
      isFile: stat.isFile(),
      size: stat.size,
      modTime: stat.mtime,
      cTime: stat.ctime,
    };
  });
}
