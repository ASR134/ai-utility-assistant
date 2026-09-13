import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-4">
        <Icon className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
      </div>
      <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-1">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
        {description}
      </p>
    </div>
  );
}
