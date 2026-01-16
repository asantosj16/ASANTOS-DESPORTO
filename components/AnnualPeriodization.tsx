
import React, { useState } from 'react';
import { Calendar, Dumbbell, Activity, TrendingUp, Target, Clock } from 'lucide-react';

interface Microcycle {
  week: number;
  focus: string;
  volume: string;
  intensity: string;
}

interface Macrocycle {
  name: string;
  period: string;
  objective: string;
  microcycles: Microcycle[];
}

const PERIODIZATION_DATA: Macrocycle[] = [
  {
    name: "Macrociclo Preparatório",
    period: "Meses 1-4",
    objective: "Desenvolvimento da base aeróbica e adaptação anatómica muscular.",
    microcycles: [
      { week: 1, focus: "Adaptação Neural", volume: "Baixo", intensity: "40-50%" },
      { week: 2, focus: "Técnica Base", volume: "Médio", intensity: "50-60%" },
      { week: 3, focus: "Volume Inicial", volume: "Alto", intensity: "60-70%" },
      { week: 4, focus: "Recuperação Ativa", volume: "Muito Baixo", intensity: "40%" }
    ]
  },
  {
    name: "Macrociclo Competitivo",
    period: "Meses 5-10",
    objective: "Pico de performance, força máxima e polimento técnico.",
    microcycles: [
      { week: 17, focus: "Força Explosiva", volume: "Baixo", intensity: "85-95%" },
      { week: 18, focus: "Resistência Específica", volume: "Médio", intensity: "80%" },
      { week: 19, focus: "Manutenção", volume: "Médio", intensity: "75%" },
      { week: 20, focus: "Tapering (Polimento)", volume: "Mínimo", intensity: "90%" }
    ]
  }
];

const AnnualPeriodization: React.FC = () => {
  const [activeMacro, setActiveMacro] = useState(0);

  return (
    <div className="space-y-8 animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-6 rounded-3xl border-blue-500/20">
        <div className="flex items-center gap-3 px-2">
          <Calendar className="text-blue-500" size={28} />
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Periodização de Alto Rendimento</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Macro-Ciclos e Micro-Ciclos Semanais</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           {PERIODIZATION_DATA.map((m, i) => (
             <button 
                key={i}
                onClick={() => setActiveMacro(i)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeMacro === i ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
             >
                {m.name.split(' ')[1]}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-card p-8 rounded-3xl border-emerald-500/20">
              <h4 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <Target size={16} /> Objetivo do Macro
              </h4>
              <p className="text-white font-bold text-lg leading-tight mb-2">{PERIODIZATION_DATA[activeMacro].name}</p>
              <p className="text-slate-400 text-sm italic">"{PERIODIZATION_DATA[activeMacro].objective}"</p>
              <div className="mt-6 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center text-emerald-400 font-black text-xs uppercase">
                 {PERIODIZATION_DATA[activeMacro].period}
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
           <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-2 flex items-center gap-2">
             <Clock size={14} /> Estrutura de Micro-Ciclos (Exemplos)
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERIODIZATION_DATA[activeMacro].microcycles.map((micro, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all group">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Semana {micro.week}</span>
                      <TrendingUp size={14} className="text-slate-600" />
                   </div>
                   <h5 className="text-white font-black uppercase text-sm mb-3 group-hover:text-blue-400 transition-colors">{micro.focus}</h5>
                   <div className="flex gap-4">
                      <div className="flex-1">
                         <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Volume</span>
                         <span className="text-xs font-bold text-slate-300">{micro.volume}</span>
                      </div>
                      <div className="flex-1">
                         <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Intensidade</span>
                         <span className="text-xs font-bold text-blue-400">{micro.intensity}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualPeriodization;
