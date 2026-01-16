
import React, { useState } from 'react';
import { Apple, Scale, Activity, Flame } from 'lucide-react';

const NutriçãoDesportiva: React.FC = () => {
  const [weight, setWeight] = useState(80);
  const [goal, setGoal] = useState<'perda' | 'manutencao' | 'ganho'>('manutencao');

  const calcMacros = () => {
    const protein = weight * (goal === 'ganho' ? 2.2 : goal === 'perda' ? 2.4 : 2);
    const fats = weight * 0.8;
    const carbs = weight * (goal === 'ganho' ? 5 : goal === 'perda' ? 2.5 : 4);
    
    return {
      protein: Math.round(protein),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
      kcals: Math.round((protein * 4) + (carbs * 4) + (fats * 9))
    };
  };

  const macros = calcMacros();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 glass-card p-10 rounded-[2.5rem]">
        <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
          <Scale className="text-green-500" />
          Perfil Nutricional
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Peso Atual (kg)</label>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Objetivo</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white font-bold appearance-none"
            >
              <option value="perda">Perda de Gordura (Cutting)</option>
              <option value="manutencao">Manutenção (Performance)</option>
              <option value="ganho">Ganho de Massa (Bulking)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] border-green-500/10">
        <div className="flex items-center justify-between mb-12">
           <h4 className="text-green-500 font-black uppercase text-xs tracking-widest">Estimativa Diária Recomenda</h4>
           <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              <Flame size={14} className="text-green-500" />
              <span className="text-white font-black text-sm">{macros.kcals} kcal</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Proteínas', value: macros.protein, color: 'bg-red-500' },
             { label: 'Carboidratos', value: macros.carbs, color: 'bg-yellow-500' },
             { label: 'Gorduras', value: macros.fats, color: 'bg-blue-500' }
           ].map((macro, i) => (
             <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden group">
                <div className={`absolute bottom-0 left-0 w-full h-1 ${macro.color} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{macro.label}</p>
                <h5 className="text-4xl font-black text-white italic tracking-tighter">{macro.value}g</h5>
             </div>
           ))}
        </div>

        <div className="mt-12 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
           <p className="text-[11px] text-slate-400 italic leading-relaxed text-center">
             *Valores estimados baseados em diretrizes gerais da Nutrição Desportiva. 
             A consulta com um nutricionista é indispensável para planos personalizados.
           </p>
        </div>
      </div>
    </div>
  );
};

export default NutriçãoDesportiva;
