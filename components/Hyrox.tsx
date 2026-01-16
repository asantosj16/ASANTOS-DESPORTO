
import React, { useState } from 'react';
import { Trophy, Timer, Target, ArrowRight, Filter, Footprints } from 'lucide-react';

type WorkoutType = 'Todos' | 'Engine' | 'Força' | 'Simulação' | 'Mista';

interface HyroxWorkout {
  title: string;
  type: WorkoutType;
  level: string;
  duration: string;
  structure: string[];
}

const WORKOUTS: HyroxWorkout[] = [
  {
    title: "Motor Diesel (Engine)",
    type: "Engine",
    level: "Todos",
    duration: "40 min",
    structure: ["EMOM 40':", "Min 1: 15 Cal SkiErg", "Min 2: 15 Burpees", "Min 3: 15 Cal Remo", "Min 4: 200m Corrida", "Min 5: Descanso"]
  },
  {
    title: "Circuito Roxzone Misto",
    type: "Mista",
    level: "Avançado",
    duration: "60 min",
    structure: [
      "800m Corrida (Z3)",
      "25m Sled Push + 25m Sled Pull",
      "800m Corrida (Z3)",
      "80m Burpee Broad Jumps",
      "800m Corrida (Z4)",
      "100 Wall Balls (unbroken)"
    ]
  },
  {
    title: "Power & Pace",
    type: "Mista",
    level: "Intermédio",
    duration: "45 min",
    structure: [
      "Intervalados de 400m Corrida x 4",
      "Entre cada série: 100m Sandbag Lunges",
      "Finalizar com: 200m Farmers Carry (pesado)"
    ]
  }
];

const Hyrox: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkoutType>('Todos');
  const filteredWorkouts = activeCategory === 'Todos' ? WORKOUTS : WORKOUTS.filter(w => w.type === activeCategory);

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-yellow-400/20 dark:bg-yellow-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 p-2 rounded-xl text-black shadow-lg"><Trophy size={22} /></div>
          <div><h3 className="text-xl font-black text-white uppercase tracking-tighter">Planos HYROX</h3><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Treino Híbrido Misto</p></div>
        </div>
        <div className="flex bg-slate-900/50 p-1 rounded-xl overflow-x-auto no-scrollbar">
          {['Todos', 'Engine', 'Força', 'Simulação', 'Mista'].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat as WorkoutType)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeCategory === cat ? 'bg-yellow-500 text-black shadow-md' : 'text-slate-500'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-yellow-500/30 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black px-2 py-1 rounded bg-yellow-500 text-black uppercase">{workout.type}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{workout.duration}</span>
              </div>
              <h4 className="text-lg font-black text-white mb-4 uppercase tracking-tighter leading-tight group-hover:text-yellow-500 transition-colors">{workout.title}</h4>
              <div className="space-y-2 mb-6 flex-grow">
                {workout.structure.map((step, sIdx) => (<div key={sIdx} className="flex items-start gap-2 text-xs text-slate-400 font-medium leading-tight"><ArrowRight size={10} className="text-yellow-500 shrink-0 mt-1" />{step}</div>))}
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg text-[9px] font-bold text-slate-400 uppercase tracking-widest"><Footprints size={12}/> Nível: {workout.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hyrox;
