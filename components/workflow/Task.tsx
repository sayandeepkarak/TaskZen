"use client";

import { Flex } from "antd";
import { useSortable } from "@dnd-kit/react/sortable";
import { PRIORITY_COLOR_MAP } from "@/constants";
import { StatusChip } from "@/components/ui";
import TaskTitle from "./TaskTitle";
import TaskDueDate from "./TaskDueDate";
import TaskAssignment from "./TaskAssignment";
import TaskAction from "./TaskAction";
import type { Task } from "@/types";

interface TaskProps {
  task: Task;
  blockId: string;
  index: number;
}

export default function Task({ task, blockId, index }: TaskProps) {
  const { ref } = useSortable({
    id: task.id,
    index,
    type: "item",
    accept: "item",
    group: blockId,
  });

  return (
    <div ref={ref} className="relative">
      <Flex
        vertical
        gap={8}
        style={{
          padding: "10px 12px",
          backgroundColor: "#fff",
          borderRadius: 8,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <Flex align="flex-start" justify="space-between">
          {task.id && (
            <StatusChip
              label={task.priority}
              color={PRIORITY_COLOR_MAP[task.priority]}
            />
          )}
          {task.id && <TaskAction task={task} blockId={blockId} />}
        </Flex>

        <TaskTitle task={task} blockId={blockId} />

        {task.id && (
          <Flex align="center" justify="space-between" style={{ marginTop: 4 }}>
            <TaskDueDate task={task} blockId={blockId} />
            <TaskAssignment task={task} blockId={blockId} />
          </Flex>
        )}
      </Flex>
    </div>
  );
}
