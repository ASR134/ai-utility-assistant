import { CloudSun, Thermometer, Bot } from "lucide-react";
import { CopyButton } from "../common/CopyButton";

interface WeatherResultProps {
  response: string;
}

export function WeatherResult({ response }: WeatherResultProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/40">
            <CloudSun className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Weather Report
          </h3>
        </div>
        <CopyButton text={response} />
      </div>

      {/* AI Response */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 shrink-0 mt-0.5">
            <Bot className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          </div>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
            {response}
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30">
        <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5" />
          Data sourced via Open-Meteo
        </p>
      </div>
    </div>
  );
}
