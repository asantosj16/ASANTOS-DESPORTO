
import React, { useState } from 'react';
import { Activity, Timer, Dumbbell, Ruler, Zap, Heart } from 'lucide-react';

const TestesAptidaoFisica: React.FC = () => {
  const [data, setData] = useState({
    vo2max: 45,
    benchPress: 60,
    squat: 80,
    pushups: 30,
    situps: 40,
    flexibility: 25,
    agility: 12.5
  });

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-md">
            <Activity size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Testes de Aptidão Física</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Avaliação de Performance e Capacidades Físicas</p>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* VO2 Max */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
             <Heart size={16} className="text-red-500" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Cardio (VO2 Max)</span>
          </div>
          <div className="relative">
             <input 
               type="number" 
               value={data.vo2max} 
               onChange={(e) => setData({...data, vo2max: Number(e.target.value)})}
               className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white font-black"
             />
             <span className="absolute right-3 top-3 text-[10px] font-black text-slate-400">ml/kg/min</span>
          </div>
        </div>

        {/* Força */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-2 mb-3">
             <Dumbbell size={16} className="text-slate-700 dark:text-slate-300" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Força (1RM)</span>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
                <input 
                  type="number" 
                  value={data.benchPress} 
                  onChange={(e) => setData({...data, benchPress: Number(e.target.value)})}
                  className="w-1/2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-xs font-black"
                  placeholder="Supino"
                />
                <input 
                  type="number" 
                  value={data.squat} 
                  onChange={(e) => setData({...data, squat: Number(e.target.value)})}
                  className="w-1/2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-xs font-black"
                  placeholder="Agach."
                />
            </div>
          </div>
        </div>

        {/* Resistência */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-2 mb-3">
             <Zap size={16} className="text-yellow-500" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Resistência (Reps)</span>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
                <input 
                  type="number" 
                  value={data.pushups} 
                  onChange={(e) => setData({...data, pushups: Number(e.target.value)})}
                  className="w-1/2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-xs font-black"
                  title="Flexões"
                />
                <input 
                  type="number" 
                  value={data.situps} 
                  onChange={(e) => setData({...data, situps: Number(e.target.value)})}
                  className="w-1/2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-xs font-black"
                  title="Abdominais"
                />
            </div>
          </div>
        </div>

        {/* Flexibilidade */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
             <Ruler size={16} className="text-blue-500" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Flexibilidade</span>
          </div>
          <div className="relative">
             <input 
               type="number" 
               value={data.flexibility} 
               onChange={(e) => setData({...data, flexibility: Number(e.target.value)})}
               className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white font-black"
             />
             <span className="absolute right-3 top-3 text-[10px] font-black text-slate-400">cm</span>
          </div>
        </div>

        {/* Agilidade */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
             <Timer size={16} className="text-green-500" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Agilidade</span>
          </div>
          <div className="relative">
             <input 
               type="number" 
               value={data.agility} 
               onChange={(e) => setData({...data, agility: Number(e.target.value)})}
               className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white font-black"
             />
             <span className="absolute right-3 top-3 text-[10px] font-black text-slate-400">s</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestesAptidaoFisica;
