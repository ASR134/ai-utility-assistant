import type { PersonInfo } from "../../types/api";
import { User, Briefcase, Building2, MapPin, Hash } from "lucide-react";
import { CopyButton } from "../common/CopyButton";

interface PersonInfoCardProps {
  data: PersonInfo;
}

interface FieldRow {
  icon: React.ReactNode;
  label: string;
  value: string | number | null;
}

export function PersonInfoCard({ data }: PersonInfoCardProps) {
  const fields: FieldRow[] = [
    { icon: <User className="w-4 h-4" />, label: "Name", value: data.name },
    { icon: <Hash className="w-4 h-4" />, label: "Age", value: data.age },
    { icon: <Briefcase className="w-4 h-4" />, label: "Job Title", value: data.job_title },
    { icon: <Building2 className="w-4 h-4" />, label: "Company", value: data.company },
    { icon: <MapPin className="w-4 h-4" />, label: "City", value: data.city },
  ];

  const hasAnyData = fields.some((f) => f.value !== null && f.value !== undefined);

  const jsonString = JSON.stringify(data, null, 2);

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Extracted Person Info
          </h3>
          {!hasAnyData && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              No information found in the text
            </p>
          )}
        </div>
        <CopyButton text={jsonString} />
      </div>

      {/* Fields */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {fields.map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-5 py-3.5"
          >
            <div className="text-neutral-400 dark:text-neutral-500 shrink-0">{icon}</div>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 w-20 shrink-0">
              {label}
            </span>
            <span
              className={`text-sm flex-1 ${
                value !== null && value !== undefined
                  ? "text-neutral-900 dark:text-neutral-100 font-medium"
                  : "text-neutral-400 dark:text-neutral-600 italic"
              }`}
            >
              {value !== null && value !== undefined
                ? String(value)
                : "Not found"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
