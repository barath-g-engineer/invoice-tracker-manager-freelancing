import { useState } from "react";
import type { FormEvent } from "react";
import type { Invoice } from "../types/invoice";

interface CreateInvoiceProps {
  onBack: () => void;
  onSave: (invoice: Invoice) => void;
}

export default function CreateInvoice({ onBack, onSave }: CreateInvoiceProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    if (!clientPhone.trim()) {
      alert("Please enter the client's WhatsApp phone number.");
      return;
    }

    const invoice: Invoice = {
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      description: description.trim(),
      amount: numericAmount,
      dueDate,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    onSave(invoice);

    // reset form
    setClientName("");
    setClientPhone("");
    setDescription("");
    setAmount("");
    setDueDate("");
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="text-blue-600 mb-4 underline"
      >
        ← Back
      </button>

      <h2 className="text-lg font-semibold">Create Invoice</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="e.g. Rahul Sharma"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client WhatsApp Number
          </label>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="+91 98765 43210"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use country code (e.g. +91) so WhatsApp link works correctly.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            rows={3}
            placeholder="e.g. Video editing for YouTube channel"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            min={0}
            step="0.01"
            placeholder="e.g. 2500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
