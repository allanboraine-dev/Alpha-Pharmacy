"use client";

import { Package, Users, LayoutDashboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPrompt } from "@/components/install-prompt";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const handlePlaceholderClick = (moduleName: string) => {
    alert(`The ${moduleName} module is locked for this MVP demonstration.`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-[var(--color-alpha-green)] border-b-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-alpha-green)] flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="font-bold text-[var(--color-alpha-green-dark)] dark:text-gray-200 text-lg">Pharmacist</span>
        </div>
        <nav className="p-4 flex-1 space-y-2">
          <Link href="/pharmacist/dashboard" className="flex items-center gap-3 px-3 py-3 bg-green-50 dark:bg-green-900/20 text-[var(--color-alpha-green)] dark:text-green-400 rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5" /> Kanban Board
          </Link>
          <button onClick={() => handlePlaceholderClick("Inventory")} className="w-full flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl font-medium transition-colors">
            <Package className="w-5 h-5" /> Inventory
          </button>
          <button onClick={() => handlePlaceholderClick("Patients")} className="w-full flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" /> Patients
          </button>
          <button onClick={() => handlePlaceholderClick("Settings")} className="w-full flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-border flex flex-col gap-4">
          <InstallPrompt />
          <div className="flex items-center justify-between px-3">
            <div>
              <p className="text-sm font-bold text-foreground">Alpha Pharm Sandton</p>
              <p className="text-xs text-muted-foreground">Branch ID: 00142</p>
            </div>
          </div>
          <Link href="/pharmacist/login" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-medium w-full transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-card p-4 border-b border-[var(--color-alpha-green)] border-b-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-alpha-green)] flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-[var(--color-alpha-green-dark)] dark:text-gray-200">Pharmacist</span>
          </div>
          <div className="flex items-center gap-3">
             <InstallPrompt />
             <ThemeToggle />
             <Link href="/pharmacist/login"><LogOut className="w-5 h-5 text-muted-foreground hover:text-foreground" /></Link>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
