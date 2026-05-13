import { create } from "zustand";
import type { UserState } from "@/types/store.types";
import { generateId } from "@/lib/utils";

export const useUserStore = create<UserState>(() => ({
  users: [
    "Sayandeep Karak",
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
  ].map((user) => ({
    id: generateId(),
    fullname: user,
  })),
}));
