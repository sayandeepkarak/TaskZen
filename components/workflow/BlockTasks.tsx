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
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "8px 10px",
      }}
    >
      {block.tasks.length ? (
        block.tasks.map((task, taskIndex) => (
          <Task
            key={task.id || `draft-${taskIndex}`}
            task={task}
            blockId={block.id}
            index={taskIndex}
          />
        ))
      ) : (
        block.id && (
          <div className="py-6 text-center text-xs italic text-gray-400">
            No tasks available
          </div>
        )
      )}
    </Flex>
  );
}
