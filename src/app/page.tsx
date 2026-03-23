"use client";

import { useState } from "react";
import { Upload, Camera, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PatientUploader() {
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-card shadow-sm sticky top-0 z-10 px-4 py-4 md:px-8 border-b border-[var(--color-alpha-green)] border-b-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-alpha-green)] flex items-center justify-center text-white font-bold">A</div>
            <span className="text-xl font-bold text-[var(--color-alpha-green-dark)] tracking-tight">Alpha<span className="text-[var(--color-alpha-green)]">Pharm</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[var(--color-alpha-green)]" /> Secure
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
        {success ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="mt-12 bg-card rounded-2xl shadow-lg border border-border p-8 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[var(--color-alpha-green)]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Script Sent Successfully!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your prescription has been securely transmitted to your selected Alpha Pharm branch. You will receive an SMS when it's ready for collection.
            </p>
            <button 
              onClick={() => [setSuccess(false), setFile(null)]}
              className="px-6 py-3 bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white font-semibold rounded-xl transition-all w-full md:w-auto"
            >
              Upload Another Script
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
            <div className="bg-[var(--color-alpha-green)] p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Upload Prescription</h1>
              <p className="text-white/80 md:text-lg">Send your script directly to your nearest pharmacy for quick dispensing.</p>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 md:p-8 space-y-6">
              
              {/* File Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Script Image / PDF <span className="text-red-500">*</span></label>
                <label htmlFor="script-upload" className="block border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:bg-gray-50 hover:border-[var(--color-alpha-green)] transition-colors cursor-pointer group">
                  <input required type="file" id="script-upload" className="hidden" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    {file ? (
                      <>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[var(--color-alpha-green)]">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="font-semibold text-[var(--color-alpha-green)] block text-lg max-w-[250px] md:max-w-xs truncate">{file.name}</span>
                          <span className="text-sm text-gray-500 mt-1 block">{(file.size / 1024 / 1024).toFixed(2)} MB • Tap to change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <div className="w-14 h-14 bg-gray-100 group-hover:bg-green-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[var(--color-alpha-green)] transition-colors">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="w-14 h-14 bg-gray-100 group-hover:bg-green-50 rounded-full flex items-center justify-center text-gray-500 group-hover:text-[var(--color-alpha-green)] transition-colors">
                            <Camera className="w-6 h-6" />
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 block text-lg">Tap to snap a photo or select a file</span>
                          <span className="text-sm text-gray-500 mt-1 block">JPG, PNG or PDF (Max 10MB)</span>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">ID Number <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] focus:border-transparent transition-all" placeholder="Enter ID number" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input required type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] focus:border-transparent transition-all" placeholder="082 123 4567" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Medical Aid Details (Optional)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] focus:border-transparent transition-all" placeholder="Scheme Name & Number" />
                </div>
              </div>

              {/* Branch Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Select Branch <span className="text-red-500">*</span></label>
                <select required defaultValue="" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] appearance-none cursor-pointer">
                  <option value="" disabled>Choose your nearest Alpha Pharm...</option>
                  <option value="sandton">Alpha Pharm Sandton</option>
                  <option value="rosebank">Alpha Pharm Rosebank</option>
                  <option value="capetown">Alpha Pharm Cape Town CBD</option>
                  <option value="durban">Alpha Pharm Umhlanga</option>
                  <option value="pretoria">Alpha Pharm Menlyn</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button type="submit" className="w-full bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
                  Submit Prescription <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Encrypted and POPIA Compliant
                </p>
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}
