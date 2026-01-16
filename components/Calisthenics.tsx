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
    title: "Domínio Básico (Empurrar & Puxar)",
    category: "Fundamentos",
    level: "Iniciante",
    duration: "45 min",
    focus: "Construção de força base e consciência corporal.",
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=calistenia+treino+iniciante+push+pull",
    exercises: [
      "4x 8-12 Flexões (Push-ups) - Foco na escápula",
      "4x 5-8 Remadas na Barra (Australian Pull-ups)",
      "3x 10-15 Mergulhos no Banco (Dips)",
      "3x 12-15 Agachamentos (Squats)",
      "3x 30s Prancha Abdominal (Hollow Body)"
    ]
  },
  {
    title: "O Caminho do Muscle-Up",
    category: "Skills",
    level: "Avançado",
    duration: "60 min",
    focus: "Explosividade, técnica de transição e força de tração.",
    imageUrl: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=como+fazer+muscle+up+tutorial",
    exercises: [
      "5x 3-5 Puxadas Explosivas ao Peito (High Pull-ups)",
      "4x 5 Mergulhos na Barra Reta (Straight Bar Dips)",
      "4x 5 Muscle-ups Negativos (Descida controlada)",
      "3x 10 Mergulhos em Paralelas (Russian Dips)",
      "3x 10 Elevação de Pernas na Barra (Leg Raises)"
    ]
  },
  {
    title: "Resistência Espartana",
    category: "Resistência",
    level: "Intermédio",
    duration: "30 min",
    focus: "Volume alto e condicionamento metabólico.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=treino+calistenia+resistencia+metabolico",
    exercises: [
      "EMOM 20' (A cada minuto, no minuto):",
      "Min 1: 5 Pull-ups + 10 Flexões",
      "Min 2: 15 Agachamentos + 5 Burpees",
      "Min 3: 30s Escalador (Mountain Climbers)",
      "Min 4: Descanso Total",
      "Repetir o ciclo 5 vezes sem parar."
    ]
  },
  {
    title: "Progressão Front Lever",
    category: "Skills",
    level: "Avançado",
    duration: "50 min",
    focus: "Força estática (isometria) de dorsais e core.",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=front+lever+progression+tutorial",
    exercises: [
      "4x MAX Segurar Tuck Front Lever",
      "3x 5-8 Ice Cream Makers (Transição)",
      "3x 10 Dragon Flags (Foco na descida)",
      "4x 8 Retrações Escapulares na Barra",
      "3x 45s L-Sit (Sustentação em L)"
    ]
  },
  {
    title: "Pernas de Aço (Sem Peso)",
    category: "Fundamentos",
    level: "Intermédio",
    duration: "40 min",
    focus: "Hipertrofia e força unilateral de membros inferiores.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=treino+pernas+calistenia+avancado",
    exercises: [
      "4x 12 Agachamento Pistol Assistido (cada perna)",
      "4x 20 Afundos com Salto (Plyo Lunges)",
      "3x 15 Agachamento Búlgaro (Pé no banco)",
      "3x 30 Elevação de Panturrilha Unilateral",
      "3x 1min Cadeira Isométrica (Wall Sit)"
    ]
  },
  {
    title: "Pirâmide da Morte",
    category: "Resistência",
    level: "Avançado",
    duration: "Tempo Livre",
    focus: "Resistência muscular localizada até a falha.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/results?search_query=calisthenics+pyramid+workout",
    exercises: [
      "Executar Pull-ups / Dips / Squats",
      "Repetições: 1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1",
      "Ex: 1 Barra, 1 Paralela, 1 Agachamento...",
      "Descanso mínimo. Objetivo: Menor tempo total."
    ]
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
          <div className="bg-purple-600 p-2 rounded-xl text-white shadow-lg animate-pulse">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Calistenia & Bodyweight</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Domínio Corporal e Força Relativa</p>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl overflow-x-auto no-scrollbar shadow-inner">
          {(['Todas', 'Fundamentos', 'Skills', 'Resistência'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                activeCategory === cat 
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md transform scale-105' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, idx) => (
            <div key={idx} className="group relative bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-purple-200 dark:hover:border-purple-800 transition-all hover:shadow-xl flex flex-col overflow-hidden">
              
              {/* Imagem de Capa */}
              <div className="h-48 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                <img 
                  src={workout.imageUrl} 
                  alt={workout.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex justify-between items-end">
                     <div>
                        <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block shadow-sm ${
                          workout.category === 'Skills' ? 'bg-indigo-500 text-white' :
                          workout.category === 'Resistência' ? 'bg-orange-500 text-white' :
                          'bg-emerald-500 text-white'
                        }`}>
                          {workout.category}
                        </span>
                        <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-tight shadow-black drop-shadow-md">
                          {workout.title}
                        </h4>
                     </div>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-2">
                      <BarChart2 size={14} className={
                          workout.level === 'Iniciante' ? 'text-emerald-500' : 
                          workout.level === 'Intermédio' ? 'text-yellow-500' : 'text-red-500'
                      } />
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">{workout.level}</span>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                      <Timer size={14} /> {workout.duration}
                   </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 italic">
                  "{workout.focus}"
                </p>

                <div className="space-y-2 flex-grow mb-6">
                  {workout.exercises.map((exercise, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-purple-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight">{exercise}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a 
                    href={workout.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all shadow-sm"
                  >
                    <PlayCircle size={14} /> Ver Guia em Vídeo <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-8 pb-8">
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800 flex items-center gap-4">
          <Trophy className="text-purple-500" size={24} />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            <strong>FILOSOFIA STREET WORKOUT:</strong> A qualidade do movimento supera a quantidade. Mantenha a tensão corporal (Hollow Body) em todos os exercícios e respeite as progressões.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calisthenics;