"use client";

import { useState, useRef, useEffect } from "react";
import { AppTextArea } from "@/components/wrapper";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Task } from "@/types";
import { generateId } from "@/lib/utils";

interface TaskTitleProps {
  task: Task;
  blockId: string;
}

export default function TaskTitle({ task, blockId }: TaskTitleProps) {
  const { updateTask, deleteTask } = useWorkflowStore();
  const [name, setName] = useState(task.name);
  const [editing, setEditing] = useState(!task.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (!task.id) {
      inputRef.current?.focus();
    }
  }, []);

  function handleBlur() {
    const trimmed = name.trim();
    if (!trimmed) {
      if (!task.id) {
        deleteTask(blockId, task.id);
      } else {
        revertName();
      }
      return;
    }

    if (!task.id) {
      updateTask(blockId, task.id, {
        ...task,
        id: generateId(),
        name: trimmed,
      });
    } else if (trimmed !== task.name) {
      updateTask(blockId, task.id, {
        ...task,
        name: trimmed,
      });
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.currentTarget.blur();
      return;
    }

    if (e.key === "Escape") {
      if (!task.id) {
        deleteTask(blockId, task.id);
      } else {
        revertName();
      }
    }
  }

  function revertName() {
    setName(task.name);
    setEditing(false);
  }

  if (editing) {
    return (
      <AppTextArea
        ref={inputRef}
        value={name}
        maxLength={300}
        autoSize={true}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        variant="borderless"
        style={{
          flex: 1,
          padding: 0,
          fontSize: 13,
          fontWeight: 600,
          lineHeight: "1.4",
          color: "#1f1f1f",
          resize: "none",
        }}
        placeholder="Task name..."
      />
    );
  }

  return (
    <span
      onDoubleClick={() => setEditing(true)}
      className="cursor-text text-[13px] leading-[1.4] font-semibold wrap-break-word text-[#1f1f1f]"
    >
      {task.name}
    </span>
  );
}
