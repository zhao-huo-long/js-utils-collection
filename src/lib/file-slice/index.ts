import { FileToChunksCls } from "./file-chunks";
import { PromiseContainer } from "../promise-container";
import type { Option } from "../promise-container";
import type { AnyFn } from "../../types";

export * from "./file-chunks";

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

  async chunkHandlerAsync(
    handler: (
      param: ChunkHandlerParam
    ) => Promise<unknown> | [Promise<unknown>, AnyFn],
    option?: Option
  ) {
    const { innerFile } = this;
    if (innerFile) {
      const handlerList = this.chunksCls?.chunks.map((chunk, index) => {
        return () => {
          const res = handler({
            chunk,
            size: chunk.size,
            index,
          });
          if (Array.isArray(res)) {
            const [promise, abort] = res;
            return {
              promise,
              abort,
            };
          }
          return {
            promise: res,
            abort: (_: unknown) => _,
          };
        };
      });
      return new Promise((res, rej) => {
        const promise = new PromiseContainer(handlerList, {
          ...option,
          onSuccess: () => {
            option?.onSuccess?.();
            res(true);
          },
          onError(error) {
            option?.onError?.(error);
            rej(error);
          },
          onAbort() {
            option?.onAbort?.();
            return rej("handler abort");
          },
        });
        promise.start()
      });
    }
  }
}
