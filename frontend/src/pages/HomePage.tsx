import { Link } from "react-router-dom";
import { MessageSquare, FileText, Languages, CloudSun, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    to: "/chat",
    icon: MessageSquare,
    iconBg: "bg-indigo-100 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    title: "AI Chat",
    description:
      "Have a conversation with Gemini. Supports real-time streaming so you see responses as they're generated.",
  },
  {
    to: "/extract",
    icon: FileText,
    iconBg: "bg-violet-100 dark:bg-violet-950/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Text Extraction",
    description:
      "Paste any text and extract structured person information: name, age, job title, company, and city.",
  },
  {
    to: "/translate",
    icon: Languages,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Translation",
    description:
      "Translate text between English, Hindi, Spanish, and French using Gemini's language understanding.",
  },
  {
    to: "/weather",
    icon: CloudSun,
    iconBg: "bg-sky-100 dark:bg-sky-950/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    title: "Weather Assistant",
    description:
      "Ask about the weather in any city. Powered by Gemini function calling with Open-Meteo data.",
  },
];

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 mb-6">
          <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 tracking-tight">
          AI Utility Assistant
        </h2>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
          AI assistant built on FastAPI and Gemini. Choose a
          feature below to get started.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ to, icon: Icon, iconBg, iconColor, title, description }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
              Open <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Status */}
      <div className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Backend running {" "}
          · FastAPI
        </p>
      </div>
    </div>
  );
}
