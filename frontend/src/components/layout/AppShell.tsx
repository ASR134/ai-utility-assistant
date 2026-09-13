import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../../hooks/useTheme";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/chat": "AI Chat",
  "/extract": "Text Extraction",
  "/translate": "Translation",
  "/weather": "Weather Assistant",
};

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "AI Utility Assistant";

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h1>
          </div>

          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-neutral-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600" />
            )}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
