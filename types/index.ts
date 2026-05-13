export type Priority = "Low" | "Medium" | "High" | "Urgent";

export interface Task {
  id: string;
  name: string;
  dueDate: string;
  priority: Priority;
  userId?: string;
}

export interface Block {
  id: string;
  name: string;
  tasks: Task[];
}

export interface User {
  id: string;
  fullname: string;
}
