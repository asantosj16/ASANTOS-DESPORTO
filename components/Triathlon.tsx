
import React, { useState } from 'react';
import { Zap, Trophy, Timer, ArrowRight, Bike, Waves, Footprints, Target, Info, Activity } from 'lucide-react';

type SkillLevel = 'Iniciante' | 'Intermédio' | 'Avançado';

interface TrainingPhase {
  phase: string;
  focus: string;
  volume: string;
}

interface TriathlonPlan {
  level: SkillLevel;
  objective: string;
  description: string;
  swim: TrainingPhase;
  bike: TrainingPhase;
  run: TrainingPhase;
  brick: string; // Treino de transição
}

const TRIATHLON_PLANS: TriathlonPlan[] = [
  {
    level: 'Iniciante',
    objective: 'Conclusão de Prova Sprint (750m/20k/5k)',
    description: 'Foco em adaptação ao esforço combinado e segurança técnica em cada modalidade.',
    swim: { phase: 'Base Aeróbica', focus: 'Técnica e Respiração Bilateral', volume: '2x 1500m/semana' },
    bike: { phase: 'Adaptação', focus: 'Cadência (85-90 rpm) e conforto na bike', volume: '2x 20km/semana' },
    run: { phase: 'Base', focus: 'Corrida Contínua em Z2', volume: '2x 5km/semana' },
    brick: '1x Transição curta (15km bike + 2km corrida)'
  },
  {
    level: 'Intermédio',
    objective: 'Performance em Distância Olímpica (1.5k/40k/10k)',
    description: 'Desenvolvimento de limiar anaeróbico e transições rápidas.',
    swim: { phase: 'Construção', focus: 'Intervalados de Limiar', volume: '3x 2500m/semana' },
    bike: { phase: 'Força/Endurance', focus: 'Subidas e Intervalos de Potência', volume: '3x 40km/semana' },
    run: { phase: 'Ritmo de Prova', focus: 'Tempo Runs e Fartleks', volume: '3x 10km/semana' },
    brick: '2x Transição (30km bike + 4km corrida ritmo de prova)'
  },
  {
    level: 'Avançado',
    objective: 'Performance 70.3 / Ironman (Alta Intensidade)',
    description: 'Maximização da eficiência energética e tolerância ao lactato em fadiga extrema.',
    swim: { phase: 'Pico', focus: 'Séries Específicas em Águas Abertas', volume: '4x 3500m/semana' },
    bike: { phase: 'Potência Máxima', focus: 'Intervalos de Alta Intensidade (Z4/Z5)', volume: '4x 80km/semana' },
    run: { phase: 'Volume de Elite', focus: 'Longões e Intervalados de Velocidade', volume: '4x 15km/semana' },
    brick: '2x Brick Longo (60km bike + 12km corrida progressiva)'
  }
];

const Triathlon: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<SkillLevel>('Iniciante');
  const currentPlan = TRIATHLON_PLANS.find(p => p.level === activeLevel)!;

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden animate-fade-in-up shadow-2xl">
      <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-500 p-3 rounded-2xl text-black shadow-xl rotate-3">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Estratégia Triathlon</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Natação • Ciclismo • Corrida</p>
          </div>
        </div>
        
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          {(['Iniciante', 'Intermédio', 'Avançado'] as SkillLevel[]).map((level) => (
            <button 
              key={level} 
              onClick={() => setActiveLevel(level)} 
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeLevel === level ? 'bg-yellow-500 text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Info Geral do Plano */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-950/50 p-8 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Trophy size={48} className="text-yellow-500" />
               </div>
               <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Target size={16} /> Objetivo do Ciclo
               </h4>
               <p className="text-xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">{currentPlan.objective}</p>
               <p className="text-xs text-slate-400 leading-relaxed italic">{currentPlan.description}</p>
            </div>

            <div className="bg-blue-600/10 p-6 rounded-[2rem] border border-blue-500/20">
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Timer size={16} /> Transições (Bricks)
               </h4>
               <p className="text-sm font-bold text-slate-200">{currentPlan.brick}</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <Activity size={18} className="text-slate-600" />
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distribuição por Modalidade</h4>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Swim', icon: Waves, color: 'text-sky-500', data: currentPlan.swim },
                  { label: 'Bike', icon: Bike, color: 'text-emerald-500', data: currentPlan.bike },
                  { label: 'Run', icon: Footprints, color: 'text-orange-500', data: currentPlan.run }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/60 p-6 rounded-[2rem] border border-slate-800 hover:border-yellow-500/20 transition-all flex flex-col group">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 bg-slate-950 rounded-xl ${item.color} group-hover:scale-110 transition-transform shadow-xl`}>
                        <item.icon size={20} />
                      </div>
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Modalidade {i+1}</span>
                    </div>
                    
                    <h5 className="text-sm font-black text-white uppercase mb-2">{item.label}</h5>
                    <div className="space-y-4 flex-grow">
                      <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Período</span>
                        <span className="text-xs font-bold text-slate-300">{item.data.phase}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Foco Técnico</span>
                        <span className="text-[10px] font-bold text-slate-400 leading-tight block">{item.data.focus}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-800">
                        <span className="text-[10px] font-black text-yellow-500">{item.data.volume}</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Dicas Técnicas */}
        <div className="p-6 bg-slate-950/40 rounded-[2rem] border border-slate-800">
           <div className="flex items-center gap-3 mb-4">
              <Info size={16} className="text-blue-500" />
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recomendações de Performance</h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Pratique a transição T1 (água para bike) com o wetsuit.",
                "Treine a nutrição e hidratação especificamente na bike.",
                "Não use material novo no dia da prova (sapatilhas/óculos).",
                "Aumente o volume progressivamente para evitar lesões de stress."
              ].map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full mt-1.5 shrink-0" />
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{tip}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="p-6 bg-yellow-500/5 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6">
         <div className="flex items-center gap-2"><Waves size={12} className="text-sky-500" /><span className="text-[9px] font-black text-slate-600 uppercase">AQUÁTICO</span></div>
         <div className="flex items-center gap-2"><Bike size={12} className="text-emerald-500" /><span className="text-[9px] font-black text-slate-600 uppercase">CICLISMO</span></div>
         <div className="flex items-center gap-2"><Footprints size={12} className="text-orange-500" /><span className="text-[9px] font-black text-slate-600 uppercase">ENDURANCE</span></div>
         <div className="flex items-center gap-2"><Zap size={12} className="text-yellow-500" /><span className="text-[9px] font-black text-slate-600 uppercase">PERFORMANCE HD</span></div>
      </div>
    </div>
  );
};

export default Triathlon;
