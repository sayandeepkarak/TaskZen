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
  A: "#6E85B7",
  B: "#7FB77E",
  C: "#C69B7B",
  D: "#C97C7C",
  E: "#8E7DBE",
  F: "#6FA7B8",
  G: "#9BAE6D",
  H: "#B784A7",
  I: "#6C9A9A",
  J: "#7B8494",
  K: "#C08B5C",
  L: "#5F9E8F",
  M: "#7AA874",
  N: "#7186D6",
  O: "#9D7AD2",
  P: "#C57B8A",
  Q: "#B7A05A",
  R: "#5C8F72",
  S: "#5F84C9",
  T: "#8268C7",
  U: "#B96A6A",
  V: "#B97A52",
  W: "#616B7A",
  X: "#5F96A8",
  Y: "#A67BA5",
  Z: "#727986",
} as const;
