"use client";

import { useState, useRef, useEffect } from "react";
import { Dropdown, Flex } from "antd";
import type { MenuProps } from "antd";
import { MoreHorizontal } from "lucide-react";
import { AppInput } from "@/components/ui";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onRename: (name: string) => void;
}

export function TaskItem({ task, onDelete, onRename }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const inputRef = useRef<{ focus: () => void } | null>(null);

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
    if (trimmed) {
      onRename(trimmed);
    } else {
      setName(task.name);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === "Escape") {
      setName(task.name);
      setEditing(false);
    }
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "delete",
      label: "Delete",
      danger: true,
      onClick: onDelete,
    },
  ];

  return (
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
          ref={inputRef}
          size="small"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          style={{
            flex: 1,
            fontSize: 13,
            lineHeight: "20px",
            cursor: "text",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.name}
        </span>
      )}

      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <MoreHorizontal
          size={16}
          style={{ cursor: "pointer", flexShrink: 0, color: "#999" }}
        />
      </Dropdown>
    </Flex>
  );
}
