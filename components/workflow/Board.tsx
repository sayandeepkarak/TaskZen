"use client";

import { useRef } from "react";
import { Flex } from "antd";
import { Plus } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { AppButton } from "@/components/wrapper";
import Block from "./Block";
import { useWorkflowStore } from "@/stores/workflowStore";

export default function Board() {
  const { blocks, setBlocks, addBlock, moveTask } = useWorkflowStore();
  const previousBlocks = useRef(blocks);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    previousBlocks.current = blocks;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    if (!source || !target) return;

    if (source.type === "column") return;
    if (source.type === "item") {
      const targetBlockId = target.type === "column" ? target.id : target.group;
      const targetIndex = target.type === "column" ? 0 : target.index;
      if (targetBlockId) {
        moveTask(source.id, targetBlockId, targetIndex);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
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

  const handleAddBlock = () => {
    addBlock();
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: containerRef.current.scrollWidth,
        });
      }
    });
  };

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Flex
        ref={containerRef}
        gap={16}
        align="flex-start"
        style={{
          padding: 24,
          height: "calc(100vh - 48px)",
          overflowX: "auto",
          overflowY: "hidden",
          backgroundColor: "#5d3a73",
        }}
      >
        {blocks.map((block, index) => (
          <Block key={block.id} block={block} index={index} />
        ))}

        <AppButton
          type="text"
          icon={Plus}
          onClick={handleAddBlock}
          label="Add a new block"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "#fff",
            minWidth: "auto",
          }}
        />
      </Flex>
    </DragDropProvider>
  );
}
