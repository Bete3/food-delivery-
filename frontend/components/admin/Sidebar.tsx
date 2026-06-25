"use client";

import Link from "next/link";

type SidebarProps = {
  activeTab: "dashboard" | "orders";
  setActiveTab: (tab: "dashboard" | "orders") => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-white/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-orange-100/50 p-6 flex flex-col justify-between shrink-0 sticky top-0 md:h-screen z-10">
      <div className="space-y-8">
        {/* Modern branding header */}
        <div className="flex items-center gap-3 px-2">
          <div>
            <h2 className="font-bold text-slate-900 text-lg leading-tight tracking-normal">
              Food City
            </h2>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Control Panel
            </span>
          </div>
        </div>

        {/* Modern navigation: scrollable horizontally on mobile, stacked on desktop */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar md:overflow-visible pb-2 md:pb-0 scroll-smooth">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm tracking-normal whitespace-nowrap transition-all duration-300 ${
              activeTab === "dashboard"
                ? "bg-[var(--primary)] text-white shadow-[0_12px_24px_-10px_rgba(255,122,69,0.6)] translate-x-1"
                : "text-slate-500 hover:bg-orange-50/60 hover:text-[var(--primary)]"
            }`}
          >
            Admin Board
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm tracking-normal whitespace-nowrap transition-all duration-300 ${
              activeTab === "orders"
                ? "bg-[var(--primary)] text-white shadow-[0_12px_24px_-10px_rgba(255,122,69,0.6)] translate-x-1"
                : "text-slate-500 hover:bg-orange-50/60 hover:text-[var(--primary)]"
            }`}
          >
            Orders
          </button>
        </nav>
      </div>

      {/* Back to Home desktop anchor */}
      <div className="pt-4 mt-4 border-t border-slate-100 hidden md:block">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-500 tracking-normal transition-colors hover:bg-orange-50 hover:text-[var(--primary)] hover:border-orange-200"
        >
          ← Back to Home
        </Link>
      </div>
    </aside>
  );
}