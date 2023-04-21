import { libWarn } from "../../helper";


/**
 * Task
 */
export interface Task {
  run: (controller: { signal: AbortSignal }) => Promise<unknown>;
  /**
   * 任务名称
   */
  name?: string

  /**
   *
   */
  result?: 'success' | 'abort' | 'error'
}


export class RunController {
  protected freeSpaceNum = 0;
  protected spaceList: any = [];
  protected msg = {
    taskCount: 0,
    completeTaskCount: 0,
  };
  protected readonly abortController = new AbortController()
  constructor(protected readonly maxFreeSpace: number = 5,) {
    this.spaceList = new Array(maxFreeSpace);
    this.freeSpaceNum = maxFreeSpace;
  };

  /**
   * 是否有空位
   */
  get isHaveSpace() {
    return this.freeSpaceNum > 0 && this.freeSpaceNum <= this.maxFreeSpace
  }

  public abort = () => {
    this.abortController.abort('WorkingSpace abort')
  }

  /**
   * runTask
   */
  public runTask = (task: Task) => {
    const { signal } = this.abortController
    if (this.isHaveSpace === false && typeof task?.run !== 'function') {
      return false
    }
    for (let index = 0; index < this.spaceList.length; index++) {
      if (this.spaceList[index] === null) {
        this.spaceList[index] = task
        this.freeSpaceNum -= 1
        const taskNo = `task-no-${this.msg.taskCount}`
        task?.run({ signal })
          .finally(() => {
            this.spaceList[index] = null
            this.freeSpaceNum += 1
            this.onTaskComplete(
              {
                maxFreeSpace: this.maxFreeSpace,
                freeSpaceNum: this.freeSpaceNum,
                taskName: task.name || taskNo,
                completeTaskCount: ++this.msg.completeTaskCount,
                completeStatus: task.result || 'success'
              }
            )
          });
        this.onTaskAdd({
          taskCount: ++this.msg.taskCount,
          freeSpaceNum: this.freeSpaceNum,
          taskName: task.name || taskNo,
          maxFreeSpace: this.maxFreeSpace
        })
        return true
      }
    }
    console.log(libWarn(`addTask: 失败  freeSpaceNum: ${this.freeSpaceNum}  maxFreeSpace:${this.maxFreeSpace}`));
    return false
  }

  public onTaskAdd: (
    msg: {
      taskCount: number,
      freeSpaceNum: number,
      taskName?: string,
      maxFreeSpace: number
    }) => void = () => { };
  public onTaskComplete: (
    msg: {
      maxFreeSpace: number,
      freeSpaceNum: number,
      taskName?: string,
      completeTaskCount: number,
      completeStatus: string
    }) => void = () => { };
}

