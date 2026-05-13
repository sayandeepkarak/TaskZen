"use client";

import { Dropdown } from "antd";
import { MoreHorizontal, Flag, Trash2 } from "lucide-react";
import { useWorkflowStore } from "@/stores/workflowStore";
import { PRIORITIES } from "@/constants";
import type { MenuProps } from "antd";
import type { Priority, Task } from "@/types";

interface TaskActionProps {
  task: Task;
  blockId: string;
}

export default function TaskAction({ task, blockId }: TaskActionProps) {
  const { updateTask, deleteTask } = useWorkflowStore();

  const handlePriorityChange = (priority: Priority) => {
    updateTask(blockId, task.id, {
      ...task,
      id: task.id,
      priority,
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "priority",
      label: "Change Priority",
      icon: <Flag size={14} style={{ alignSelf: "center" }} />,
      children: PRIORITIES.map((priority) => ({
        key: priority,
        label: priority,
        onClick: () => handlePriorityChange(priority),
        className: task.priority === priority ? "bg-blue-50" : "",
      })),
    },

    {
      key: "delete",
      label: "Delete task",
      icon: <Trash2 size={14} />,
      danger: true,
      onClick: () => deleteTask(blockId, task.id),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
      <div className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-100">
        <MoreHorizontal size={14} className="text-[#8c8c8c]" />
      </div>
    </Dropdown>
  );
}
