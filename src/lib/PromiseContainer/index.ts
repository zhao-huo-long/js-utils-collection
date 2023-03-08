export enum STATUS {
  ready = "ready",
  cancel = "cancel",
  abort = "abort",
  error = "error",
  doing = "doing",
  done = "done",
}

export interface Opt {
  max?: number;
  onError?: (error?: Error) => void;
  onAbort?: () => void;
  onProgress?: (progress: { total: number; done: number }) => void;
  onSuccess?: () => void;
}

export interface PromiseCreator<T = unknown> {
  ():
    | {
        promise: Promise<T>;
        abort: () => void;
      }
    | Promise<T>;
}

const endStatus = new Set([
  STATUS.abort,
  STATUS.cancel,
  STATUS.done,
  STATUS.error,
]);

/*
 * PromiseContainer
 */
export class PromiseContainer {
  protected doingList: ReturnType<PromiseCreator>[] = [];
  public status = STATUS.ready;
  protected total = 0;

  constructor(
    protected creatorList: PromiseCreator[] = [],
    protected readonly opt: Opt = { max: 4 }
  ) {
    this.total = this.creatorList?.length || 0;
  }

  protected innerAbort = () => {
    this.status = STATUS.abort;
    this.doingList.forEach((i) => {
      if ("abort" in i) {
        i.abort?.();
      }
    });
  };

  protected error = () => {
    this.innerAbort();
    this.status = STATUS.error;
    const { onError } = this.opt;
    onError?.();
  };

  protected updateProgress = () => {
    const { onProgress } = this.opt;
    onProgress?.({
      total: this.total,
      done:
        this.total - (this.creatorList?.length || 0) - this.doingList.length,
    });
  };

  protected wrapperCreator = (creator: PromiseCreator) => {
    const result = creator();
    this.doingList.push(result);
    const promise = "promise" in result ? result.promise : result;
    promise
      .then((res) => {
        /*
          promise success handler
          1. remove promise from doingList
          2. update progress
          3. end-status dont exec next creator
        */
        if (this.isFinish()) {
          return;
        }
        this.doingList = this.doingList.filter((i) => i !== result);
        this.nextCreator();
        this.updateProgress();
        return Promise.resolve(res);
      })
      .catch((err) => {
        if (endStatus.has(this.status)) {
          return;
        }
        if (this.status === STATUS.doing) {
          this.error();
          return Promise.reject(err);
        }
        /*
          promise error handler
          1. abort all doing promise
          2. exec onError callback
        */
        return Promise.reject(err);
      });
  };

  protected nextCreator() {
    const next = this.creatorList.shift();
    if (typeof next === "function") {
      this.wrapperCreator(next);
    }
    if (!this.creatorList.length && !this.doingList.length) {
      this.opt.onSuccess?.();
    }
  }

  isFinish = () => endStatus.has(this.status);

  start = () => {
    this.status = STATUS.doing;
    const creatorList = this.creatorList.splice(0, this.opt.max || 4);
    for (const creator of creatorList) {
      if (typeof creator === "function") {
        this.wrapperCreator(creator);
      }
    }
  };

  abort = () => {
    this.innerAbort();
    const { onAbort } = this.opt;
    onAbort?.();
  };
}
