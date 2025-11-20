import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  userName: string;
  isVerified: boolean;
  onProfileClick: () => void;
}

export default function AppLayout({
  children,
  userName,
  isVerified,
  onProfileClick,
}: AppLayoutProps) {
  const initials =
    userName && userName.trim().length > 0
      ? userName.trim().charAt(0).toUpperCase()
      : "U";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Top Bar */}
      <header className="w-full px-4 py-3 bg-white shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-semibold">Freelance Invoice</h1>

        <button
          onClick={onProfileClick}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            {isVerified && (
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center border-2 border-white">
                ✓
              </span>
            )}
          </div>
        </button>
      </header>

      {/* Page content */}
      <main className="p-4">{children}</main>
    </div>
  );
}

