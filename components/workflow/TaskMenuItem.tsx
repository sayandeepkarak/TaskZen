"use client";

import { Flex } from "antd";
import { AppAvatar } from "@/components/wrapper";

interface TaskMenuItemProps {
  fullname: string;
}

export default function TaskMenuItem({ fullname }: TaskMenuItemProps) {
  return (
    <Flex align="center" gap={8}>
      <AppAvatar
        size={24}
        style={{ fontSize: 10, backgroundColor: "#1890ff" }}
      >
        {fullname.charAt(0)}
      </AppAvatar>
      <span className="text-xs font-medium text-gray-700">
        {fullname}
      </span>
    </Flex>
  );
}
