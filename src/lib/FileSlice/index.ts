import { FileToChunksCls } from "./FileToChunksCls";

export * from "./FileToChunksCls";

export type ChunkHandlerParam = {
  chunk: Blob;
  index: number;
  size: number;
};

export class FileSliceCls {
  protected innerFile: File | null = null;
  protected chunksCls: FileToChunksCls | null = null;

  constructor(file: File, chunkSize: number) {
    this.chunksCls = new FileToChunksCls(file, chunkSize);
    this.innerFile = file;
  }
  chunkHandlerSync = (handler: (param: ChunkHandlerParam) => unknown) => {
    const { innerFile } = this;
    if (innerFile) {
      this.chunksCls?.chunks.forEach((chunk, index) =>
        handler({ chunk, size: chunk.size, index })
      );
    }
  };

  chunkHandlerAsync(
    handler: (param: ChunkHandlerParam) => [() => Promise<boolean>, AnyFn]
  ) {
    const { innerFile } = this;
    if (innerFile) {
      this.chunksCls?.chunks;
    }
  }
}
