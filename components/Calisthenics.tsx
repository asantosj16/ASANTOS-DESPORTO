
import React, { useState } from 'react';
import { Activity, Zap, PlayCircle, Trophy, BarChart2, Timer, CheckCircle2, ExternalLink, Dumbbell, Info } from 'lucide-react';

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

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
              <thead className="text-xs uppercase bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Fase do Treino</th>
                  <th scope="col" className="px-6 py-3">Bloco / Exercício</th>
                  <th scope="col" className="px-6 py-3">Séries / Reps / Tempo</th>
                  <th scope="col" className="px-6 py-3">Detalhes / Foco</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Aquecimento */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">1. Aquecimento</td>
                  <td className="px-6 py-4">Rotações articulares<br/>Flexões inclinadas + Agachamentos<br/>Alongamentos dinâmicos</td>
                  <td className="px-6 py-4">10 min</td>
                  <td className="px-6 py-4">Preparação articular (Pescoço, ombros, punhos)</td>
                </tr>

                 {/* 2. Parte Principal - A. Push */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white" rowSpan={3}>2. Parte Principal<br/><span className="text-purple-500">Bloco A - Empurrar</span></td>
                    <td className="px-6 py-4">Flexões (Push-ups)</td>
                    <td className="px-6 py-4">3 séries (Max, 80%, 60%)</td>
                    <td className="px-6 py-4">Descanso: 90s</td>
                </tr>
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Pike Push-ups</td>
                    <td className="px-6 py-4">4 séries x 8-12 reps</td>
                    <td className="px-6 py-4">Foco: Ombros</td>
                </tr>
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Fundos (Dips)</td>
                    <td className="px-6 py-4">3 séries x 10-15 reps</td>
                    <td className="px-6 py-4">Foco: Tríceps e peitoral</td>
                </tr>

                 {/* 2. Parte Principal - B. Pull */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white" rowSpan={2}>2. Parte Principal<br/><span className="text-indigo-500">Bloco B - Puxar</span></td>
                    <td className="px-6 py-4">Pull-ups (Barra fixa)</td>
                    <td className="px-6 py-4">5 séries x 5-8 reps</td>
                    <td className="px-6 py-4">Descanso: 2 min</td>
                </tr>
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Australian Pull-ups</td>
                    <td className="px-6 py-4">4 séries x 12-15 reps</td>
                    <td className="px-6 py-4">Foco: Dorsais médios</td>
                </tr>

                {/* 2. Parte Principal - C. Legs */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white" rowSpan={3}>2. Parte Principal<br/><span className="text-pink-500">Bloco C - Pernas</span></td>
                    <td className="px-6 py-4">Pistol Squats (ou progressão)</td>
                    <td className="px-6 py-4">4 séries x 8-10 reps/perna</td>
                    <td className="px-6 py-4">Descanso: 90s</td>
                </tr>
                 <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Nordic Curls</td>
                    <td className="px-6 py-4">3 séries x 5-8 reps</td>
                    <td className="px-6 py-4">Isquiotibiais</td>
                </tr>
                 <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Elevação de Gémeos</td>
                    <td className="px-6 py-4">4 séries x 20 reps</td>
                    <td className="px-6 py-4">Descanso: 45s</td>
                </tr>

                 {/* 2. Parte Principal - D. Core */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white" rowSpan={3}>2. Parte Principal<br/><span className="text-teal-500">Bloco D - Core</span></td>
                    <td className="px-6 py-4">Prancha Isométrica</td>
                    <td className="px-6 py-4">3 séries x 60s</td>
                    <td className="px-6 py-4">Estabilidade</td>
                </tr>
                 <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">L-Sit (Progressão)</td>
                    <td className="px-6 py-4">4 séries x Max (15-30s)</td>
                    <td className="px-6 py-4">Força abdominal</td>
                </tr>
                 <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4">Hanging Leg Raises</td>
                    <td className="px-6 py-4">3 séries x 10-15 reps</td>
                    <td className="px-6 py-4">Abdominal infra</td>
                </tr>

                {/* New Section: Skill Work */}
                 <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">3. Skill Work (Extra)</td>
                    <td className="px-6 py-4">Handstand (Parada de mão)<br/>Muscle-up Transitions</td>
                    <td className="px-6 py-4">10-15 min</td>
                    <td className="px-6 py-4">Prática de técnica (não fadiga)</td>
                </tr>

                 {/* New Section: Flexibilidade */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">4. Flexibilidade</td>
                    <td className="px-6 py-4">Ponte (Bridge)<br/>Pancake stretch<br/>Front splits progression</td>
                    <td className="px-6 py-4">10-15 min</td>
                    <td className="px-6 py-4">Manter posições por 30-60s</td>
                </tr>

                {/* Retorno à Calma */}
                <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">5. Retorno à Calma</td>
                  <td className="px-6 py-4">Alongamentos estáticos (Dorsais, peitorais)<br/>Respiração controlada<br/>Mobilidade de punhos</td>
                  <td className="px-6 py-4">5-10 min</td>
                  <td className="px-6 py-4">Relaxamento Muscular</td>
                </tr>
              </tbody>
            </table>
            
             {/* Notas */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-t border-slate-200 dark:border-slate-700 p-4">
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
