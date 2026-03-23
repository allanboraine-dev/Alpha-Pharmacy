"use client";

import { useState } from "react";
import { TrendingUp, Activity, FileText, CheckCircle2, Clock, Plus, Building2, Search, Link as LinkIcon, Settings } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";

const chartData = [
  { name: 'Oct', scripts: 2400 },
  { name: 'Nov', scripts: 4398 },
  { name: 'Dec', scripts: 6800 },
  { name: 'Jan', scripts: 9908 },
  { name: 'Feb', scripts: 12800 },
  { name: 'Mar', scripts: 15300 },
];

const INITIAL_BRANCHES = [
  { id: '1', name: 'Alpha Pharm Sandton', status: 'Active', color: 'bg-green-100 text-green-700', scripts: '1,204' },
  { id: '2', name: 'Alpha Pharm Rosebank', status: 'Active', color: 'bg-green-100 text-green-700', scripts: '982' },
  { id: '3', name: 'Alpha Pharm Umhlanga', status: 'Inactive', color: 'bg-gray-100 text-gray-500', scripts: '0' },
  { id: '4', name: 'Alpha Pharm Menlyn', status: 'Provisioning', color: 'bg-amber-100 text-amber-700', scripts: 'N/A' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useLocalStorage("alpha_admin_tab", "analytics");
  const [branches, setBranches] = useLocalStorage("alpha_admin_branches", INITIAL_BRANCHES);
  const [showToast, setShowToast] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: '', email: '', software: 'Allegra Health Network' });

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name) return;
    
    // Add new branch to state (persisted via LocalStorage)
    setBranches(prev => [
      { id: Date.now().toString(), name: newBranch.name, status: 'Provisioning', color: 'bg-amber-100 text-amber-700', scripts: '0' },
      ...prev
    ]);
    
    setNewBranch({ name: '', email: '', software: 'Allegra Health Network' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
         <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">SaaS Performance</h1>
           <p className="text-gray-500 mt-1">Real-time metrics for Alpha Pharm script uploader network.</p>
         </div>
       </div>

       {/* Tabs */}
       <div className="flex rounded-xl bg-gray-200/50 p-1 mb-8 w-fit border border-gray-200">
         <button 
           onClick={() => setActiveTab("analytics")}
           className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${activeTab === 'analytics' ? 'bg-white text-[var(--color-alpha-green)] border border-gray-200' : 'text-gray-600 hover:text-gray-800 border border-transparent hover:bg-white/50'}`}
         >
           Global Analytics
         </button>
         <button 
           onClick={() => setActiveTab("branches")}
           className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${activeTab === 'branches' ? 'bg-white text-[var(--color-alpha-green)] border border-gray-200' : 'text-gray-600 hover:text-gray-800 border border-transparent hover:bg-white/50'}`}
         >
           Manage Branches (Onboard)
         </button>
       </div>

       {activeTab === 'analytics' && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Network Scripts Uploaded", value: "42,891", icon: FileText, trend: "+14.2%", color: "text-[var(--color-alpha-green)]", bg: "bg-green-50" },
                { title: "Active Franchisees", value: `${branches.filter(b => b.status === 'Active').length}/900`, icon: Building2, trend: "+2", color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Avg. Time Saved", value: "12m 45s", icon: Clock, trend: "-2.5m", color: "text-purple-600", bg: "bg-purple-50" }
              ].map((metric, i) => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[var(--color-alpha-green-light)] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 ${metric.bg} rounded-xl flex items-center justify-center ${metric.color}`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                    <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
                      <TrendingUp className="w-3 h-3 mr-1" /> {metric.trend}
                    </span>
                  </div>
                  <h3 className="text-gray-500 font-medium font-sm mb-1">{metric.title}</h3>
                  <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
                  <div className="absolute right-0 bottom-0 opacity-5 w-24 h-24 -mr-4 -mb-4">
                    <metric.icon className="w-full h-full" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recharts Area */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Adoption Growth (Last 6 Months)</h2>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScripts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E5631" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1E5631" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="scripts" stroke="#1E5631" strokeWidth={3} fillOpacity={1} fill="url(#colorScripts)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
         </motion.div>
       )}

       {activeTab === 'branches' && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h2 className="text-lg font-bold text-gray-800">Franchisee Directory</h2>
               </div>
               <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 tracking-wider">
                        <th className="p-4 font-bold">Branch Name</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold">Scripts Handled</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <AnimatePresence>
                        {branches.map((branch: any) => (
                          <motion.tr initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} key={branch.id} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4 text-sm font-semibold text-gray-800">{branch.name}</td>
                             <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${branch.color}`}>{branch.status}</span></td>
                             <td className="p-4 text-sm text-gray-500">{branch.scripts}</td>
                             <td className="p-4 text-right">
                               <button className="text-gray-400 hover:text-[var(--color-alpha-green)] transition-colors"><Settings className="w-4 h-4 ml-auto" /></button>
                             </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
               <h2 className="text-lg font-bold text-gray-800 mb-2">Onboard New Branch</h2>
               <p className="text-sm text-gray-500 mb-6">Provision a new multi-tenant environment for a franchisee.</p>
               
               <form onSubmit={handleOnboard} className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-700 uppercase">Branch Name</label>
                   <input required value={newBranch.name} onChange={e => setNewBranch({...newBranch, name: e.target.value})} type="text" placeholder="e.g. Alpha Pharm Fourways" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)]" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-700 uppercase">Manager Email</label>
                   <input required value={newBranch.email} onChange={e => setNewBranch({...newBranch, email: e.target.value})} type="email" placeholder="manager@alphapharm.co.za" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)]" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Dispensing Software</label>
                   <select value={newBranch.software} onChange={e => setNewBranch({...newBranch, software: e.target.value})} className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-alpha-green)] text-gray-700">
                     <option>Allegra Health Network</option>
                     <option>Unisolv</option>
                     <option>Other / API</option>
                   </select>
                 </div>
                 
                 <button type="submit" className="w-full mt-4 bg-[var(--color-alpha-green)] hover:bg-[var(--color-alpha-green-light)] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                   <Plus className="w-4 h-4" /> Provision Tenant Workspace
                 </button>
               </form>

               <AnimatePresence>
                 {showToast && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm flex items-start gap-2">
                     <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                     <div>
                       <span className="font-bold block">Provisioning Started</span>
                       <span className="text-xs">The franchisee will receive an email shortly with their Admin portal login.</span>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
         </motion.div>
       )}
    </div>
  );
}
