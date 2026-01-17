
import React, { useState, useMemo } from 'react';
import { Activity, User, Ruler, Calculator, Info, TrendingDown, TrendingUp } from 'lucide-react';

const Biometry: React.FC = () => {
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const stats = useMemo(() => {
    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);
    
    // Taxa Metabólica Basal (Mifflin-St Jeor)
    let tmb;
    if (gender === 'male') {
        tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let imcCategory = '';
    let imcColor = '';
    if (imc < 18.5) { imcCategory = 'Abaixo do peso'; imcColor = 'text-blue-500'; }
    else if (imc < 25) { imcCategory = 'Peso normal'; imcColor = 'text-emerald-500'; }
    else if (imc < 30) { imcCategory = 'Sobrepeso'; imcColor = 'text-yellow-500'; }
    else { imcCategory = 'Obesidade'; imcColor = 'text-red-500'; }

    return { imc: imc.toFixed(1), tmb: Math.round(tmb), imcCategory, imcColor };
  }, [weight, height, age, gender]);

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Biometria & Composição</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avaliação Antropométrica Básica</p>
          </div>
        </div>
        <Activity className="text-emerald-500 animate-pulse" size={20} />
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Coluna 1: Entradas */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <User size={12} /> Peso (kg)
              </label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-3 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Ruler size={12} /> Altura (cm)
              </label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-3 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Idade</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-3 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Género</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                <button 
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${gender === 'male' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                >
                  MASC
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${gender === 'female' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                >
                  FEM
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                <Info size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">Entenda o cálculo</span>
             </div>
             <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
               Utilizamos o índice de Massa Corporal (IMC) para classificação de peso e a fórmula de Mifflin-St Jeor para estimar o gasto energético basal (TMB).
             </p>
          </div>
        </div>

        {/* Coluna 2: Resultados */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* IMC Card */}
             <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase mb-2">O Seu IMC</span>
                <div className={`text-4xl font-black mb-1 ${stats.imcColor}`}>{stats.imc}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${stats.imcColor}`}>{stats.imcCategory}</div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-emerald-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-yellow-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
                </div>
             </div>

             {/* TMB Card */}
             <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase mb-2">TMB Estimada</span>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{stats.tmb}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">kcal / dia</div>
                <p className="text-[10px] text-slate-400 leading-tight">Mínimo necessário para manter funções vitais em repouso.</p>
             </div>
          </div>

          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800/30 flex-grow">
            <h5 className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase mb-4 tracking-widest flex items-center gap-2">
              <TrendingUp size={14} /> Sugestão Calórica
            </h5>
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-xs text-slate-600 dark:text-slate-400">Manter Peso</span>
                 <span className="text-sm font-black text-slate-900 dark:text-white">{Math.round(stats.tmb * 1.3)} kcal</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                   <TrendingDown size={12} className="text-red-500" /> Perda (Défice)
                 </span>
                 <span className="text-sm font-black text-slate-900 dark:text-white">{Math.round(stats.tmb * 1.3) - 500} kcal</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                   <TrendingUp size={12} className="text-blue-500" /> Ganho (Superavit)
                 </span>
                 <span className="text-sm font-black text-slate-900 dark:text-white">{Math.round(stats.tmb * 1.3) + 300} kcal</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biometry;
