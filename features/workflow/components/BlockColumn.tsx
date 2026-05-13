"use client";

import { useState, useRef, useEffect } from "react";
import { Flex } from "antd";
import { Trash2, Plus } from "lucide-react";
import { AppButton, AppInput } from "@/components/ui";
import { TaskItem } from "@/features/workflow/components/TaskItem";
import { useWorkflowStore, generateId } from "@/stores/workflowStore";
import type { Block } from "@/types";

interface BlockColumnProps {
  block: Block;
}

export function BlockColumn({ block }: BlockColumnProps) {
  const { deleteBlock, updateBlock, addTask } = useWorkflowStore();
  const [editing, setEditing] = useState<boolean>(!block.id);
  const [name, setName] = useState<string>(block.name);
  const inputRef = useRef<{ focus: () => void } | undefined>(undefined);

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

    if (!block.id) {
      if (!trimmed) {
        deleteBlock(block.id);
      } else {
        updateBlock(block.id, {
          ...block,
          id: generateId(),
          name: trimmed,
        });
        setEditing(false);
      }
    } else {
      if (!trimmed) {
        setName(block.name);
      } else if (trimmed !== block.name) {
        updateBlock(block.id, { ...block, name: trimmed });
      }
      setEditing(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      handleBlur();
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
        overflow: "hidden",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={10}
        style={{
          padding: "10px 12px",
        }}
      >
        {editing ? (
          <AppInput
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
              fontSize: 14, 
              fontWeight: 600,
              lineHeight: "22px"
            }}
            placeholder="Block name..."
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="flex-1 cursor-text truncate text-sm font-semibold"
          >
            {block.name}
          </span>
        )}

        {block.id && (
          <Trash2
            size={15}
            className="flex-shrink-0 cursor-pointer text-[#999] transition-colors hover:text-red-500"
            onClick={() => {
              deleteBlock(block.id);
            }}
          />
        )}
      </Flex>

      <Flex
        vertical
        gap={6}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 10px",
        }}
      >
        {block.tasks.map((task, index) => (
          <TaskItem
            key={task.id || `draft-${index}`}
            task={task}
            blockId={block.id}
          />
        ))}
        <AppButton
          type="text"
          icon={Plus}
          onClick={() => {
            addTask(block.id);
          }}
          className="w-max"
          label="Add a task"
        />
      </Flex>
    </Flex>
  );
}
