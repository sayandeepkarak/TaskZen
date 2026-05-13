"use client";

import { useState, useRef, useEffect } from "react";
import { Dropdown, Flex } from "antd";
import type { MenuProps } from "antd";
import { MoreHorizontal } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { AppInput } from "@/components/ui";
import { useWorkflowStore, generateId } from "@/stores/workflowStore";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  blockId: string;
  index: number;
}

export function TaskItem({ task, blockId, index }: TaskItemProps) {
  const { deleteTask, updateTask } = useWorkflowStore();
  const { ref } = useSortable({
    id: task.id,
    index,
    type: "item",
    accept: "item",
    group: blockId,
  });
  const inputRef = useRef<{ focus: () => void } | undefined>(undefined);

  const [name, setName] = useState<string>(task.name);
  const [editing, setEditing] = useState<boolean>(!task.id);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  function handleDoubleClick() {
    setEditing(true);
  }

  function handleBlur() {
    const trimmed = name.trim();

    if (!task.id) {
      if (!trimmed) {
        deleteTask(blockId, task.id);
      } else {
        updateTask(blockId, task.id, {
          ...task,
          id: generateId(),
          name: trimmed,
        });
        setEditing(false);
      }
    } else {
      if (!trimmed) {
        setName(task.name);
      } else if (trimmed !== task.name) {
        updateTask(blockId, task.id, { ...task, name: trimmed });
      }
      setEditing(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      if (!task.id) {
        deleteTask(blockId, task.id);
      } else {
        setName(task.name);
        setEditing(false);
      }
    }
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "delete",
      label: "Delete",
      danger: true,
      onClick: () => deleteTask(blockId, task.id),
    },
  ];

  return (
    <div ref={ref}>
      <Flex
        align="center"
        justify="space-between"
        gap={8}
        style={{
          padding: "8px 10px",
          backgroundColor: "#fff",
          borderRadius: 6,
          border: "1px solid #f0f0f0",
        }}
      >
        {editing ? (
          <AppInput
            // @ts-expect-error type issue with antd InputRef
            ref={inputRef}
            size="small"
            variant="borderless"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: 0,
              fontSize: 13,
              lineHeight: "20px",
            }}
            placeholder="Task name..."
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="flex-1 cursor-pointer truncate text-[13px] leading-5"
          >
            {task.name}
          </span>
        )}

        {task.id && (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <MoreHorizontal
              size={16}
              className="flex-shrink-0 cursor-pointer text-[#999] transition-colors hover:text-gray-600"
            />
          </Dropdown>
        )}
      </Flex>
    </div>
  );
}
