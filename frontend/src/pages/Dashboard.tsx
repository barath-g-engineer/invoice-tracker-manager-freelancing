interface DashboardProps {
  onCreate: () => void;
}

export default function Dashboard({ onCreate }: DashboardProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="mt-4 space-y-3">
        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Total Pending</p>
          <p className="text-xl font-bold">₹0</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-xl font-bold">₹0</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="text-xl font-bold">0</p>
        </div>
      </div>

      <button
        onClick={onCreate}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
      >
        + Create Invoice
      </button>
    </div>
  );
}
