
import React, { useState } from 'react';
import { Activity, Zap, PlayCircle, Trophy, BarChart2, Timer, CheckCircle2, ExternalLink, Dumbbell } from 'lucide-react';

type CalisthenicsCategory = 'Fundamentos' | 'Skills' | 'Resistência';

interface CalisthenicsWorkout {
  title: string;
  category: CalisthenicsCategory;
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  duration: string;
  focus: string;
  exercises: string[];
  imageUrl: string;
  videoUrl: string;
}

const WORKOUTS: CalisthenicsWorkout[] = [
  {
    title: "Domínio Básico",
    category: "Fundamentos",
    level: "Iniciante",
    duration: "45 min",
    focus: "Construção de força base.",
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=calistenia+treino+iniciante",
    exercises: ["4x 12 Flexões", "4x 8 Remadas", "3x 15 Mergulhos", "3x 30s Prancha"]
  },
  {
    title: "O Caminho do Muscle-Up",
    category: "Skills",
    level: "Avançado",
    duration: "60 min",
    focus: "Explosividade e técnica.",
    imageUrl: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=muscle+up+tutorial",
    exercises: ["5x 5 Puxadas Explosivas", "4x 5 Mergulhos Barra", "3x 5 Muscle-ups Negativos"]
  },
  {
    title: "Resistência Espartana",
    category: "Resistência",
    level: "Intermédio",
    duration: "30 min",
    focus: "Condicionamento metabólico.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=treino+calistenia+resistencia",
    exercises: ["EMOM 20'", "5 Pull-ups + 10 Flexões", "15 Agachamentos", "30s Escalador"]
  }
];

const Calisthenics: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CalisthenicsCategory | 'Todas'>('Todas');

  const filteredWorkouts = activeCategory === 'Todas' 
    ? WORKOUTS 
    : WORKOUTS.filter(w => w.category === activeCategory);

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-purple-50/30 dark:bg-purple-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-xl text-white shadow-lg">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Calistenia</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Domínio Corporal</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, idx) => (
            <div key={idx} className="group relative bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-purple-200 dark:hover:border-purple-800 transition-all hover:shadow-xl flex flex-col overflow-hidden">
              <div className="h-48 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                <img 
                  src={workout.imageUrl} 
                  alt={workout.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter drop-shadow-md">
                    {workout.title}
                  </h4>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                   <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">{workout.level}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{workout.duration}</span>
                </div>
                <div className="mt-auto">
                  <a 
                    href={workout.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                  >
                    <PlayCircle size={14} /> Guia Técnico
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exemplo de Sessão de Treino */}
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <Dumbbell size={20} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Exemplo de Sessão de Treino - Calistenia</h4>
          </div>

          <div className="space-y-6">
            {/* Aquecimento */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="text-blue-500" size={18} />
                <h5 className="font-bold text-slate-900 dark:text-white">1. Aquecimento (10 minutos)</h5>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Rotações articulares: pescoço, ombros, cotovelos, punhos, ancas, joelhos (3 min)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>10 flexões inclinadas + 10 agachamentos + 10 prancha a pé (2 rounds)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Alongamentos dinâmicos: balanços de pernas, círculos de braços (3 min)</span>
                </li>
              </ul>
            </div>

            {/* Parte Principal */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-purple-600" size={18} />
                <h5 className="font-bold text-slate-900 dark:text-white">2. Parte Principal - Treino Full Body (40 minutos)</h5>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                  <div className="font-bold text-purple-600 mb-3">Bloco A - Empurrar (Push)</div>
                  <div className="space-y-3">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Flexões (Push-ups)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>Série 1: Máximo de repetições</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>Série 2: 80% do máximo</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>Série 3: 60% do máximo</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 90s entre séries</div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Flexões em Pica (Pike Push-ups)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>4 séries x 8-12 repetições</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 60s | Foco: ombros</div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Fundos em Paralelas (Dips)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>3 séries x 10-15 repetições</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 90s | Foco: tríceps e peitoral</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                  <div className="font-bold text-purple-600 mb-3">Bloco B - Puxar (Pull)</div>
                  <div className="space-y-3">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Pull-ups (Barra Fixa)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>5 séries x 5-8 repetições (ou negativos se necessário)</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 2 min | Foco: dorsais</div>
                    </div>

                    <div className="border-l-4 border-indigo-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Remada Australiana (Australian Pull-ups)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>4 séries x 12-15 repetições</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 60s | Foco: dorsais médios</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                  <div className="font-bold text-purple-600 mb-3">Bloco C - Pernas</div>
                  <div className="space-y-3">
                    <div className="border-l-4 border-pink-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Agachamentos (Pistol Squat Progressão)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>4 séries x 8-10 reps cada perna (ou box pistol)</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 90s</div>
                    </div>

                    <div className="border-l-4 border-pink-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Nordic Curls (Isquiotibiais)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>3 séries x 5-8 repetições (ou negativos)</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 2 min</div>
                    </div>

                    <div className="border-l-4 border-pink-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Elevação de Gémeos</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>4 séries x 20 repetições</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 45s</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/40 rounded-xl p-4">
                  <div className="font-bold text-purple-600 mb-3">Bloco D - Core</div>
                  <div className="space-y-3">
                    <div className="border-l-4 border-teal-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Prancha Isométrica</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>3 séries x 60 segundos</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 45s</div>
                    </div>

                    <div className="border-l-4 border-teal-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">L-Sit (Progressão)</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>4 séries x máximo tempo (15-30s)</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 60s</div>
                    </div>

                    <div className="border-l-4 border-teal-500 pl-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Hanging Leg Raises</div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={14} />
                          <span>3 séries x 10-15 repetições</span>
                        </li>
                      </ul>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Descanso: 60s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retorno à Calma */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-blue-500" size={18} />
                <h5 className="font-bold text-slate-900 dark:text-white">3. Retorno à Calma (5-10 minutos)</h5>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Alongamentos estáticos: dorsais, peitorais, ombros, pernas (5 min)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Respiração controlada e relaxamento muscular</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Mobilidade de punhos e ombros</span>
                </li>
              </ul>
            </div>

            {/* Notas */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-amber-600">Notas:</span> Ajuste as repetições e progressões conforme seu nível. 
                  Foco na execução perfeita antes de aumentar volume. Frequência recomendada: 3-4x por semana com pelo menos um dia de descanso entre sessões.
                  Duração total: aproximadamente 55-65 minutos.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calisthenics;
