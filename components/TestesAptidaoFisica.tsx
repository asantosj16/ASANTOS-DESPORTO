
import React, { useState, useMemo } from 'react';
import { Activity, Timer, Dumbbell, Ruler, Zap, Heart, TrendingUp, Trophy, Info } from 'lucide-react';

const TestesAptidaoFisica: React.FC = () => {
  const [data, setData] = useState({
    vo2max: 45,
    benchPress: 80,
    squat: 100,
    pushups: 35,
    situps: 42,
    flexibility: 28,
    agility: 12.5
  });

  // Função para normalizar valores para uma escala de 0-100 para o gráfico
  const normalizeScore = (value: number, type: string) => {
    switch(type) {
      case 'vo2max': return Math.min(100, Math.max(0, (value / 60) * 100)); // Base 60 ml/kg/min como 100%
      case 'strength_upp': return Math.min(100, Math.max(0, (value / 120) * 100)); // Base 120kg como 100%
      case 'strength_low': return Math.min(100, Math.max(0, (value / 160) * 100)); // Base 160kg como 100%
      case 'endurance': return Math.min(100, Math.max(0, (value / 60) * 100)); // Base 60 reps como 100%
      case 'flexibility': return Math.min(100, Math.max(0, (value / 40) * 100)); // Base 40cm como 100%
      case 'agility': return Math.min(100, Math.max(0, (15 / value) * 100)); // Inverso: menos tempo é melhor. Base 15s? Ajustar logica.
      default: return 50;
    }
  };

  const getRating = (value: number, type: string) => {
    // Valores de referência aproximados (Exemplo Genérico)
    switch(type) {
      case 'vo2max':
        if(value > 55) return { label: 'Elite', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', score: 100 };
        if(value > 45) return { label: 'Excelente', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', score: 80 };
        if(value > 35) return { label: 'Bom', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', score: 60 };
        return { label: 'Regular', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', score: 40 };
      
      case 'strength_upp': // Supino (approx 1x BW = 75kg)
        if(value > 100) return { label: 'Elite', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', score: 100 };
        if(value > 80) return { label: 'Forte', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', score: 80 };
        if(value > 60) return { label: 'Médio', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', score: 60 };
        return { label: 'Iniciante', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', score: 40 };

      case 'strength_low': // Agachamento (approx 1.5x BW = 112kg)
        if(value > 140) return { label: 'Elite', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', score: 100 };
        if(value > 110) return { label: 'Forte', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', score: 80 };
        if(value > 80) return { label: 'Médio', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', score: 60 };
        return { label: 'Iniciante', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', score: 40 };

      case 'endurance': // Reps
        if(value > 50) return { label: 'Elite', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', score: 100 };
        if(value > 35) return { label: 'Excelente', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', score: 80 };
        if(value > 20) return { label: 'Bom', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', score: 60 };
        return { label: 'Regular', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', score: 40 };

      case 'flexibility': // cm
        if(value > 35) return { label: 'Excelente', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', score: 100 };
        if(value > 25) return { label: 'Bom', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', score: 75 };
        return { label: 'Regular', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', score: 50 };

      default:
        return { label: '-', color: 'text-slate-500', bg: 'bg-slate-100', score: 0 };
    }
  };

  // Cálculo da pontuação geral
  const overallScore = useMemo(() => {
    const scores = [
      normalizeScore(data.vo2max, 'vo2max'),
      normalizeScore(data.benchPress, 'strength_upp'),
      normalizeScore(data.squat, 'strength_low'),
      normalizeScore(data.pushups, 'endurance'),
      normalizeScore(data.situps, 'endurance'),
      normalizeScore(data.flexibility, 'flexibility')
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [data]);

  const RadarChart = () => {
    const size = 200;
    const center = size / 2;
    const radius = 80;
    const metrics = [
        { label: 'Cardio', value: normalizeScore(data.vo2max, 'vo2max') },
        { label: 'Força Sup.', value: normalizeScore(data.benchPress, 'strength_upp') },
        { label: 'Força Inf.', value: normalizeScore(data.squat, 'strength_low') },
        { label: 'Resistência', value: (normalizeScore(data.pushups, 'endurance') + normalizeScore(data.situps, 'endurance')) / 2 },
        { label: 'Flexib.', value: normalizeScore(data.flexibility, 'flexibility') },
    ];

    const angleStep = (Math.PI * 2) / metrics.length;

    const points = metrics.map((metric, i) => {
        const value = metric.value / 100 * radius; // Escala para o raio
        const x = center + value * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + value * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(' ');

    const bgPoints = metrics.map((_, i) => {
        const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <svg width={size} height={size} className="overflow-visible">
                {/* Background Polygon */}
                <polygon points={bgPoints} fill="none" stroke="currentColor" strokeOpacity="0.1" className="text-slate-500" />
                {/* Background Circles */}
                <circle cx={center} cy={center} r={radius * 0.75} fill="none" stroke="currentColor" strokeOpacity="0.05" className="text-slate-500" />
                <circle cx={center} cy={center} r={radius * 0.5} fill="none" stroke="currentColor" strokeOpacity="0.05" className="text-slate-500" />
                <circle cx={center} cy={center} r={radius * 0.25} fill="none" stroke="currentColor" strokeOpacity="0.05" className="text-slate-500" />
                
                {/* Data Polygon */}
                <polygon points={points} fill="rgba(249, 115, 22, 0.2)" stroke="rgb(249, 115, 22)" strokeWidth="2" />
                
                {/* Labels */}
                {metrics.map((metric, i) => {
                    const x = center + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-bold uppercase">
                            {metric.label}
                        </text>
                    );
                })}
            </svg>
            <div className="mt-2 text-center">
                <div className="text-2xl font-black text-orange-500">{overallScore}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Pontuação Geral</div>
            </div>
        </div>
    );
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-1 opacity-0 mb-6" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-600/20">
            <Activity size={28} />
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Testes de Aptidão</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-bold tracking-wider">
                Status: Ativo
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Última avaliação: Hoje</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-bold uppercase tracking-wide">
                <TrendingUp size={14} />
                Histórico
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/20 transition-colors text-xs font-bold uppercase tracking-wide">
                <Trophy size={14} />
                Rankings
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row border-b border-slate-100 dark:border-slate-800">
         {/* Left Side: Chart & Overall */}
         <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 p-6 flex flex-col items-center justify-center">
            <h5 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={18} />
                Perfil do Atleta
            </h5>
            <RadarChart />
            
            <div className="mt-6 w-full space-y-3">
                 <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                     <div className="flex justify-between text-xs mb-1">
                         <span className="text-slate-500">Ponto Forte</span>
                         <span className="font-bold text-emerald-500">Força Inferior</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                     </div>
                 </div>
                 <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                     <div className="flex justify-between text-xs mb-1">
                         <span className="text-slate-500">A Melhorar</span>
                         <span className="font-bold text-orange-500">Flexibilidade</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full bg-orange-500 rounded-full" style={{ width: '45%' }}></div>
                     </div>
                 </div>
            </div>
         </div>

         {/* Right Side: Inputs */}
         <div className="lg:w-2/3 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
            {/* VO2 Max */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors group shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-500">
                        <Heart size={18} />
                    </div>
                    <div>
                        <h5 className="text-xs font-black text-slate-500 uppercase tracking-wide">Cardio</h5>
                        <span className="text-[10px] text-slate-400">Cooper / Vo2Max</span>
                    </div>
                </div>
                {(() => {
                    const rating = getRating(data.vo2max, 'vo2max');
                    return (
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${rating.bg} ${rating.color}`}>
                            {rating.label}
                        </span>
                    )
                })()}
            </div>
            
            <div className="relative mt-2">
                <input 
                type="number" 
                value={data.vo2max} 
                onChange={(e) => setData({...data, vo2max: Number(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-black text-xl md:text-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-center"
                />
                <span className="absolute right-4 bottom-4 text-[10px] font-bold text-slate-400 uppercase">ml/kg/min</span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-500" 
                    style={{ width: `${normalizeScore(data.vo2max, 'vo2max')}%` }}
                ></div>
            </div>
            </div>

            {/* Força */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                    <Dumbbell size={18} />
                </div>
                <div>
                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-wide">Força Máxima (1RM)</h5>
                    <span className="text-[10px] text-slate-400">Estimativa ou Teste Real</span>
                </div>
            </div>
            
            <div className="space-y-4">
                {/* Supino */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Supino Reto</label>
                        {(() => {
                            const rating = getRating(data.benchPress, 'strength_upp');
                            return <span className={`text-[9px] font-black ${rating.color}`}>{rating.label}</span>
                        })()}
                    </div>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={data.benchPress} 
                        onChange={(e) => setData({...data, benchPress: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-black text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        <span className="absolute right-3 top-2.5 text-[10px] font-bold text-slate-400">kg</span>
                    </div>
                </div>

                {/* Agachamento */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Agachamento</label>
                        {(() => {
                            const rating = getRating(data.squat, 'strength_low');
                            return <span className={`text-[9px] font-black ${rating.color}`}>{rating.label}</span>
                        })()}
                    </div>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={data.squat} 
                        onChange={(e) => setData({...data, squat: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-black text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        <span className="absolute right-3 top-2.5 text-[10px] font-bold text-slate-400">kg</span>
                    </div>
                </div>
            </div>
            </div>

            {/* Resistência */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-500">
                    <Zap size={18} />
                </div>
                <div>
                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-wide">Resistência Muscular</h5>
                    <span className="text-[10px] text-slate-400">Máximo de Repetições (1 min)</span>
                </div>
            </div>

            <div className="space-y-4">
                {/* Flexões */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Flexões</label>
                        {(() => {
                            const rating = getRating(data.pushups, 'endurance');
                            return <span className={`text-[9px] font-black ${rating.color}`}>{rating.label}</span>
                        })()}
                    </div>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={data.pushups} 
                        onChange={(e) => setData({...data, pushups: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-black text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-black text-slate-400 italic">reps</span>
                    </div>
                </div>

                {/* Abdominais */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Abdominais</label>
                        {(() => {
                            const rating = getRating(data.situps, 'endurance');
                            return <span className={`text-[9px] font-black ${rating.color}`}>{rating.label}</span>
                        })()}
                    </div>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={data.situps} 
                        onChange={(e) => setData({...data, situps: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-black text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-black text-slate-400 italic">reps</span>
                    </div>
                </div>
            </div>
            </div>

            {/* Flexibilidade & Agility */}
            <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-500">
                                <Ruler size={18} />
                            </div>
                            <div>
                                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wide">Flexibilidade</h5>
                            </div>
                        </div>
                        {(() => {
                            const rating = getRating(data.flexibility, 'flexibility');
                            return (
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${rating.bg} ${rating.color}`}>
                                    {rating.label}
                                </span>
                            )
                        })()}
                    </div>
                    <div className="relative mt-2">
                        <input 
                        type="number" 
                        value={data.flexibility} 
                        onChange={(e) => setData({...data, flexibility: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-black text-xl md:text-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-center"
                        />
                        <span className="absolute right-4 bottom-4 text-[10px] font-bold text-slate-400 uppercase">cm</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                            style={{ width: `${normalizeScore(data.flexibility, 'flexibility')}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-500">
                                <Timer size={18} />
                            </div>
                            <div>
                                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wide">Agilidade</h5>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-2">
                        <input 
                        type="number" 
                        value={data.agility} 
                        onChange={(e) => setData({...data, agility: Number(e.target.value)})}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-black text-xl md:text-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-center"
                        />
                        <span className="absolute right-4 bottom-4 text-[10px] font-bold text-slate-400 uppercase">s</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TestesAptidaoFisica;
