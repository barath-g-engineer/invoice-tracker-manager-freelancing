import type { Invoice } from "../types/invoice";

interface DashboardProps {
  onCreate: () => void;
  invoices: Invoice[];
  onMarkPaid: (index: number) => void;
}

export default function Dashboard({ onCreate, invoices, onMarkPaid }: DashboardProps) {
  const totalPending = invoices
    .filter((inv) => inv.status === "PENDING")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueCount = invoices.filter((inv) => inv.status === "OVERDUE").length;

  return (
    <div>
      <h2 className="text-lg font-semibold">Dashboard</h2>

      {/* Summary Cards */}
      <div className="mt-4 space-y-3">
        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Total Pending</p>
          <p className="text-xl font-bold">₹{totalPending}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-xl font-bold">₹{totalPaid}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="text-xl font-bold">{overdueCount}</p>
        </div>
      </div>

      {/* Create button */}
      <button
        onClick={onCreate}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
      >
        + Create Invoice
      </button>

      {/* Invoice list */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Recent Invoices</h3>

        {invoices.length === 0 && (
          <p className="text-sm text-gray-500">No invoices yet. Create your first one.</p>
        )}

        <ul className="space-y-2">
          {invoices.map((inv, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">{inv.clientName}</p>
                <p className="text-xs text-gray-500">
                  ₹{inv.amount} • Due: {inv.dueDate}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    inv.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : inv.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {inv.status}
                </span>

                {inv.status === "PENDING" && (
                  <button
                    onClick={() => onMarkPaid(index)}
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

