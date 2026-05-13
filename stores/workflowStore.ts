import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Block, Task } from "@/types";
import type { WorkflowState } from "@/types/store.types";
import { generateId } from "@/lib/utils";

function createDefaultTask(): Task {
  return {
    id: "",
    name: "",
    dueDate: "",
    priority: "Medium",
    userId: undefined,
  };
}

export const useWorkflowStore = create<WorkflowState>()(
  immer((set) => ({
    blocks: [
      {
        id: generateId(),
        name: "To Do",
        tasks: [],
      },
      {
        id: generateId(),
        name: "In Progress",
        tasks: [],
      },
      {
        id: generateId(),
        name: "Completed",
        tasks: [],
      },
    ],

    setBlocks: (blocksOrFn) => {
      set((state) => {
        if (typeof blocksOrFn === "function") {
          state.blocks = blocksOrFn(state.blocks);
        } else {
          state.blocks = blocksOrFn;
        }
      });
    },

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

    moveTask: (taskId: string, targetBlockId: string, targetIndex: number) => {
      set((state) => {
        let sourceBlock: Block | undefined;
        let taskIndex = -1;

        for (const block of state.blocks) {
          const index = block.tasks.findIndex((t) => t.id === taskId);
          if (index !== -1) {
            sourceBlock = block;
            taskIndex = index;
            break;
          }
        }

        if (!sourceBlock || taskIndex < 0) return;

        const targetBlock = state.blocks.find(
          (block) => block.id === targetBlockId,
        );
        if (!targetBlock) return;

        const [task] = sourceBlock.tasks.splice(taskIndex, 1);
        if (!task) return;
        targetBlock.tasks.splice(targetIndex, 0, task);
      });
    },
  })),
);
