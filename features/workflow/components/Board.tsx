"use client";

import { useRef } from "react";
import { Flex } from "antd";
import { Plus } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { AppButton } from "@/components/ui";
import { BlockColumn } from "@/features/workflow/components/Block";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Block } from "@/types";

export function KanbanBoard() {
  const { blocks, setBlocks, addBlock, moveTask } = useWorkflowStore();
  const previousBlocks = useRef<Block[]>(blocks);

  const onDragStart = () => {
    previousBlocks.current = blocks;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragOver = (event: any) => {
    const { source, target } = event.operation;
    if (source?.type === "column") return;
    if (source?.type === "item") {
      const targetBlockId = target.type === "column" ? target.id : target.group;
      const targetIndex = target.type === "column" ? 0 : target.index;
      if (targetBlockId) {
        moveTask(source.id, targetBlockId, targetIndex);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (event: any) => {
    const { source } = event.operation;
    if (event.canceled) {
      if (source.type === "item") {
        setBlocks(previousBlocks.current);
      }
      return;
    }
    if (source.type === "column") {
      setBlocks(move(blocks, event));
    }
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <Flex
        gap={16}
        align="flex-start"
        style={{
          padding: 24,
          height: "calc(100vh - 48px)",
          overflowX: "auto",
        }}
      >
        {blocks.map((block, index) => (
          <BlockColumn key={block.id} block={block} index={index} />
        ))}

        <AppButton
          type="dashed"
          icon={Plus}
          onClick={addBlock}
          label="Add a new block"
        />
      </Flex>
    </DragDropProvider>
  );
}
