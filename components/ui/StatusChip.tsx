"use client";

import { Flex } from "antd";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  label: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StatusChip({
  label,
  color,
  className,
  style,
}: StatusChipProps) {
  const backgroundColor = `${color}15`; // 15 is hex for ~8% opacity

  return (
    <div
      className={cn(
        "inline-flex w-min shrink-0 rounded-[12px] px-2 py-[2px]",
        className,
      )}
      style={{
        backgroundColor,
        ...style,
      }}
    >
      <Flex align="center" gap={6}>
        <div
          className="h-[5px] w-[5px] rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        <span
          className="text-[11px] leading-[14px] font-semibold"
          style={{
            color: color,
          }}
        >
          {label}
        </span>
      </Flex>
    </div>
  );
}
