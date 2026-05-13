import type { Priority } from "@/types";

export const PRIORITY_COLOR_MAP: Record<Priority, string> = {
  Low: "#87d068",
  Medium: "#eab308",
  High: "#f97316",
  Urgent: "#ff4d4f",
} as const;

export const PRIORITIES: readonly Priority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
] as const;

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  A: "#3b82f6", // blue
  B: "#22c55e", // green
  C: "#f59e0b", // amber
  D: "#ef4444", // red
  E: "#8b5cf6", // violet
  F: "#06b6d4", // cyan
  G: "#84cc16", // lime
  H: "#ec4899", // pink
  I: "#14b8a6", // teal
  J: "#64748b", // slate
  K: "#f97316", // orange
  L: "#10b981", // emerald
  M: "#6366f1", // indigo
  N: "#a855f7", // purple
  O: "#f43f5e", // rose
  P: "#0ea5e9", // sky
  Q: "#eab308", // yellow
  R: "#16a34a", // dark green
  S: "#2563eb", // royal blue
  T: "#9333ea", // vivid purple
  U: "#dc2626", // deep red
  V: "#ea580c", // burnt orange
  W: "#475569", // dark slate
  X: "#0891b2", // ocean
  Y: "#c026d3", // magenta
  Z: "#71717a", // zinc
} as const;
