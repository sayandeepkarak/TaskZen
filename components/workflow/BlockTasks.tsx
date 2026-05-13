"use client";

import { Flex } from "antd";
import Task from "./Task";
import type { Block } from "@/types";

interface BlockTasksProps {
  block: Block;
}

export default function BlockTasks({ block }: BlockTasksProps) {
  return (
    <Flex
      vertical
      gap={6}
      className="no-scrollbar"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "8px 10px",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {block.tasks.length
        ? block.tasks.map((task, taskIndex) => (
            <Task
              key={task.id || `draft-${taskIndex}`}
              task={task}
              blockId={block.id}
              index={taskIndex}
            />
          ))
        : block.id && (
            <div className="py-[21px] text-center text-xs text-white/70 italic">
              No tasks available
            </div>
          )}
    </Flex>
  );
}
