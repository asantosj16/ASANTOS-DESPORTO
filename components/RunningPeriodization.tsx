import React, { useState } from 'react';
import { Timer, Trophy, TrendingUp, Activity } from 'lucide-react';

interface PeriodizationPhase {
  period: string;
  phase: string;
  objective: string;
  zones: string;
  intensity: string;
}

interface RacePlan {
  id: string;
  distance: string;
  description: string;
  phases: PeriodizationPhase[];
}

const RACE_PLANS: RacePlan[] = [
  {
    id: '5k',
    distance: 'Corrida de 5 Km',
    description: 'Foco em desenvolvimento de velocidade e base aeróbica inicial.',
    phases: [
      { period: 'Semanas 1-4', phase: 'Base Aeróbica', objective: 'Aumento gradual de volume', zones: 'Z1 - Z2', intensity: 'Baixa' },
      { period: 'Semanas 5-8', phase: 'Construção', objective: 'Desenvolvimento de limiar', zones: 'Z3', intensity: 'Média' },
      { period: 'Semanas 9-10', phase: 'Pico/Velocidade', objective: 'Intervalados e ritmo de prova', zones: 'Z4 - Z5', intensity: 'Alta' },
      { period: 'Semana 11', phase: 'Polimento', objective: 'Recuperação ativa', zones: 'Z1 - Z2', intensity: 'Moderada' },
      { period: 'Semana 12', phase: 'Competição', objective: 'Dia da Prova', zones: 'Z5', intensity: 'Máxima' },
    ]
  },
  {
    id: '10k',
    distance: 'Corrida de 10 Km',
    description: 'Equilíbrio entre resistência aeróbica e tolerância ao lactato.',
    phases: [
      { period: 'Semanas 1-6', phase: 'Base Sólida', objective: 'Capacidade aeróbica', zones: 'Z2', intensity: 'Baixa' },
      { period: 'Semanas 7-12', phase: 'Força/Ritmo', objective: 'Resistência de ritmo', zones: 'Z3 - Z4', intensity: 'Média/Alta' },
      { period: 'Semanas 13-14', phase: 'Específico', objective: 'Simulados de prova', zones: 'Z4 - Z5', intensity: 'Alta' },
      { period: 'Semana 15', phase: 'Polimento', objective: 'Redução de volume', zones: 'Z1 - Z2', intensity: 'Moderada' },
      { period: 'Semana 16', phase: 'Competição', objective: 'Dia da Prova', zones: 'Z5', intensity: 'Máxima' },
    ]
  },
  {
    id: '21k',
    distance: 'Meia Maratona (21k)',
    description: 'Foco em resistência muscular e eficiência energética de longo prazo.',
    phases: [
      { period: 'Semanas 1-8', phase: 'Fundação', objective: 'Volume progressivo', zones: 'Z2', intensity: 'Baixa' },
      { period: 'Semanas 9-14', phase: 'Resistência', objective: 'Longões e Tempo Run', zones: 'Z3', intensity: 'Média' },
      { period: 'Semanas 15-18', phase: 'Pré-Prova', objective: 'Manutenção e Especificidade', zones: 'Z4', intensity: 'Alta' },
      { period: 'Semana 19', phase: 'Tapering', objective: 'Supercompensação', zones: 'Z1 - Z2', intensity: 'Baixa' },
      { period: 'Semana 20', phase: 'Competição', objective: 'Dia da Prova', zones: 'Z4 - Z5', intensity: 'Máxima' },
    ]
  },
  {
    id: '42k',
    distance: 'Maratona (42k)',
    description: 'Periodização avançada com foco em volume extremo e metabolismo de gorduras.',
    phases: [
      { period: 'Semanas 1-10', phase: 'Base Geral', objective: 'Adaptação estrutural', zones: 'Z1 - Z2', intensity: 'Baixa' },
      { period: 'Semanas 11-18', phase: 'Volume Máximo', objective: 'Resistência extrema', zones: 'Z2', intensity: 'Baixa/Média' },
      { period: 'Semanas 19-21', phase: 'Específico/Pace', objective: 'Ritmo de maratona', zones: 'Z3', intensity: 'Média/Alta' },
      { period: 'Semanas 22-23', phase: 'Polimento', objective: 'Recuperação sistêmica', zones: 'Z1 - Z2', intensity: 'Baixa' },
      { period: 'Semana 24', phase: 'Competição', objective: 'Dia da Prova', zones: 'Z3 - Z4', intensity: 'Máxima' },
    ]
  }
];

const RunningPeriodization: React.FC = () => {
  const [activeTab, setActiveTab] = useState(RACE_PLANS[0].id);
  const currentPlan = RACE_PLANS.find(p => p.id === activeTab) || RACE_PLANS[0];

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl text-white shadow-md">
            <Timer size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Periodização de Corrida</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planos Anuais por Distância</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl overflow-x-auto no-scrollbar shadow-inner">
          {RACE_PLANS.map(plan => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                activeTab === plan.id 
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-md' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {plan.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8 p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-3xl border border-blue-100/50 dark:border-blue-800/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-2xl text-white">
              <Trophy size={20} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{currentPlan.distance}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{currentPlan.description}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Período</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fase</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objetivo Principal</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Zonas</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Intensidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentPlan.phases.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{p.period}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${idx === currentPlan.phases.length - 1 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{p.phase}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{p.objective}</td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase tracking-widest">
                      {p.zones}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                     <div className="flex flex-col items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${
                          p.intensity === 'Máxima' ? 'text-red-500' : 
                          p.intensity === 'Alta' ? 'text-orange-500' : 
                          'text-emerald-500'
                        }`}>
                          {p.intensity}
                        </span>
                        <div className="w-16 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              p.intensity === 'Máxima' ? 'bg-red-500 w-full' : 
                              p.intensity === 'Alta' ? 'bg-orange-500 w-3/4' : 
                              p.intensity === 'Média' ? 'bg-yellow-500 w-1/2' :
                              p.intensity === 'Moderada' ? 'bg-blue-500 w-1/3' :
                              'bg-emerald-500 w-1/4'
                            }`}
                          />
                        </div>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <TrendingUp size={14} className="text-orange-500" /> Progressão de Carga
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <Activity size={14} className="text-blue-500" /> Controle Metabólico
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <Timer size={14} className="text-emerald-500" /> Gestão de Pace
          </div>
      </div>
    </div>
  );
};

export default RunningPeriodization;