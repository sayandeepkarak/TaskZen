import type { Priority } from "@/types";

export const PRIORITY_COLOR_MAP: Record<Priority, string> = Object.freeze({
  Low: "#52c41a",
  Medium: "#faad14",
  High: "#fa8c16",
  Urgent: "#f5222d",
} as const);

export const PRIORITIES: readonly Priority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
] as const;
