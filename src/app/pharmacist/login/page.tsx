"use client";

import { useState } from "react";
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPrompt } from "@/components/install-prompt";

export default function PharmacistLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pharmacist/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 flex items-center gap-4">
         <InstallPrompt />
         <ThemeToggle />
      </div>
      <div className="max-w-md w-full bg-white dark:bg-card rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-border">
        <div className="bg-[var(--color-alpha-green)] p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
           <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
             <span className="text-3xl font-bold tracking-tighter text-[var(--color-alpha-green)]">AP</span>
           </div>
           <h1 className="text-2xl font-bold text-white mb-1">Pharmacist Portal</h1>
           <p className="text-white/80 text-sm">Sign in to manage incoming scripts</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6 text-gray-700">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Username / Branch ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input required type="text" className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] transition-all" placeholder="Enter ID" defaultValue="pharm_sandton_01" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input required type={showPassword ? "text" : "password"} className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] transition-all" placeholder="••••••••" defaultValue="password123" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[var(--color-alpha-green)] focus:ring-[var(--color-alpha-green)]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-semibold text-[var(--color-alpha-green)] hover:underline">Forgot Password?</a>
          </div>
          
          <button type="submit" className="w-full bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
