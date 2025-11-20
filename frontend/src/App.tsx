import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import type { Invoice } from "./types/invoice";

function App() {
  const [page, setPage] = useState<"dashboard" | "create-invoice">("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleSaveInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [...prev, invoice]);
    setPage("dashboard");
  };

  const markAsPaid = (index: number) => {
    setInvoices((prev) =>
      prev.map((inv, i) =>
        i === index ? { ...inv, status: "PAID" } : inv
      )
    );
  };

  return (
    <AppLayout>
      {page === "dashboard" && (
        <Dashboard
          invoices={invoices}
          onCreate={() => setPage("create-invoice")}
          onMarkPaid={markAsPaid}
        />
      )}

      {page === "create-invoice" && (
        <CreateInvoice
          onBack={() => setPage("dashboard")}
          onSave={handleSaveInvoice}
        />
      )}
    </AppLayout>
  );
}

export default App;
