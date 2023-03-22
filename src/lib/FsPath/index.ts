import fs from "fs";
import path from "path";
import { isNode } from "../../helper";

export enum ReadResType {
  NOT_FOUND = "NOT_FOUND",
  FILE = "FILE",
  DIR = "DIR",
}

/**
 * fsPathDetect
 * @param p
 * @returns
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
