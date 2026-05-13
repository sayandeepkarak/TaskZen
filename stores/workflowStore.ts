import { create } from "zustand";
import type { Block, Task } from "@/types";
import { APP_CONSTANTS } from "@/constants";

interface WorkflowState {
  blocks: Block[];
  addBlock: () => void;
  deleteBlock: (blockId: string) => void;
  renameBlock: (blockId: string, name: string) => void;
  addTask: (blockId: string) => void;
  deleteTask: (blockId: string, taskId: string) => void;
  renameTask: (blockId: string, taskId: string, name: string) => void;
}

function generateId(): string {
  return crypto.randomUUID();
}

function createDefaultTask(): Task {
  return {
    id: generateId(),
    name: APP_CONSTANTS.DEFAULT_TASK_NAME,
    description: "",
    dueDate: "",
    priority: "Medium",
  };
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  blocks: [
    {
      id: generateId(),
      name: "To Do",
      tasks: [
        { ...createDefaultTask(), name: "Research competitors" },
        { ...createDefaultTask(), name: "Draft wireframes" },
      ],
    },
    {
      id: generateId(),
      name: "In Progress",
      tasks: [{ ...createDefaultTask(), name: "Build landing page" }],
    },
    {
      id: generateId(),
      name: "Done",
      tasks: [{ ...createDefaultTask(), name: "Setup repository" }],
    },
  ],

  addBlock: () => {
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: generateId(),
          name: APP_CONSTANTS.DEFAULT_BLOCK_NAME,
          tasks: [],
        },
      ],
    }));
  },

  deleteBlock: (blockId: string) => {
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== blockId),
    }));
  },

  renameBlock: (blockId: string, name: string) => {
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === blockId ? { ...b, name } : b,
      ),
    }));
  },

  addTask: (blockId: string) => {
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === blockId
          ? { ...b, tasks: [...b.tasks, createDefaultTask()] }
          : b,
      ),
    }));
  },

  deleteTask: (blockId: string, taskId: string) => {
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === blockId
          ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) }
          : b,
      ),
    }));
  },

  renameTask: (blockId: string, taskId: string, name: string) => {
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === blockId
          ? {
              ...b,
              tasks: b.tasks.map((t) =>
                t.id === taskId ? { ...t, name } : t,
              ),
            }
          : b,
      ),
    }));
  },
}));
