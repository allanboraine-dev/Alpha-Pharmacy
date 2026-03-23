"use client";

import { BarChart3, Building2, Link as LinkIcon, ShieldAlert, LogOut, Search } from "lucide-react";
import NextLink from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const handlePlaceholderClick = (moduleName: string) => {
    alert(`The ${moduleName} module is locked for this MVP demonstration.`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121f17] text-white border-r border-[#1e3427] hidden md:flex flex-col">
        <div className="p-6 border-b border-[#1e3427] flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[var(--color-alpha-green)] font-bold text-sm">A</div>
          <span className="font-bold text-white text-lg tracking-tight">Alpha<span className="text-gray-400">HQ</span></span>
        </div>
        <nav className="p-4 flex-1 space-y-2">
          <NextLink href="/admin" className="flex items-center gap-3 px-3 py-3 bg-[var(--color-alpha-green-light)] rounded-xl font-medium text-white">
            <BarChart3 className="w-5 h-5" /> Analytics
          </NextLink>
          <button onClick={() => handlePlaceholderClick("Sub-Franchisees")} className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-[#1e3427] hover:text-white rounded-xl font-medium transition-colors">
            <Building2 className="w-5 h-5" /> Sub-Franchisees
          </button>
          <button onClick={() => handlePlaceholderClick("Compliance")} className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-[#1e3427] hover:text-white rounded-xl font-medium transition-colors">
             <ShieldAlert className="w-5 h-5" /> Compliance
          </button>
          <button onClick={() => handlePlaceholderClick("Integrations")} className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-[#1e3427] hover:text-white rounded-xl font-medium transition-colors">
            <LinkIcon className="w-5 h-5" /> Integrations
          </button>
        </nav>
        <div className="p-4 border-t border-[#1e3427]">
          <div className="mb-4 px-3">
             <p className="text-sm font-bold text-gray-100">Super Admin</p>
             <p className="text-xs text-gray-400">Level 5 Clearance</p>
          </div>
          <NextLink href="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-[#1e3427] hover:text-white rounded-xl font-medium w-full transition-colors">
            <LogOut className="w-5 h-5" /> Log Out
          </NextLink>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar for search */}
        <header className="bg-card px-8 py-4 border-b border-border flex items-center justify-between shadow-sm z-10">
          <div className="flex bg-muted rounded-lg px-3 py-2 w-96 items-center border border-border">
             <Search className="w-5 h-5 text-muted-foreground cursor-text" />
             <input type="text" placeholder="Search branches, scripts, audits..." className="bg-transparent border-none focus:outline-none focus:ring-0 ml-2 w-full text-sm text-foreground placeholder-muted-foreground" />
          </div>
          <div className="flex gap-4 items-center">
             <div className="text-right">
                <span className="block text-sm font-bold text-foreground">Head Office Portal</span>
                <span className="block text-xs text-muted-foreground">Johannesburg, ZA</span>
             </div>
             <div className="w-10 h-10 bg-muted border border-border rounded-full"></div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-background p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
