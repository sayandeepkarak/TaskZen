"use client";

import { Flex } from "antd";
import { Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { AppButton } from "@/components/wrapper";
import BlockTitle from "./BlockTitle";
import BlockTasks from "./BlockTasks";
import { useWorkflowStore } from "@/stores/workflowStore";
import { CATEGORY_COLOR_MAP } from "@/constants";
import type { Block as BlockType } from "@/types";

interface BlockProps {
  block: BlockType;
  index: number;
}

export default function Block({ block, index }: BlockProps) {
  const { addTask } = useWorkflowStore();

  const { ref } = useSortable({
    id: block.id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Normal,
    accept: ["item", "column"],
  });

  const firstLetter = block.name.charAt(0).toUpperCase();
  const categoryColor = CATEGORY_COLOR_MAP[block?.id ? firstLetter : "B"];

  return (
    <div ref={ref} className="group h-full max-h-full rounded-lg">
      <Flex
        vertical
        style={{
          width: 280,
          minWidth: 280,
          borderRadius: 8,
          backgroundColor: `${categoryColor}`,
          maxHeight: "100%",
          overflow: "hidden",
          paddingBottom: "10px",
          color: "#fff",
        }}
      >
        <BlockTitle block={block} />

        <BlockTasks block={block} />

        {block.id && (
          <AppButton
            type="text"
            icon={Plus}
            style={{
              margin: "0px 10px",
              color: "#fff",
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
