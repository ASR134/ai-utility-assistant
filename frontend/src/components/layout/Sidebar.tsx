import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  Languages,
  CloudSun,
  Zap,
  X,
} from "lucide-react";

const navItems = [
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/extract", icon: FileText, label: "Extract" },
  { to: "/translate", icon: Languages, label: "Translate" },
  { to: "/weather", icon: CloudSun, label: "Weather" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 flex flex-col
          bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto`}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-tight">
              AI Utility
              <br />
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                Assistant
              </span>
            </span>
          </NavLink>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Features
          </p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800 shrink-0">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
            Backend: FastAPI
          </p>
        </div>
      </aside>
    </>
  );
}

// Re-export nav items for use in other components if needed
export { navItems };
