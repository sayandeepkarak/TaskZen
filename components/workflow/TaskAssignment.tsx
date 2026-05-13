"use client";

import { Dropdown } from "antd";
import { UserPlus } from "lucide-react";
import { AppAvatar } from "@/components/wrapper";
import { useUserStore } from "@/stores/userStore";
import { useWorkflowStore } from "@/stores/workflowStore";
import TaskMenuItem from "./TaskMenuItem";
import type { MenuProps } from "antd";
import type { Task } from "@/types";

interface TaskAssignmentProps {
  task: Task;
  blockId: string;
}

export default function TaskAssignment({ task, blockId }: TaskAssignmentProps) {
  const { users } = useUserStore();
  const { updateTask } = useWorkflowStore();

  const assignedUser = users.find((u) => u.id === task.userId);
  const userInitial = assignedUser?.fullname.charAt(0) || null;

  const handleUpdate = (newUserId: string) => {
    updateTask(blockId, task.id, {
      ...task,
      userId: newUserId === task.userId ? undefined : newUserId,
    });
  };

  const items: MenuProps["items"] = users.map((user) => ({
    key: user.id,
    label: <TaskMenuItem fullname={user.fullname} />,
    onClick: () => handleUpdate(user.id),
    className: task.userId === user.id ? "bg-blue-50" : "",
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
      <div className="cursor-pointer transition-transform">
        {userInitial ? (
          <AppAvatar
            size={20}
            style={{ fontSize: 9, backgroundColor: "#1890ff" }}
          >
            {userInitial}
          </AppAvatar>
        ) : (
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-[#8c8c8c]">
            <UserPlus size={10} />
          </div>
        )}
      </div>
    </Dropdown>
  );
}
