
import React, { useState, useMemo, useEffect } from 'react';
import { Timer, Footprints, Calculator, RefreshCw, Target, Clock, Wind, Plus, Trophy, Zap } from 'lucide-react';
import { RunningLog } from '../types';
import RunningPeriodization from './RunningPeriodization';

const RunningSection: React.FC = () => {
  // --- Estados da Calculadora de Ritmo ---
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

  // --- Lógica de Cálculo de Ritmo (Pace) ---
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
      {/* Calculadoras Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Calculadora de Ritmo Profissional */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-orange-500/20 shadow-2xl">
          <div className="p-8 border-b border-slate-800 bg-orange-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg">
                <Calculator size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">Calculadora de Ritmo</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Performance & Estimativa</p>
              </div>
            </div>
            
            {/* Toggle de Unidade */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 w-fit">
              <button 
                onClick={() => setCalcUnit('km')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase ${calcUnit === 'km' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                KM
              </button>
              <button 
                onClick={() => setCalcUnit('mi')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase ${calcUnit === 'mi' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                MILHAS
              </button>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Distância */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 tracking-widest">
                  <Target size={14} className="text-orange-500" /> Distância ({calcUnit.toUpperCase()})
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={calcDist} 
                    onChange={(e) => setCalcDist(e.target.value)} 
                    className="w-full bg-slate-800/50 border-2 border-slate-700/50 rounded-3xl p-5 text-4xl font-black text-white focus:border-orange-500 outline-none transition-all shadow-inner" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-black uppercase text-xs">{calcUnit}</span>
                </div>
              </div>
              
              {/* Tempo Detalhado */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 tracking-widest">
                  <Clock size={14} className="text-orange-500" /> Tempo Total (H:M:S)
                </label>
                <div className="grid grid-cols-3 gap-2 h-[84px]">
                  <div className="relative">
                    <input type="number" placeholder="H" value={calcH} onChange={(e) => setCalcH(e.target.value)} className="w-full h-full bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-center text-2xl font-black text-white outline-none focus:border-orange-500 transition-all" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600 uppercase">Horas</span>
                  </div>
                  <div className="relative">
                    <input type="number" placeholder="M" value={calcM} onChange={(e) => setCalcM(e.target.value)} className="w-full h-full bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-center text-2xl font-black text-white outline-none focus:border-orange-500 transition-all" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600 uppercase">Min</span>
                  </div>
                  <div className="relative">
                    <input type="number" placeholder="S" value={calcS} onChange={(e) => setCalcS(e.target.value)} className="w-full h-full bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-center text-2xl font-black text-white outline-none focus:border-orange-500 transition-all" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600 uppercase">Seg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados */}
            {paceResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-700">
                    <Zap size={120} />
                  </div>
                  <p className="text-[10px] font-black uppercase text-orange-200 mb-2 tracking-widest relative z-10">Ritmo Médio Necessário</p>
                  <div className="text-5xl font-black italic text-white relative z-10">
                    {paceResults.pace} 
                    <span className="text-sm not-italic ml-2 opacity-80 font-black uppercase">{paceResults.unitLabel}</span>
                  </div>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl flex flex-col justify-center">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Velocidade Média</p>
                  <div className="text-4xl font-black italic text-white">
                    {paceResults.speed} 
                    <span className="text-sm not-italic ml-2 text-slate-500 font-black uppercase">{paceResults.speedLabel}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-800 rounded-[2rem] text-center">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Insira os dados acima para calcular o Ritmo</p>
              </div>
            )}
          </div>
        </div>

        {/* Teste de Cooper (VO2 Max) */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden border-cyan-500/20 shadow-2xl">
          <div className="p-8 border-b border-slate-800 bg-cyan-900/10 flex items-center gap-3">
            <div className="bg-cyan-600 p-2 rounded-xl text-white shadow-lg">
              <Wind size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">Teste de Cooper (12 min)</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Capacidade Cardiorrespiratória</p>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distância Percorrida (metros)</label>
                <input type="number" value={cooperDist} onChange={(e) => setCooperDist(e.target.value)} className="w-full bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl p-4 text-3xl font-black text-white focus:border-cyan-500 outline-none transition-all" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Género</label>
                <div className="flex bg-slate-950 p-1 rounded-2xl h-[68px] border border-slate-800">
                  <button onClick={() => setCooperGender('male')} className={`flex-1 rounded-xl text-[10px] font-black transition-all ${cooperGender === 'male' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>MASCULINO</button>
                  <button onClick={() => setCooperGender('female')} className={`flex-1 rounded-xl text-[10px] font-black transition-all ${cooperGender === 'female' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>FEMININO</button>
                </div>
              </div>
            </div>
            {vo2Results && (
              <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 text-center animate-in slide-in-from-top-2 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                 <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">VO2 Máximo Estimado</p>
                 <div className="text-6xl font-black italic text-white mb-2 tracking-tighter">
                   {vo2Results.value} 
                   <span className="text-xs not-italic text-slate-500 ml-2">ml/kg/min</span>
                 </div>
                 <div className={`text-sm font-black uppercase tracking-[0.2em] ${vo2Results.color}`}>
                   Classificação: {vo2Results.label}
                 </div>
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
