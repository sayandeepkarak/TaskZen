export type Priority = "Low" | "Medium" | "High" | "Urgent";

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

export interface Block {
  id: string;
  name: string;
  tasks: Task[];
}
