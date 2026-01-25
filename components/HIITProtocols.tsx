
import React from 'react';
import { Flame, Timer, Zap, Target, Info, PlayCircle, ExternalLink, Activity } from 'lucide-react';

interface Protocol {
  name: string;
  formula: string;
  duration: string;
  intensity: 'Alta' | 'Extrema' | 'Moderada';
  description: string;
  drills: string[];
  imageUrl: string;
  videoUrl: string;
}

const PROTOCOLS: Protocol[] = [
  {
    name: "Tabata Original",
    formula: "20s Esforço / 10s Descanso",
    duration: "4 Minutos (8 Ciclos)",
    intensity: "Extrema",
    description: "O protocolo padrão-ouro para aumento de VO2 Max e queima calórica pós-treino (efeito EPOC).",
    drills: ["Burpees", "Agachamentos (Air Squats)", "Escalador (Mountain Climbers)", "Sprints"],
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "EMOM (Every Minute on the Minute)",
    formula: "Tarefa X dentro de 60s",
    duration: "10 a 20 Minutos",
    intensity: "Moderada",
    description: "Excelente para acumular volume de treino e manter a técnica sob fadiga controlada.",
    drills: ["Kettlebell Swings", "Saltos na Caixa (Box Jumps)", "Flexões", "Barra Fixa"],
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "AMRAP",
    formula: "Máximo de voltas no tempo fixo",
    duration: "15 a 20 Minutos",
    intensity: "Alta",
    description: "Foco em resistência muscular localizada e resiliência mental.",
    drills: ["Thrusters", "Abdominal Infra", "Corda Dupla", "Wall Balls"],
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Chipper",
    formula: "Lista única de tarefas",
    duration: "Até completar (For Time)",
    intensity: "Alta",
    description: "Uma grande lista de exercícios para serem 'triturados' em sequência.",
    drills: ["100 Cordas", "80 Agachamentos", "60 Flexões", "40 Abdominais", "20 Burpees"],
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

const HIITProtocols: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-orange-50/30 dark:bg-orange-900/10">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg animate-pulse">
            <Flame size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Protocolos HIIT</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alta Intensidade Intermitente</p>
          </div>
        </div>
        <Zap className="text-yellow-500" size={20} />
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROTOCOLS.map((p, idx) => (
          <div key={idx} className="group relative bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="h-40 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
               <img 
                 src={p.imageUrl} 
                 alt={p.name} 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute top-4 right-4 z-20">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm ${
                    p.intensity === 'Extrema' ? 'bg-red-500 text-white' : 
                    p.intensity === 'Alta' ? 'bg-orange-500 text-white' : 
                    'bg-blue-500 text-white'
                  }`}>
                    {p.intensity}
                  </span>
               </div>
               <div className="absolute bottom-3 left-4 z-20">
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter drop-shadow-md">{p.name}</h4>
               </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Fórmula</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.formula}</span>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Duração</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.duration}</span>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href={p.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                >
                  <PlayCircle size={14} /> Ver Aula <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exemplo de Sessão de Treino */}
      <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-600 p-2 rounded-xl text-white">
            <Activity size={20} />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Exemplo de Sessão de Treino HIIT</h4>
        </div>

        <div className="space-y-6">
          {/* Aquecimento */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Timer className="text-blue-500" size={18} />
              <h5 className="font-bold text-slate-900 dark:text-white">1. Aquecimento (8-10 minutos)</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>3 minutos de cardio leve (corrida, bicicleta ou remo)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Mobilidade articular: ombros, ancas, joelhos (2 min)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>10 agachamentos + 10 flexões + 10 escaladores</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Alongamentos dinâmicos (2 min)</span>
              </li>
            </ul>
          </div>

          {/* Parte Principal */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-orange-600" size={18} />
              <h5 className="font-bold text-slate-900 dark:text-white">2. Parte Principal - Protocolo Tabata Modificado (20 minutos)</h5>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                <div className="font-bold text-orange-600 mb-2">Bloco 1 - Tabata (4 min)</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mb-2 italic">20s trabalho / 10s descanso x 8 rounds</div>
                <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={14} />
                    <span><strong>Burpees</strong> - 4 rounds</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={14} />
                    <span><strong>Mountain Climbers</strong> - 4 rounds</span>
                  </li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Descanso: 2 minutos</div>
              </div>

              <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                <div className="font-bold text-orange-600 mb-2">Bloco 2 - EMOM (10 min)</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mb-2 italic">A cada minuto, realizar:</div>
                <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">Min 1:</span>
                    <span>15 Kettlebell Swings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">Min 2:</span>
                    <span>12 Box Jumps</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">Min 3:</span>
                    <span>10 Thrusters</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">Min 4:</span>
                    <span>20 Jumping Jacks</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">Min 5:</span>
                    <span>30s Sprint no lugar</span>
                  </li>
                </ul>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Repetir o ciclo 2x (total 10 min)</div>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Descanso: 2 minutos</div>
              </div>

              <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                <div className="font-bold text-orange-600 mb-2">Bloco 3 - Finisher (2 min)</div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mb-2 italic">AMRAP (máximo de voltas em 2 minutos)</div>
                <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <Zap className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                    <span>5 Burpees</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                    <span>10 Flexões</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                    <span>15 Agachamentos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Retorno à Calma */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-blue-500" size={18} />
              <h5 className="font-bold text-slate-900 dark:text-white">3. Retorno à Calma (5-7 minutos)</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Caminhada leve: 2-3 minutos</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Alongamentos estáticos dos principais grupos musculares</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Respiração profunda e controlo da frequência cardíaca</span>
              </li>
            </ul>
          </div>

          {/* Notas Importantes */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <div className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-600">Notas:</span> Ajuste a intensidade conforme o nível de condicionamento. 
                Mantenha hidratação adequada. Duração total da sessão: aproximadamente 35-40 minutos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIITProtocols;
