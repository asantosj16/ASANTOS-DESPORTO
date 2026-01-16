
import React, { useState, useMemo, useEffect } from 'react';
import { Timer, Footprints, Calculator, Activity, Trophy, Plus, Trash2, Calendar, Smile, TrendingUp, RefreshCw, Target, MessageSquare, Clock, Wind } from 'lucide-react';
import { RunningLog } from '../types';
import RunningPeriodization from './RunningPeriodization';

const RunningSection: React.FC = () => {
  // --- Estados da Calculadora de Ritmo (Pace) ---
  const [calcDist, setCalcDist] = useState<string>('10');
  const [calcH, setCalcH] = useState<string>('0');
  const [calcM, setCalcM] = useState<string>('50');
  const [calcS, setCalcS] = useState<string>('0');
  const [calcUnit, setCalcUnit] = useState<'km' | 'mi'>('km');

  // --- Estados do Calculadora de VO2 Max (Cooper) ---
  const [cooperDist, setCooperDist] = useState<string>('2400');
  const [cooperGender, setCooperGender] = useState<'male' | 'female'>('male');

  // --- Estados do Formulário de Registo ---
  const [logDist, setLogDist] = useState<string>('');
  const [logH, setLogH] = useState<string>('0');
  const [logM, setLogM] = useState<string>('');
  const [logS, setLogS] = useState<string>('0');
  const [logSensation, setLogSensation] = useState<RunningLog['sensation']>('Bem');
  const [logNotes, setLogNotes] = useState<string>('');
  
  // --- Persistência Local ---
  const [logs, setLogs] = useState<RunningLog[]>(() => {
    try {
      const saved = localStorage.getItem('asantos_running_logs_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('asantos_running_logs_v1', JSON.stringify(logs));
  }, [logs]);

  // --- Lógica da Calculadora de Ritmo ---
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

  // --- Lógica do VO2 Max (Cooper) ---
  const vo2Results = useMemo(() => {
    const dist = parseFloat(cooperDist);
    if (!dist || dist <= 504.9) return null;

    const vo2 = (dist - 504.9) / 44.73;
    
    const getClassification = (v: number, g: 'male' | 'female') => {
      const isMale = g === 'male';
      if (isMale) {
        if (v < 33) return { label: 'Muito Fraco', color: 'text-rose-500' };
        if (v < 36.5) return { label: 'Fraco', color: 'text-orange-500' };
        if (v < 42.5) return { label: 'Médio', color: 'text-yellow-500' };
        if (v < 46.5) return { label: 'Bom', color: 'text-emerald-500' };
        if (v < 52.5) return { label: 'Excelente', color: 'text-blue-500' };
        return { label: 'Superior', color: 'text-purple-500' };
      } else {
        if (v < 28) return { label: 'Muito Fraco', color: 'text-rose-500' };
        if (v < 31) return { label: 'Fraco', color: 'text-orange-500' };
        if (v < 35) return { label: 'Médio', color: 'text-yellow-500' };
        if (v < 39) return { label: 'Bom', color: 'text-emerald-500' };
        if (v < 45) return { label: 'Excelente', color: 'text-blue-500' };
        return { label: 'Superior', color: 'text-purple-500' };
      }
    };

    const rating = getClassification(vo2, cooperGender);
    return {
      value: vo2.toFixed(1),
      label: rating.label,
      color: rating.color
    };
  }, [cooperDist, cooperGender]);

  // --- Estatísticas de Evolução ---
  const stats = useMemo(() => {
    const totalKm = logs.reduce((acc, log) => acc + log.distance, 0);
    const totalSeconds = logs.reduce((acc, log) => acc + log.durationSeconds, 0);
    const maxDist = logs.length > 0 ? Math.max(...logs.map(l => l.distance)) : 0;
    
    let avgPace = "0:00";
    if (totalKm > 0) {
      const paceSecs = totalSeconds / totalKm;
      const m = Math.floor(paceSecs / 60);
      const s = Math.round(paceSecs % 60);
      avgPace = `${m}:${s.toString().padStart(2, '0')}`;
    }

    return { totalKm: totalKm.toFixed(1), avgPace, totalRuns: logs.length, maxDist };
  }, [logs]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseFloat(logDist);
    const h = parseInt(logH || '0');
    const m = parseInt(logM || '0');
    const s = parseInt(logS || '0');
    const totalSeconds = (h * 3600) + (m * 60) + s;

    if (!d || d <= 0 || totalSeconds <= 0) return;

    const paceSecs = totalSeconds / d;
    const pm = Math.floor(paceSecs / 60);
    const ps = Math.round(paceSecs % 60);
    
    const newLog: RunningLog = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('pt-PT'),
      distance: d,
      durationSeconds: totalSeconds,
      pace: `${pm}:${ps.toString().padStart(2, '0')}`,
      sensation: logSensation,
      notes: logNotes
    };

    setLogs([newLog, ...logs]);
    setLogDist(''); setLogM(''); setLogH('0'); setLogS('0'); setLogNotes('');
  };

  return (
    <div className="space-y-8 animate-fade-in-up stagger-3">
      
      {/* Resumo Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border-orange-500/20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Acumulado</p>
          <h4 className="text-3xl font-black text-white">{stats.totalKm} km</h4>
        </div>
        <div className="glass-card p-6 rounded-3xl border-blue-500/20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ritmo Médio</p>
          <h4 className="text-3xl font-black text-white">{stats.avgPace} min/km</h4>
        </div>
        <div className="glass-card p-6 rounded-3xl border-emerald-500/20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sessões</p>
          <h4 className="text-3xl font-black text-white">{stats.totalRuns} Treinos</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Registo de Treino */}
        <div className="glass-card rounded-3xl overflow-hidden border-emerald-500/20">
          <div className="p-6 border-b border-slate-800 bg-emerald-900/10 flex items-center gap-3">
            <Plus className="text-emerald-500" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Registar Treino</h3>
          </div>
          <form onSubmit={handleAddLog} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Distância (km)</label>
                <input type="number" step="0.01" required value={logDist} onChange={(e) => setLogDist(e.target.value)} className="w-full bg-slate-800 rounded-xl p-3 font-bold text-white outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Tempo (H:M:S)</label>
                <div className="flex gap-1">
                  <input type="number" value={logH} onChange={(e) => setLogH(e.target.value)} className="w-1/3 bg-slate-800 rounded-lg p-2 text-center font-bold" placeholder="H" />
                  <input type="number" value={logM} onChange={(e) => setLogM(e.target.value)} className="w-1/3 bg-slate-800 rounded-lg p-2 text-center font-bold" placeholder="M" />
                  <input type="number" value={logS} onChange={(e) => setLogS(e.target.value)} className="w-1/3 bg-slate-800 rounded-lg p-2 text-center font-bold" placeholder="S" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Notas</label>
              <textarea value={logNotes} onChange={(e) => setLogNotes(e.target.value)} className="w-full bg-slate-800 rounded-xl p-3 text-sm h-20 outline-none" placeholder="Opcional..." />
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-xs hover:bg-emerald-500 transition-all">Guardar Atividade</button>
          </form>
        </div>

        {/* Calculadoras */}
        <div className="space-y-8">
          
          {/* Calculadora de Pace */}
          <div className="glass-card rounded-3xl overflow-hidden border-orange-500/20 shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-orange-50/30 dark:bg-orange-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="text-orange-500" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Calculadora de Pace</h3>
              </div>
              <button 
                onClick={() => setCalcUnit(prev => prev === 'km' ? 'mi' : 'km')}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all text-white flex items-center gap-2 border border-slate-700 shadow-lg"
              >
                <RefreshCw size={12} /> {calcUnit === 'km' ? 'Quilómetros' : 'Milhas'}
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Target size={14} className="text-orange-500" /> Distância ({calcUnit})
                  </label>
                  <input type="number" value={calcDist} onChange={(e) => setCalcDist(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-2xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} className="text-orange-500" /> Tempo (H:M:S)
                  </label>
                  <div className="flex gap-2 h-[64px]">
                    <input type="number" value={calcH} onChange={(e) => setCalcH(e.target.value)} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 text-center text-lg font-black" placeholder="H" />
                    <input type="number" value={calcM} onChange={(e) => setCalcM(e.target.value)} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 text-center text-lg font-black" placeholder="M" />
                    <input type="number" value={calcS} onChange={(e) => setCalcS(e.target.value)} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 text-center text-lg font-black" placeholder="S" />
                  </div>
                </div>
              </div>

              {paceResults && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in">
                  <div className="bg-orange-600 p-5 rounded-3xl text-center shadow-xl border-b-4 border-orange-800">
                    <p className="text-[10px] font-black uppercase text-orange-200 mb-1">Pace</p>
                    <div className="text-3xl font-black italic text-white">{paceResults.pace} <span className="text-[10px] not-italic opacity-80">{paceResults.unitLabel}</span></div>
                  </div>
                  <div className="bg-slate-900 dark:bg-white p-5 rounded-3xl text-center shadow-xl border-b-4 border-slate-700 dark:border-slate-300">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Velocidade</p>
                    <div className="text-3xl font-black italic text-white dark:text-slate-900">{paceResults.speed} <span className="text-[10px] not-italic opacity-80">{paceResults.speedLabel}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VO2 Max Cooper */}
          <div className="glass-card rounded-3xl overflow-hidden border-cyan-500/20 shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-cyan-50/30 dark:bg-cyan-900/10 flex items-center gap-3">
              <Wind className="text-cyan-500" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Teste de Cooper (VO2 Max)</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distância 12 min (m)</label>
                  <input type="number" value={cooperDist} onChange={(e) => setCooperDist(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-xl font-black text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Género</label>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl h-[60px]">
                    <button onClick={() => setCooperGender('male')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${cooperGender === 'male' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>MASC</button>
                    <button onClick={() => setCooperGender('female')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${cooperGender === 'female' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500'}`}>FEM</button>
                  </div>
                </div>
              </div>
              {vo2Results && (
                <div className="bg-slate-900/50 dark:bg-white/5 p-6 rounded-3xl border border-slate-800 dark:border-slate-700/50 text-center animate-in slide-in-from-top-4">
                   <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">VO2 Máximo Estimado</p>
                   <div className="text-5xl font-black italic text-white mb-2">{vo2Results.value} <span className="text-xs not-italic text-slate-500">ml/kg/min</span></div>
                   <div className={`text-sm font-black uppercase tracking-widest ${vo2Results.color}`}>Aptidão: {vo2Results.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RunningPeriodization />

    </div>
  );
};

export default RunningSection;
