import React from 'react';
import { Dumbbell, CheckCircle2, ArrowRight } from 'lucide-react';

const TreinoPorMusculacao: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-slate-900 dark:bg-slate-700 p-2 rounded-xl text-white shadow-md">
            <Dumbbell size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Periodização de Musculação</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Modelo clássico de periodização linear ao longo de 32 semanas.</p>
          </div>
        </div>
      </div>
      
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { phase: "Anatômica", weeks: "1-4", focus: "Adaptação", desc: "Ajuste neural e ligamentar. Cargas baixas, repetições médias/altas.", color: "bg-emerald-500" },
          { phase: "Hipertrofia", weeks: "5-16", focus: "Volume", desc: "Aumento de massa muscular. Cargas moderadas (70-85% 1RM).", color: "bg-blue-500" },
          { phase: "Força Máxima", weeks: "17-24", focus: "Intensidade", desc: "Recrutamento máximo. Cargas altas (>85% 1RM).", color: "bg-red-500" },
          { phase: "Definição", weeks: "25-32", focus: "Qualidade", desc: "Redução de gordura com manutenção de massa magra.", color: "bg-orange-500" }
        ].map((m, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute -inset-0.5 ${m.color} rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300`}></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black px-2 py-1 rounded-md text-white ${m.color}`}>{m.weeks}</span>
                <CheckCircle2 size={16} className="text-slate-300 dark:text-slate-700" />
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{m.phase}</h5>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{m.focus}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">{m.desc}</p>
              <button className="mt-4 flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white hover:translate-x-1 transition-transform">
                VER DETALHES <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-8 pb-8">
         <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl text-xs text-amber-700 dark:text-amber-400 font-medium">
           <strong>Nota Técnica:</strong> Este macrociclo deve ser ajustado conforme o nível do atleta.
         </div>
      </div>
    </div>
  );
};

export default TreinoPorMusculacao;