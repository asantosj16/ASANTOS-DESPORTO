
import React, { useState, useEffect } from 'react';
import { Waves, Plus, ClipboardList, Calendar, Trash2, Activity, Timer } from 'lucide-react';
import { SwimmingLog as SwimmingLogType } from '../types';

const SwimmingLog: React.FC = () => {
  const [logs, setLogs] = useState<SwimmingLogType[]>(() => {
    const saved = localStorage.getItem('asantos_swimming_logs_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [newLog, setNewLog] = useState<Partial<SwimmingLogType>>({
    style: 'Crawl',
    intensity: 'Z2',
    distance: 0,
    durationMinutes: 0
  });

  useEffect(() => {
    localStorage.setItem('asantos_swimming_logs_v1', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = () => {
    if (!newLog.distance || !newLog.durationMinutes) return;
    
    const log: SwimmingLogType = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('pt-PT'),
      style: newLog.style as any,
      distance: Number(newLog.distance),
      durationMinutes: Number(newLog.durationMinutes),
      intensity: newLog.intensity as any,
      notes: newLog.notes
    };

    setLogs([log, ...logs]);
    setNewLog({ ...newLog, distance: 0, durationMinutes: 0, notes: '' });
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl mb-12">
      <div className="p-8 border-b border-slate-800 bg-slate-900/20 flex items-center gap-4">
        <div className="bg-sky-600 p-2 rounded-xl text-white shadow-lg">
          <Waves size={22} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Diário de Natação</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Controlo de Metragem e Intensidade Aquática</p>
        </div>
      </div>

      <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Plus size={16} className="text-sky-500" /> Registar Sessão
          </h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase">Estilo Predominante</label>
              <select 
                value={newLog.style} 
                onChange={(e) => setNewLog({...newLog, style: e.target.value as any})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option>Crawl</option>
                <option>Costas</option>
                <option>Bruços</option>
                <option>Mariposa</option>
                <option>Medley</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase">Distância (Metros)</label>
                <input 
                  type="number" 
                  value={newLog.distance || ''} 
                  onChange={(e) => setNewLog({...newLog, distance: Number(e.target.value)})}
                  placeholder="Ex: 1500"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase">Tempo (Minutos)</label>
                <input 
                  type="number" 
                  value={newLog.durationMinutes || ''} 
                  onChange={(e) => setNewLog({...newLog, durationMinutes: Number(e.target.value)})}
                  placeholder="Ex: 45"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase">Intensidade</label>
              <div className="flex gap-1.5">
                {['Z1', 'Z2', 'Z3', 'Z4', 'Z5'].map((z) => (
                  <button 
                    key={z} 
                    onClick={() => setNewLog({...newLog, intensity: z as any})}
                    className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${newLog.intensity === z ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddLog}
              className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-600 hover:text-white transition-all shadow-xl"
            >
              Arquivar Treino
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" /> Histórico Aquático
          </h4>

          {logs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
              {logs.map((log) => (
                <div key={log.id} className="bg-slate-950/60 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-sky-500/30 transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-sky-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{log.style}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">{log.date}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-500 uppercase block">Volume</span>
                        <span className="text-sm font-black text-white italic">{log.distance} <span className="text-[10px] not-italic opacity-50 uppercase">m</span></span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-500 uppercase block">Tempo</span>
                        <span className="text-sm font-black text-white italic">{log.durationMinutes} <span className="text-[10px] not-italic opacity-50 uppercase">min</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="px-2 py-1 bg-slate-900 rounded text-[8px] font-black text-sky-400 uppercase tracking-widest">{log.intensity}</span>
                    <button onClick={() => removeLog(log.id)} className="text-slate-700 hover:text-rose-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600 gap-4">
              <ClipboardList size={32} />
              <p className="text-xs font-black uppercase tracking-widest">Sem treinos registados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwimmingLog;
