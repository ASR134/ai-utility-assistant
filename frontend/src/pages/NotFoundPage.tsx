import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-20 text-center">
      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-6">
        <AlertTriangle className="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        404 — Page Not Found
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm">
        The page you're looking for doesn't exist. Maybe you took a wrong turn?
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
