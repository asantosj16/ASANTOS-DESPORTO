
import React, { useState, useMemo, useEffect } from 'react';
import { Timer, Footprints, Calculator, RefreshCw, Target, Clock, Wind, Plus, Trophy } from 'lucide-react';
import { RunningLog } from '../types';
import RunningPeriodization from './RunningPeriodization';

const RunningSection: React.FC = () => {
  // --- Estados da Calculadora de Pace ---
  const [calcDist, setCalcDist] = useState<string>('10');
  const [calcH, setCalcH] = useState<string>('0');
  const [calcM, setCalcM] = useState<string>('50');
  const [calcS, setCalcS] = useState<string>('0');
  const [calcUnit, setCalcUnit] = useState<'km' | 'mi'>('km');

  // --- Estados do Cooper (VO2 Max) ---
  const [cooperDist, setCooperDist] = useState<string>('2400');
  const [cooperGender, setCooperGender] = useState<'male' | 'female'>('male');

  // --- Persistência de Logs ---
  const [logs, setLogs] = useState<RunningLog[]>(() => {
    try {
      const saved = localStorage.getItem('asantos_running_logs_v1');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('asantos_running_logs_v1', JSON.stringify(logs));
  }, [logs]);

  // --- Lógica de Cálculo de Pace ---
  const paceResults = useMemo(() => {
    const d = parseFloat(calcDist);
    const h = parseInt(calcH || '0');
    const m = parseInt(calcM || '0');
    const s = parseInt(calcS || '0');
    const totalSeconds = (h * 3600) + (m * 60) + s;
    
    if (!d || d <= 0 || totalSeconds <= 0) return null;

    const paceTotalSeconds = totalSeconds / d;
    const paceM = Math.floor(paceTotalSeconds / 60);
    const paceS = Math.round(paceTotalSeconds % 60);
    const speed = (d / (totalSeconds / 3600)).toFixed(2);

    return {
      pace: `${paceM}:${paceS.toString().padStart(2, '0')}`,
      speed: speed,
      unitLabel: calcUnit === 'km' ? 'min/km' : 'min/mi',
      speedLabel: calcUnit === 'km' ? 'km/h' : 'mph'
    };
  }, [calcDist, calcH, calcM, calcS, calcUnit]);

  // --- Lógica de Classificação VO2 Max ---
  const vo2Results = useMemo(() => {
    const dist = parseFloat(cooperDist);
    if (!dist || dist <= 504.9) return null;
    const vo2 = (dist - 504.9) / 44.73;
    
    const getClass = (v: number, g: 'male' | 'female') => {
      const male = g === 'male';
      if (male) {
        if (v < 33) return { label: 'Fraco', color: 'text-rose-500' };
        if (v < 42.5) return { label: 'Médio', color: 'text-yellow-500' };
        if (v < 52.5) return { label: 'Bom', color: 'text-emerald-500' };
        return { label: 'Superior', color: 'text-blue-500' };
      } else {
        if (v < 28) return { label: 'Fraco', color: 'text-rose-500' };
        if (v < 35) return { label: 'Médio', color: 'text-yellow-500' };
        if (v < 45) return { label: 'Bom', color: 'text-emerald-500' };
        return { label: 'Superior', color: 'text-blue-500' };
      }
    };
    return { value: vo2.toFixed(1), ...getClass(vo2, cooperGender) };
  }, [cooperDist, cooperGender]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Calculadoras */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Calculadora de Pace Profissional */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-orange-500/20 shadow-2xl">
          <div className="p-8 border-b border-slate-800 bg-orange-900/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="text-orange-500" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Calculadora de Pace</h3>
            </div>
            <button 
              onClick={() => setCalcUnit(prev => prev === 'km' ? 'mi' : 'km')}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase text-orange-400 hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2 shadow-lg"
            >
              <RefreshCw size={12} /> {calcUnit === 'km' ? 'Quilómetros' : 'Milhas'}
            </button>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                  <Target size={14} className="text-orange-500" /> Distância ({calcUnit})
                </label>
                <input 
                  type="number" 
                  value={calcDist} 
                  onChange={(e) => setCalcDist(e.target.value)} 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-3xl font-black text-white focus:ring-2 focus:ring-orange-500 outline-none" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                  <Clock size={14} className="text-orange-500" /> Tempo (H : M : S)
                </label>
                <div className="flex gap-2 h-[68px]">
                  <input type="number" placeholder="H" value={calcH} onChange={(e) => setCalcH(e.target.value)} className="w-1/3 bg-slate-800/50 border border-slate-700 rounded-2xl p-2 text-center text-xl font-black text-white outline-none" />
                  <input type="number" placeholder="M" value={calcM} onChange={(e) => setCalcM(e.target.value)} className="w-1/3 bg-slate-800/50 border border-slate-700 rounded-2xl p-2 text-center text-xl font-black text-white outline-none" />
                  <input type="number" placeholder="S" value={calcS} onChange={(e) => setCalcS(e.target.value)} className="w-1/3 bg-slate-800/50 border border-slate-700 rounded-2xl p-2 text-center text-xl font-black text-white outline-none" />
                </div>
              </div>
            </div>

            {paceResults && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-300">
                <div className="bg-orange-600/90 p-6 rounded-3xl text-center shadow-xl border-b-4 border-orange-800">
                  <p className="text-[10px] font-black uppercase text-orange-200 mb-1 tracking-widest">Pace Médio</p>
                  <div className="text-4xl font-black italic text-white">{paceResults.pace} <span className="text-[10px] not-italic opacity-70 uppercase">{paceResults.unitLabel}</span></div>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl text-center shadow-xl border border-slate-700">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Velocidade</p>
                  <div className="text-3xl font-black italic text-white">{paceResults.speed} <span className="text-[10px] font-black not-italic opacity-70 uppercase">{paceResults.speedLabel}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Teste de Cooper */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-cyan-500/20 shadow-2xl">
          <div className="p-8 border-b border-slate-800 bg-cyan-900/10 flex items-center gap-3">
            <Wind className="text-cyan-500" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Teste de Cooper (12 min)</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distância Percorrida (m)</label>
                <input type="number" value={cooperDist} onChange={(e) => setCooperDist(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-2xl font-black text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Género</label>
                <div className="flex bg-slate-900 p-1 rounded-2xl h-[60px] border border-slate-800">
                  <button onClick={() => setCooperGender('male')} className={`flex-1 rounded-xl text-[10px] font-black transition-all ${cooperGender === 'male' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>MASCULINO</button>
                  <button onClick={() => setCooperGender('female')} className={`flex-1 rounded-xl text-[10px] font-black transition-all ${cooperGender === 'female' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>FEMININO</button>
                </div>
              </div>
            </div>
            {vo2Results && (
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center animate-in slide-in-from-top-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">VO2 Máximo Estimado</p>
                 <div className="text-5xl font-black italic text-white mb-2">{vo2Results.value} <span className="text-xs text-slate-500">ml/kg/min</span></div>
                 <div className={`text-sm font-black uppercase tracking-widest ${vo2Results.color}`}>Nível: {vo2Results.label}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RunningPeriodization />
    </div>
  );
};

export default RunningSection;
