"use client";

import { Flex } from "antd";
import { Plus } from "lucide-react";
import { AppButton } from "@/components/ui";
import { BlockColumn } from "@/features/workflow/components/BlockColumn";
import { useWorkflowStore } from "@/stores/workflowStore";

export function KanbanBoard() {
  const { blocks, addBlock } = useWorkflowStore();

  return (
    <Flex
      gap={16}
      align="flex-start"
      style={{
        padding: 24,
        height: "calc(100vh - 48px)",
        overflowX: "auto",
      }}
    >
      {blocks.map((block) => (
        <BlockColumn key={block.id} block={block} />
      ))}

      <AppButton
        type="dashed"
        icon={Plus}
        onClick={addBlock}
        label="Add a new block"
      />
    </Flex>
  );
}
