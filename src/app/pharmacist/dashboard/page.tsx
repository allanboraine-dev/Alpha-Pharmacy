"use client";

import { useState } from "react";
import { FileText, Clock, CheckCircle2, MoreVertical, X, UploadCloud, Activity } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";

type ScriptStatus = "New" | "Processing" | "Ready for Collection";

interface Script {
  id: string;
  patientName: string;
  time: string;
  status: ScriptStatus;
  medAid?: string;
}

const INITIAL_SCRIPTS: Script[] = [
  { id: "SCR-1004", patientName: "Sarah Jenkins", time: "10 mins ago", status: "New", medAid: "Discovery Health" },
  { id: "SCR-1005", patientName: "Michael Chang", time: "25 mins ago", status: "New" },
  { id: "SCR-1002", patientName: "Rohan Naidoo", time: "1 hr ago", status: "Processing", medAid: "Bonitas" },
  { id: "SCR-1003", patientName: "Emily Venter", time: "2 hrs ago", status: "Ready for Collection" },
];

export default function KanbanBoard() {
  const [scripts, setScripts] = useLocalStorage<Script[]>("alpha_pharm_scripts", INITIAL_SCRIPTS);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [showIntegrations, setShowIntegrations] = useState(false);

  const columns: { title: ScriptStatus; icon: any; color: string; bgColor: string }[] = [
    { title: "New", icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Processing", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400" },
    { title: "Ready for Collection", icon: CheckCircle2, color: "text-[var(--color-alpha-green)]", bgColor: "bg-green-50 dark:bg-green-900/30 dark:text-green-400" },
  ];

  const handleExport = (system: string) => {
    alert(`Successfully pushed prescription ${selectedScript?.id} to ${system}.`);
    // Persisted state update via hook
    if (selectedScript?.status === "New") {
      setScripts(scripts.map(s => s.id === selectedScript.id ? { ...s, status: "Processing" } : s));
    }
    setShowIntegrations(false);
    setSelectedScript(null);
  };

  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Script Queue</h1>
          <p className="text-muted-foreground">Manage incoming patient prescriptions.</p>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search Patient..." className="border border-input bg-background rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] text-sm" />
          <button className="bg-[var(--color-alpha-green)] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[var(--color-alpha-green-light)] transition-colors">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-10">
        {columns.map((col, idx) => (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={col.title} className="bg-card rounded-2xl p-4 border border-border flex flex-col h-[600px]">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className={`p-1.5 rounded-lg ${col.bgColor} ${col.color}`}>
                <col.icon className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-foreground">{col.title}</h2>
              <span className="ml-auto bg-muted text-muted-foreground text-xs py-1 px-2 rounded-full font-bold">
                {scripts.filter(s => s.status === col.title).length}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              <AnimatePresence>
                {scripts.filter(s => s.status === col.title).map((script, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={script.id} 
                    onClick={() => setSelectedScript(script)}
                    className="bg-background cursor-pointer p-4 rounded-xl shadow-sm border border-border hover:shadow-md hover:border-[var(--color-alpha-green)] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-muted-foreground">{script.id}</span>
                      <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{script.patientName}</h3>
                    <div className="flex flex-col gap-1 mt-3">
                      {script.medAid && (
                         <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md w-fit font-medium">
                           {script.medAid}
                         </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> Received {script.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {scripts.filter(s => s.status === col.title).length === 0 && (
                <div className="h-32 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                  <p className="text-sm font-medium">No scripts</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedScript && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-background rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedScript.patientName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedScript.id} • {selectedScript.time}</p>
                </div>
                <button 
                  onClick={() => { setSelectedScript(null); setShowIntegrations(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 min-h-[300px] bg-muted rounded-2xl flex flex-col items-center justify-center border border-border text-muted-foreground relative overflow-hidden">
                  <FileText className="w-16 h-16 mb-2 opacity-50" />
                  <span>Script Preview</span>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                        {selectedScript.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    {!showIntegrations ? (
                      <button 
                        onClick={() => setShowIntegrations(true)}
                        className="w-full bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                      >
                        <UploadCloud className="w-5 h-5" />
                        Push to Dispensing Software
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                         <p className="text-sm font-bold text-foreground mb-2">Select Integration:</p>
                         <button onClick={() => handleExport('Allegra Health Network')} className="w-full bg-background border-2 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                           <Activity className="w-5 h-5" /> Allegra Health Network
                         </button>
                         <button onClick={() => handleExport('Unisolv')} className="w-full bg-background border-2 border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                           <Activity className="w-5 h-5" /> Unisolv
                         </button>
                         <button onClick={() => setShowIntegrations(false)} className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground font-medium">Cancel</button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
