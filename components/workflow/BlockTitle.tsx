"use client";

import { useState, useRef, useEffect } from "react";
import { Flex } from "antd";
import { Trash2 } from "lucide-react";
import { AppInput } from "@/components/wrapper";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Block } from "@/types";
import { generateId } from "@/lib/utils";

interface BlockTitleProps {
  block: Block;
}

export default function BlockTitle({ block }: BlockTitleProps) {
  const { deleteBlock, updateBlock } = useWorkflowStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);
  const [editing, setEditing] = useState<boolean>(!block.id);
  const [name, setName] = useState<string>(block.name);

  useEffect(() => {
    if (!block.id) {
      inputRef.current?.focus();
    }
  }, []);

  const handleBlur = () => {
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
      return;
    }

    if (!trimmed) {
      setName(block.name);
    } else if (trimmed !== block.name) {
      updateBlock(block.id, { ...block, name: trimmed });
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      return;
    }
    if (e.key === "Escape") {
      handleBlur();
    }
  };

  return (
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
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: 0,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "22px",
            color: "#fff",
          }}
          maxLength={25}
          placeholder="Block name..."
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className="flex-1 cursor-default truncate text-sm font-semibold text-white"
        >
          {block.name}
        </span>
      )}

      {block.id && (
        <Trash2
          size={15}
          className="shrink-0 cursor-pointer text-white/60 transition-colors hover:text-white"
          onClick={() => deleteBlock(block.id)}
        />
      )}
    </Flex>
  );
}
