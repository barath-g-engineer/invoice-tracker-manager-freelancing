import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Top Bar */}
      <header className="w-full px-4 py-3 bg-white shadow-sm">
        <h1 className="text-xl font-semibold">Freelance Invoice</h1>
      </header>

      {/* Page content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
