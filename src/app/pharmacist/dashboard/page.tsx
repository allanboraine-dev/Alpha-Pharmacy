"use client";

import { useState } from "react";
import { FileText, Clock, CheckCircle2, MoreVertical, X, UploadCloud, Activity, RefreshCw, Printer, Download } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";

type ScriptStatus = "New" | "Processing" | "Ready for Collection";

interface Script {
  id: string;
  patientName: string;
  idNumber?: string;
  phoneNumber?: string;
  medicalAid?: string;
  medication?: string;
  status: ScriptStatus;
  timeUploaded: string;
}

const INITIAL_SCRIPTS: Script[] = [
  { id: "RX-10492", patientName: "Sipho Ndlovu", idNumber: "8205145089081", phoneNumber: "0821234567", medicalAid: "Discovery Health", medication: "Glucophage 500mg, Amloc 5mg", status: "New", timeUploaded: "10 mins ago" },
  { id: "RX-10493", patientName: "Johan van der Merwe", idNumber: "7509215111084", phoneNumber: "0832345678", medicalAid: "Bestmed", medication: "Eltroxin 100mcg", status: "Processing", timeUploaded: "45 mins ago" },
  { id: "RX-10494", patientName: "Lerato Khumalo", idNumber: "9003120045082", phoneNumber: "0713456789", medicalAid: "GEMS", medication: "Purata 10mg", status: "Ready for Collection", timeUploaded: "2 hours ago" },
];

