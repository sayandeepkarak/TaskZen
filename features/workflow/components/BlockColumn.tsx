"use client";

import { useState, useRef, useEffect } from "react";
import { Flex } from "antd";
import { Trash2 } from "lucide-react";
import { AppButton, AppInput } from "@/components/ui";
import { TaskItem } from "@/features/workflow/components/TaskItem";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Block } from "@/types";

interface BlockColumnProps {
  block: Block;
}

export function BlockColumn({ block }: BlockColumnProps) {
  const { deleteBlock, renameBlock, addTask, deleteTask, renameTask } =
    useWorkflowStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(block.name);
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
      renameBlock(block.id, trimmed);
    } else {
      setName(block.name);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === "Escape") {
      setName(block.name);
      setEditing(false);
    }
  }

  return (
    <Flex
      vertical
      style={{
        width: 280,
        minWidth: 280,
        border: "2px solid #e8e8e8",
        borderRadius: 8,
        backgroundColor: "#fafafa",
        maxHeight: "100%",
      }}
    >
      {/* Block Header */}
      <Flex
        align="center"
        justify="space-between"
        style={{
          padding: "10px 12px",
          borderBottom: "1px solid #f0f0f0",
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
            style={{ flex: 1, marginRight: 8 }}
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            style={{
              fontWeight: 600,
              fontSize: 14,
              cursor: "text",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {block.name}
          </span>
        )}

        <Trash2
          size={15}
          style={{ cursor: "pointer", flexShrink: 0, color: "#999" }}
          onClick={() => {
            deleteBlock(block.id);
          }}
        />
      </Flex>

      {/* Tasks */}
      <Flex
        vertical
        gap={6}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 10px",
        }}
      >
        {block.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => {
              deleteTask(block.id, task.id);
            }}
            onRename={(newName) => {
              renameTask(block.id, task.id, newName);
            }}
          />
        ))}
      </Flex>

      {/* Add Task */}
      <div style={{ padding: "8px 10px", borderTop: "1px solid #f0f0f0" }}>
        <AppButton
          type="text"
          block
          onClick={() => {
            addTask(block.id);
          }}
          style={{ color: "#999", fontSize: 13 }}
          label="+ Add a task"
        />
      </div>
    </Flex>
  );
}
