import type { Block, Task, User } from "./index";

export interface WorkflowState {
  blocks: Block[];
  setBlocks: (blocks: Block[] | ((blocks: Block[]) => Block[])) => void;
  addBlock: () => void;
  deleteBlock: (blockId: string) => void;
  updateBlock: (blockId: string, block: Block) => void;
  addTask: (blockId: string) => void;
  deleteTask: (blockId: string, taskId: string) => void;
  updateTask: (blockId: string, taskId: string, task: Task) => void;
  moveTask: (taskId: string, targetBlockId: string, targetIndex: number) => void;
}

export interface UserState {
  users: User[];
}