export default function KanbanBoard() {
  const [scripts, setScripts] = useLocalStorage<Script[]>("alpha_pharm_scripts_sa_mock", INITIAL_SCRIPTS);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Completely reset the board back to the original Demo state
      setScripts(INITIAL_SCRIPTS);
      setIsRefreshing(false);
    }, 800);
  };

  const handleStatusChange = (newStatus: ScriptStatus | "Completed") => {
    if (newStatus === "Completed") {
      if (selectedScript?.phoneNumber) {
        // Format to international generic standard (South Africa assumption based on MVP)
        let formattedPhone = selectedScript.phoneNumber.replace(/\D/g, "");
        if (formattedPhone.startsWith("0")) {
          formattedPhone = "27" + formattedPhone.substring(1);
        }
        
        const message = encodeURIComponent(`Hello ${selectedScript.patientName},\n\nYour prescription (${selectedScript.id}) has been successfully processed, signed off, and archived.\n\nThank you for using Alpha Pharm.`);
        window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
      }

      setScripts(scripts.filter(s => s.id !== selectedScript?.id));
    } else {
      setScripts(scripts.map(s => s.id === selectedScript?.id ? { ...s, status: newStatus as ScriptStatus } : s));
    }
    setShowIntegrations(false);
    setSelectedScript(null);
  };

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
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-[var(--color-alpha-green)] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[var(--color-alpha-green-light)] transition-colors disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
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
                      {script.medication && (
                         <span className="text-xs font-semibold text-foreground mb-1 line-clamp-1">
                           {script.medication}
                         </span>
                      )}
                      {script.medicalAid && (
                         <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md w-fit font-medium">
                           {script.medicalAid}
                         </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> Received {script.timeUploaded}
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
                  <p className="text-sm text-muted-foreground">{selectedScript.id} • {selectedScript.timeUploaded}</p>
                  {selectedScript.idNumber && <p className="text-sm font-medium text-foreground mt-1">ID: {selectedScript.idNumber}</p>}
                </div>
                <button 
                  onClick={() => { setSelectedScript(null); setShowIntegrations(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 min-h-[400px] bg-slate-50 rounded-2xl flex flex-col border border-border text-gray-800 relative overflow-hidden group shadow-inner p-6 md:p-8 font-sans">
                  {/* Dummy Script Header */}
                  <div className="border-b border-gray-300 pb-3 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 leading-tight">Dr. Sarah Jenkins</h3>
                        <p className="text-xs text-gray-500">MBChB (UP), FC Fam Med (SA)</p>
                        <p className="text-xs text-gray-500">Pr No. 1234567 | HPCSA 987654</p>
                      </div>
                      <div className="text-right text-xs text-gray-500 leading-tight">
                        <p>123 Medical Centre</p>
                        <p>Sandton, 2196</p>
                        <p>011 555 1234</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dummy Script Patient Info */}
                  <div className="mb-4 bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-sm mb-1">
                      <p><span className="font-semibold text-gray-600">Patient:</span> {selectedScript.patientName}</p>
                      <p><span className="font-semibold text-gray-600">Date:</span> {new Date().toLocaleDateString()}</p>
                    </div>
                    {selectedScript.idNumber && <p className="text-sm"><span className="font-semibold text-gray-600">ID:</span> {selectedScript.idNumber}</p>}
                  </div>

                  {/* Dummy Script Body */}
                  <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-2 left-2 text-6xl text-blue-900/10 font-serif select-none pointer-events-none">Rx</div>
                    
                    {selectedScript.medication ? (
                      <div className="space-y-4 relative z-10 pt-6">
                        {selectedScript.medication.split(',').map((med, i) => (
                           <div key={i} className="pl-4 border-l-2 border-blue-900/30">
                             <p className="font-bold text-base font-mono text-gray-800">{med.trim()}</p>
                             <p className="text-xs italic text-gray-600">Sig: As directed. Mitte: 30 days.</p>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4 relative z-10 pt-6">
                         <div className="pl-4 border-l-2 border-blue-900/30">
                           <p className="font-bold text-base font-mono text-gray-800">Amoxicillin 500mg Caps</p>
                           <p className="text-xs italic text-gray-600">Sig: 1 po tds for 5 days. Mitte: 15.</p>
                         </div>
                         <div className="pl-4 border-l-2 border-blue-900/30">
                           <p className="font-bold text-base font-mono text-gray-800">Ibuprofen 400mg Tabs</p>
                           <p className="text-xs italic text-gray-600">Sig: 1 po bd prn pain. Mitte: 20.</p>
                         </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Dummy Script Footer */}
                  <div className="mt-6 flex justify-between items-end">
                     <div>
                       <p className="text-xs font-semibold text-gray-500">Repetatur: 0</p>
                     </div>
                     <div className="text-center">
                       <div className="w-32 border-b-2 border-blue-900/40 mb-1 pb-1 text-blue-900 font-bold italic text-lg" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                         S. Jenkins
                       </div>
                       <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Authorized Signature</p>
                     </div>
                  </div>
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button onClick={() => alert("Printing script...")} className="p-2.5 bg-background shadow-lg border border-border rounded-xl text-foreground hover:bg-[var(--color-alpha-green)] hover:text-white hover:border-transparent transition-all flex items-center justify-center" title="Print Script">
                      <Printer className="w-5 h-5" />
                    </button>
                    <button onClick={() => alert("Downloading secure PDF...")} className="p-2.5 bg-background shadow-lg border border-border rounded-xl text-foreground hover:bg-[var(--color-alpha-green)] hover:text-white hover:border-transparent transition-all flex items-center justify-center" title="Download Document">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                        {selectedScript.status}
                      </span>
                    </div>
                    {selectedScript.medication && (
                      <div>
                        <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Prescribed</span>
                        <span className="text-sm font-medium text-foreground">{selectedScript.medication}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    {selectedScript.status === "New" && !showIntegrations && (
                      <button 
                        onClick={() => setShowIntegrations(true)}
                        className="w-full bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                      >
                        <UploadCloud className="w-5 h-5" />
                        Push to Dispensing Software
                      </button>
                    )}
                    {selectedScript.status === "New" && showIntegrations && (
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
                    {selectedScript.status === "Processing" && (
                      <button 
                        onClick={() => handleStatusChange("Ready for Collection")}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Mark Ready for Collection
                      </button>
                    )}
                    {selectedScript.status === "Ready for Collection" && (
                      <button 
                        onClick={() => handleStatusChange("Completed")}
                        className="w-full bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Sign Off & Archive
                      </button>
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
