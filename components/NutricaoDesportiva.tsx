
import React, { useState } from 'react';
import { Apple, Scale, Activity, Flame, ChevronRight, Info, CheckCircle2, Ruler, Orbit, PersonStanding } from 'lucide-react';
import Anamnese from './Anamnese';
import Biometry from './Biometry';

const Bioimpedancia: React.FC = () => {
  const [data, setData] = useState({
    bodyFat: 15,
    muscleMass: 60,
    visceralFat: 4,
    boneMass: 3.5,
    water: 60,
    metabolicAge: 25
  });

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-purple-500/20">
      <h4 className="text-white font-black uppercase text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3">
        <Orbit className="text-purple-500" /> Bioimpedância (BIA)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Gordura Corporal (%)', key: 'bodyFat', unit: '%' },
          { label: 'Massa Muscular (kg)', key: 'muscleMass', unit: 'kg' },
          { label: 'Gordura Visceral', key: 'visceralFat', unit: '' },
          { label: 'Massa Óssea (kg)', key: 'boneMass', unit: 'kg' },
          { label: 'Água Corporal (%)', key: 'water', unit: '%' },
          { label: 'Idade Metabólica', key: 'metabolicAge', unit: 'anos' }
        ].map((item) => (
          <div key={item.key} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all">
            <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">{item.label}</label>
            <div className="relative">
              <input
                type="number"
                value={data[item.key as keyof typeof data]}
                onChange={(e) => setData({ ...data, [item.key]: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-purple-500 outline-none"
              />
              <span className="absolute right-4 top-3 text-xs font-black text-slate-600 uppercase">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Antropometria: React.FC = () => {
    const [data, setData] = useState({
        weight: 75,
        height: 175,
        waist: 80,
        hip: 100,
        armRight: 35,
        armLeft: 35,
        thighRight: 55,
        thighLeft: 55,
        triceps: 10,
        subscapular: 12,
        suprailiac: 15,
        abdominal: 20
    });

    return (
        <div className="glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-blue-500/20">
            <h4 className="text-white font-black uppercase text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3">
                <Ruler className="text-blue-500" /> Antropometria
            </h4>
            
            <div className="space-y-6 md:space-y-8">
                {/* Basic Metrics */}
                <div>
                   <h5 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Dados Básicos</h5>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase">Peso (kg)</label>
                            <input type="number" value={data.weight} onChange={(e) => setData({...data, weight: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-blue-500 outline-none"/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase">Altura (cm)</label>
                            <input type="number" value={data.height} onChange={(e) => setData({...data, height: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-blue-500 outline-none"/>
                        </div>
                   </div>
                </div>

                {/* Circumferences */}
                <div>
                    <h5 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Circunferências (cm)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Cintura', key: 'waist' },
                            { label: 'Quadril', key: 'hip' },
                            { label: 'Braço Dir.', key: 'armRight' },
                            { label: 'Braço Esq.', key: 'armLeft' },
                            { label: 'Coxa Dir.', key: 'thighRight' },
                            { label: 'Coxa Esq.', key: 'thighLeft' }
                        ].map((item) => (
                           <div key={item.key} className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase">{item.label}</label>
                                <input type="number" value={data[item.key as keyof typeof data]} onChange={(e) => setData({...data, [item.key]: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-blue-500 outline-none"/>
                           </div> 
                        ))}
                    </div>
                </div>

                {/* Skinfolds */}
                <div>
                    <h5 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Dobras Cutâneas (mm)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         {[
                            { label: 'Tricipital', key: 'triceps' },
                            { label: 'Subescapular', key: 'subscapular' },
                            { label: 'Supra-ilíaca', key: 'suprailiac' },
                            { label: 'Abdominal', key: 'abdominal' }
                        ].map((item) => (
                           <div key={item.key} className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase">{item.label}</label>
                                <input type="number" value={data[item.key as keyof typeof data]} onChange={(e) => setData({...data, [item.key]: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-blue-500 outline-none"/>
                           </div> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const FoodPyramid: React.FC = () => {
  const levels = [
    { name: "Base: Hidratação & Vegetais", items: ["Água (2.5L+)", "Legumes", "Frutas"], benefit: "Micronutrientes, fibras e balanço hídrico.", color: "bg-emerald-500" },
    { name: "Nível 2: Energia & Hidratos", items: ["Arroz Integral", "Batata-doce", "Aveia"], benefit: "Glicogénio muscular e energia sustentada.", color: "bg-yellow-500" },
    { name: "Nível 3: Estrutura & Proteína", items: ["Ovos", "Peixe", "Frango", "Leguminosas"], benefit: "Recuperação e hipertrofia muscular.", color: "bg-blue-500" },
    { name: "Topo: Gorduras & Suplementos", items: ["Azeite", "Frutos Secos", "Creatina"], benefit: "Hormonal e suporte de performance.", color: "bg-rose-500" }
  ];

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-green-500/20">
       <h4 className="text-white font-black uppercase text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3">
         <Info className="text-green-500" /> Pirâmide Alimentar Desportiva
       </h4>
       <div className="space-y-4">
          {levels.slice().reverse().map((level, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-2xl md:rounded-3xl hover:border-green-500/30 transition-all">
               <div className={`w-12 h-12 ${level.color} rounded-2xl flex items-center justify-center text-white font-black shrink-0`}>
                  {4-i}
               </div>
               <div className="flex-1">
                  <h5 className="text-white font-black uppercase text-sm mb-1">{level.name}</h5>
                  <div className="flex flex-wrap gap-2 mb-2">
                     {level.items.map((item, idx) => (
                       <span key={idx} className="text-[9px] font-black text-slate-500 uppercase">{item}</span>
                     ))}
                  </div>
                  <p className="text-xs text-slate-400 italic">Benefício: {level.benefit}</p>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const NutricaoDesportiva: React.FC = () => {
  const [weight, setWeight] = useState(75);
  const [goal, setGoal] = useState<'perda' | 'manutencao' | 'ganho'>('manutencao');

  const macros = {
    protein: Math.round(weight * (goal === 'ganho' ? 2.2 : 1.8)),
    fats: Math.round(weight * 0.8),
    carbs: Math.round(weight * (goal === 'ganho' ? 5 : 3)),
    kcals: Math.round((weight * 30))
  };

  return (
    <div className="space-y-6 md:space-y-12">
        <Anamnese />
        <Bioimpedancia />
        <Antropometria />
        <Biometry />
        
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1 glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem]">
          <h3 className="text-xl md:text-2xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter flex items-center gap-3"><Scale className="text-green-500" />Perfil Nutricional</h3>
          <div className="space-y-6">
            <div><label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Peso (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white font-bold text-sm md:text-base focus:ring-1 focus:ring-green-500 outline-none"/></div>
            <div><label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Objetivo</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value as any)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white font-bold appearance-none text-sm md:text-base focus:ring-1 focus:ring-green-500 outline-none">
              <option value="perda">Perda de Gordura</option>
              <option value="manutencao">Manutenção</option>
              <option value="ganho">Ganho de Massa</option>
            </select></div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-green-500/10">
          <div className="flex items-center justify-between mb-8 md:mb-12">
             <h4 className="text-green-500 font-black uppercase text-[10px] md:text-xs tracking-widest">Estimativa Diária Recomendada</h4>
             <div className="bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 text-white font-black text-sm">{macros.kcals} kcal</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
             {[{ label: 'Proteínas', value: macros.protein, color: 'bg-blue-500' }, { label: 'Hidratos', value: macros.carbs, color: 'bg-yellow-500' }, { label: 'Gorduras', value: macros.fats, color: 'bg-rose-500' }].map((macro, i) => (
               <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
                  <div className={`absolute bottom-0 left-0 w-full h-1 ${macro.color}`}></div>
                  <p className="text-slate-500 text-[10px] font-black uppercase mb-4">{macro.label}</p>
                  <h5 className="text-3xl font-black text-white italic">{macro.value}g</h5>
               </div>
             ))}
          </div>
        </div>
      </div>
      <FoodPyramid />
    </div>
  );
};

export default NutricaoDesportiva;
