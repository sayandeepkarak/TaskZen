"use client";

import { useState } from "react";
import { Flex } from "antd";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { AppCalendar } from "@/components/wrapper";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Task } from "@/types";

interface TaskDueDateProps {
  task: Task;
  blockId: string;
}

export default function TaskDueDate({ task, blockId }: TaskDueDateProps) {
  const { updateTask } = useWorkflowStore();
  const [open, setOpen] = useState(false);

  const dateValue = task.dueDate ? dayjs(task.dueDate).format("DD MMM, YYYY") : "--";

  const handleUpdate = (date: string) => {
    updateTask(blockId, task.id, {
      ...task,
      dueDate: date,
    });
    setOpen(false);
  };

  return (
    <Flex
      align="center"
      gap={4}
      className="group cursor-pointer transition-colors hover:opacity-80"
      onClick={() => setOpen(true)}
    >
      <Calendar size={11} className="text-[#8c8c8c]" />
      <div className="text-[10px] font-medium text-[#8c8c8c]">
        <span>Due Date: </span>
        <span className="text-[#595959]">{dateValue}</span>
      </div>
      <AppCalendar
        open={open}
        onOpenChange={setOpen}
        value={task.dueDate}
        onChange={handleUpdate}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: 0,
          height: 0,
          padding: 0,
        }}
      />
    </Flex>
  );
}
