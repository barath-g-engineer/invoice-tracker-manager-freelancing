export interface Invoice {
  id?: string; // will come from backend later
  clientName: string;
  description: string;
  amount: number;
  dueDate: string; // ISO date string (YYYY-MM-DD)
  status: "PENDING" | "PAID" | "OVERDUE";
  createdAt?: string; // later from backend
}
