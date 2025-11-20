import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetail from "./pages/InvoiceDetail";
import Profile from "./pages/Profile";
import type { Invoice } from "./types/invoice";

type Page = "dashboard" | "create" | "details" | "profile";

interface User {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState<number | null>(null);

  const [user, setUser] = useState<User>({
    name: "Freelancer",
    email: "",
    phone: "",
    photoUrl: undefined,
  });

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

  const isVerified = user.phone.trim().length > 0;

  return (
    <AppLayout
      userName={user.name}
      isVerified={isVerified}
      onProfileClick={() => setPage("profile")}
    >
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

      {page === "profile" && (
        <Profile
          name={user.name}
          email={user.email}
          phone={user.phone}
          photoUrl={user.photoUrl}
          onBack={() => setPage("dashboard")}
          onSave={(data) => {
            setUser((prev) => ({
              ...prev,
              ...data,
            }));
            setPage("dashboard");
          }}
        />
      )}
    </AppLayout>
  );
}

export default App;
