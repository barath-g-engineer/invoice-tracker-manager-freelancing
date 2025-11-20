export interface Invoice {
  id?: string;
  clientName: string;
  clientPhone: string;          // NEW
  description: string;
  amount: number;
  dueDate: string;              // YYYY-MM-DD
  status: "PENDING" | "PAID" | "OVERDUE";
  createdAt?: string;
}
