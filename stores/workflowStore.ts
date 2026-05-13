import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Block, Task } from "@/types";

interface WorkflowState {
  blocks: Block[];
  addBlock: () => void;
  deleteBlock: (blockId: string) => void;
  updateBlock: (blockId: string, block: Block) => void;
  addTask: (blockId: string) => void;
  deleteTask: (blockId: string, taskId: string) => void;
  updateTask: (blockId: string, taskId: string, task: Task) => void;
}

export function generateId(): string {
  return crypto.randomUUID();
}

function createDefaultTask(): Task {
  return {
    id: "",
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  };
}

export const useWorkflowStore = create<WorkflowState>()(
  immer((set) => ({
    blocks: [
      {
        id: generateId(),
        name: "To Do",
        tasks: [
          {
            ...createDefaultTask(),
            id: generateId(),
            name: "Research competitors",
          },
        ],
      },
    ],

    addBlock: () => {
      set((state) => {
        state.blocks.push({
          id: "",
          name: "",
          tasks: [],
        });
      });
    },

    deleteBlock: (blockId: string) => {
      set((state) => {
        const blockIndex = state.blocks.findIndex(
          (block) => block.id === blockId,
        );
        if (blockIndex < 0) return;
        state.blocks.splice(blockIndex, 1);
      });
    },

    updateBlock: (blockId: string, block: Block) => {
      set((state) => {
        const blockData = state.blocks.find((block) => block.id === blockId);
        if (!blockData) return;
        Object.assign(blockData, block);
      });
    },

    addTask: (blockId: string) => {
      set((state) => {
        const blockData = state.blocks.find((block) => block.id === blockId);
        if (!blockData) return;
        blockData.tasks.push(createDefaultTask());
      });
    },

    deleteTask: (blockId: string, taskId: string) => {
      set((state) => {
        const blockData = state.blocks.find((block) => block.id === blockId);
        if (!blockData) return;
        const taskIndex = blockData.tasks.findIndex(
          (task) => task.id === taskId,
        );
        if (taskIndex < 0) return;
        blockData.tasks.splice(taskIndex, 1);
      });
    },

    updateTask: (blockId: string, taskId: string, task: Task) => {
      set((state) => {
        const blockData = state.blocks.find((block) => block.id === blockId);
        if (!blockData) return;
        const taskData = blockData.tasks.find((task) => task.id === taskId);
        if (!taskData) return;
        Object.assign(taskData, task);
      });
    },
  })),
);
