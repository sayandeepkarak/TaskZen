"use client";

import { Flex } from "antd";
import { Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { AppButton } from "@/components/wrapper";
import BlockTitle from "./BlockTitle";
import BlockTasks from "./BlockTasks";
import { useWorkflowStore } from "@/stores/workflowStore";
import type { Block } from "@/types";

interface BlockProps {
  block: Block;
  index: number;
}

export default function Block({ block, index }: BlockProps) {
  const { addTask } = useWorkflowStore();
  const { ref } = useSortable({
    id: block.id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div ref={ref} className="max-h-full rounded-lg">
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
        <BlockTitle block={block} />

        <BlockTasks block={block} />

        {block.id && (
          <AppButton
            type="text"
            icon={Plus}
            style={{
              margin: "5px 10px",
            }}
            onClick={() => addTask(block.id)}
            className="w-max"
            label="Add a task"
          />
        )}
      </Flex>
    </div>
  );
}
