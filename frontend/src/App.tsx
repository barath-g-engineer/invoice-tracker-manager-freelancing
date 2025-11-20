import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetail from "./pages/InvoiceDetail";
import type { Invoice } from "./types/invoice";

type Page = "dashboard" | "create" | "details";

function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState<number | null>(null);

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
          onCreate={() => setPage("create")}
          onMarkPaid={markAsPaid}
          onViewDetails={(index) => {
            setSelectedInvoiceIndex(index);
            setPage("details");
          }}
        />
      )}

      {page === "create" && (
        <CreateInvoice
          onBack={() => setPage("dashboard")}
          onSave={handleSaveInvoice}
        />
      )}

      {page === "details" && selectedInvoiceIndex !== null && (
        <InvoiceDetail
          invoice={invoices[selectedInvoiceIndex]}
          onBack={() => setPage("dashboard")}
          onMarkPaid={() => {
            markAsPaid(selectedInvoiceIndex);
            setPage("dashboard");
          }}
        />
      )}
    </AppLayout>
  );
}

export default App;
