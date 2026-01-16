
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
      </div>
    </div>
  );
};

export default Calisthenics;
