import { isNaturalInt, isPositiveInt } from "../../helper";

export class FileToChunksCls {
  protected readonly innerFile: File | Blob | null = null;
  protected readonly _chunkSize: number = 0;
  protected _chunks: Blob[] | null = null;

  constructor(file: File | Blob, chunkSize: number) {
    if (file instanceof File || file instanceof Blob) {
      this.innerFile = file;
    } else {
      throw new Error("param `file` must be a `File` or `Blob`");
    }
    if (isPositiveInt(chunkSize)) {
      this._chunkSize = chunkSize;
    } else {
      throw new Error("param `chunkSize` must be a positive integer");
    }
  }
  get length() {
    const { innerFile, chunkSize } = this;
    if (innerFile instanceof File || innerFile instanceof Blob) {
      return Math.ceil(innerFile.size / chunkSize);
    }
    return 0;
  }

  get chunkSize() {
    return this._chunkSize;
  }

  getChunk = (index: number) => {
    const { innerFile, chunkSize } = this;
    if (isNaturalInt(index)) {
      return innerFile?.slice(index * chunkSize, (index + 1) * chunkSize);
    }
    throw new Error("param `index` must be a natural number");
  };

  get chunks() {
    const { length, _chunks } = this;
    if (_chunks) {
      return _chunks;
    }
    let index = 0;
    const chunksList: Blob[] = [];
    while (index < length) {
      const chunk = this.getChunk(index++);
      if (chunk) {
        chunksList.push(chunk);
      }
    }
    this._chunks = chunksList;
    return this._chunks;
  }
}
