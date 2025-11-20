import { useState } from "react";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <AppLayout>
      {page === "dashboard" && (
        <Dashboard onCreate={() => setPage("create-invoice")} />
      )}

      {page === "create-invoice" && (
        <CreateInvoice onBack={() => setPage("dashboard")} />
      )}
    </AppLayout>
  );
}

export default App;
