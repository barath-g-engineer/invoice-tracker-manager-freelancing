import type { Invoice } from "../types/invoice";

interface InvoiceDetailProps {
  invoice: Invoice;
  onBack: () => void;
  onMarkPaid: () => void;
}

export default function InvoiceDetail({
  invoice,
  onBack,
  onMarkPaid,
}: InvoiceDetailProps) {
  return (
    <div className="p-2">
      <button
        onClick={onBack}
        className="text-blue-600 mb-4 underline"
      >
        ← Back
      </button>

      <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <p>
          <span className="font-medium">Client:</span> {invoice.clientName}
        </p>

        <p>
          <span className="font-medium">Description:</span>{" "}
          {invoice.description}
        </p>

        <p>
          <span className="font-medium">Amount:</span> ₹{invoice.amount}
        </p>

        <p>
          <span className="font-medium">Due Date:</span> {invoice.dueDate}
        </p>

        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              invoice.status === "PAID"
                ? "bg-green-100 text-green-800"
                : invoice.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {invoice.status}
          </span>
        </p>

        <p>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(invoice.createdAt || "").toLocaleString()}
        </p>
        <p>
  <span className="font-medium">Phone:</span> {invoice.clientPhone}
</p>

      </div>

      {invoice.status !== "PAID" && (
        <button
          onClick={onMarkPaid}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg text-sm"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );
}
