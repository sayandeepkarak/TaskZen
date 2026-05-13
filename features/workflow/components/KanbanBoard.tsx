"use client";

import { Flex } from "antd";
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

      <div style={{ minWidth: 200 }}>
        <AppButton
          type="dashed"
          onClick={addBlock}
          style={{
            width: 200,
            height: 40,
            fontSize: 13,
            color: "#999",
          }}
          label="+ Add a new block"
        />
      </div>
    </Flex>
  );
}
