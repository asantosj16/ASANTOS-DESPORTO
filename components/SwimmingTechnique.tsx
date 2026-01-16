import React, { useState } from 'react';
import { Waves, PlayCircle, Info, Calendar, Target, CheckCircle2, Award } from 'lucide-react';

type SkillLevel = 'basico' | 'intermedio' | 'avancado';

interface SwimmingDrill {
  name: string;
  instructions: string;
  focus: string;
}

interface SwimPlan {
  phase: string;
  workout: string;
  volume: string;
}

interface SwimStyle {
  id: string;
  name: string;
  description: string;
  mainFocus: string;
  commonMistakes: string[];
  drills: SwimmingDrill[];
  plans: Record<SkillLevel, SwimPlan[]>;
}

const SWIM_STYLES: SwimStyle[] = [
  {
    id: 'crawl',
    name: 'Crawl (Estilo Livre)',
    description: 'O nado mais rápido e eficiente, focado em hidrodinâmica e rotação contínua.',
    mainFocus: 'Manter a linha de flutuação horizontal e a rotação axial do tronco.',
    commonMistakes: ['Olhar para a frente', 'Cruzar a linha média na entrada', 'Dobrar excessivamente o joelho'],
    drills: [
      { name: 'Pernada Lateral', instructions: 'Um braço à frente, outro colado. Olhar para o fundo.', focus: 'Alinhamento' },
      { name: 'Catch-up', instructions: 'Um braço espera o outro na frente para iniciar a braçada.', focus: 'Amplitude' }
    ],
    plans: {
      basico: [
        { phase: 'Aquecimento', workout: '100m Crawl Suave', volume: '100m' },
        { phase: 'Técnica', workout: '4x50m Pernada com prancha', volume: '200m' },
        { phase: 'Série Principal', workout: '4x50m Crawl (Desc. 30s)', volume: '200m' }
      ],
      intermedio: [
        { phase: 'Aquecimento', workout: '200m Variado (Crawl/Costas)', volume: '200m' },
        { phase: 'Técnica', workout: '8x50m Educativos (Foco em Catch-up)', volume: '400m' },
        { phase: 'Série Principal', workout: '10x100m Ritmo Prova (Desc. 20s)', volume: '1000m' }
      ],
      avancado: [
        { phase: 'Aquecimento', workout: '400m Livre (Progressivo a cada 100m)', volume: '400m' },
        { phase: 'Série Técnica', workout: '12x50m Combinados (Técnica/Velocidade)', volume: '600m' },
        { phase: 'Série Principal', workout: '20x100m Limiar (Desc. 15s)', volume: '2000m' }
      ]
    }
  },
  {
    id: 'backstroke',
    name: 'Costas',
    description: 'Focado em rolamento de ombros e pernada contínua em posição supina.',
    mainFocus: 'Estabilidade da cabeça e profundidade da braçada lateral.',
    commonMistakes: ['Anca baixa (posição sentada)', 'Ciclagem de braços irregular', 'Joelhos fora de água'],
    drills: [
      { name: 'Rolamento de Ombros', instructions: 'Roda ombros 45º sem mover a cabeça.', focus: 'Rotação Axial' },
      { name: 'Pernada com Braço no Ar', instructions: 'Um braço apontado ao teto para fixar o ombro.', focus: 'Estabilidade' }
    ],
    plans: {
      basico: [
        { phase: 'Aquecimento', workout: '100m Costas Suave', volume: '100m' },
        { phase: 'Técnica', workout: '4x50m Pernada costas sem braços', volume: '200m' },
        { phase: 'Série Principal', workout: '4x50m Costas Completo', volume: '200m' }
      ],
      intermedio: [
        { phase: 'Aquecimento', workout: '4x50m Só Pernas (Braços ao longo do corpo)', volume: '200m' },
        { phase: 'Série Técnica', workout: '6x50m Braço a Braço (Alternado)', volume: '300m' },
        { phase: 'Série Principal', workout: '8x100m Manutenção de Técnica (Desc. 30s)', volume: '800m' }
      ],
      avancado: [
        { phase: 'Aquecimento', workout: '400m (100m Pernas / 300m Nado)', volume: '400m' },
        { phase: 'Série Técnica', workout: '10x50m Controlo de Ciclo', volume: '500m' },
        { phase: 'Série Principal', workout: '12x100m VO2 Max (Desc. 20s)', volume: '1200m' }
      ]
    }
  },
  {
    id: 'breaststroke',
    name: 'Bruços',
    description: 'Nado de maior resistência hidrodinâmica, focado no timing entre tração e pernada.',
    mainFocus: 'Pernada em chicote e coordenação "Tração-Respiração-Pernada-Deslize".',
    commonMistakes: ['Pernada de tesoura', 'Inspirar demasiado tarde', 'Falta de fase de deslize'],
    drills: [
      { name: '2 Pernadas / 1 Braçada', instructions: 'Exagerar a fase de deslize com duas pernadas seguidas.', focus: 'Hidrodinâmica' },
      { name: 'Braçada de Bruços com Pernada Crawl', instructions: 'Isolar a tração mantendo a flutuação.', focus: 'Potência de Tração' }
    ],
    plans: {
      basico: [
        { phase: 'Aquecimento', workout: '100m Livre', volume: '100m' },
        { phase: 'Técnica', workout: '6x50m Só Pernada de Bruços (Prancha)', volume: '300m' },
        { phase: 'Série Principal', workout: '4x50m Bruços (Desc. 45s)', volume: '200m' }
      ],
      intermedio: [
        { phase: 'Aquecimento', workout: '200m Livre Suave', volume: '200m' },
        { phase: 'Série Técnica', workout: '10x50m (2 Pernadas / 1 Braçada)', volume: '500m' },
        { phase: 'Série Principal', workout: '6x100m (50m Bruços / 50m Crawl)', volume: '600m' }
      ],
      avancado: [
        { phase: 'Aquecimento', workout: '400m Estilos (Medley)', volume: '400m' },
        { phase: 'Série Técnica', workout: '8x50m Trabalho de Saída/Viragem', volume: '400m' },
        { phase: 'Série Principal', workout: '15x100m Específico (Foco em Deslize)', volume: '1500m' }
      ]
    }
  },
  {
    id: 'butterfly',
    name: 'Mariposa',
    description: 'Nado de alta potência exigindo coordenação rítmica entre ondulação e braçada simultânea.',
    mainFocus: 'Ondulação partindo do peito e entrada dos braços à largura dos ombros.',
    commonMistakes: ['Pernada desincronizada', 'Cabeça demasiado alta na respiração', 'Braços rígidos'],
    drills: [
      { name: 'Ondulação Subaquática', instructions: 'Focar no movimento de "chicote" das ancas.', focus: 'Ritmo' },
      { name: 'Braço Único', instructions: 'Manter um braço à frente e realizar o ciclo com o outro.', focus: 'Entrada' }
    ],
    plans: {
      basico: [
        { phase: 'Aquecimento', workout: '100m Crawl', volume: '100m' },
        { phase: 'Técnica', workout: '4x50m Ondulação (Prancha)', volume: '200m' },
        { phase: 'Série Principal', workout: '8x25m Braço Único', volume: '200m' }
      ],
      intermedio: [
        { phase: 'Aquecimento', workout: '300m (50m Crawl / 25m Ondulação)', volume: '300m' },
        { phase: 'Série Técnica', workout: '8x25m Braço Único (Alternando)', volume: '200m' },
        { phase: 'Série Principal', workout: '12x50m (25m Mariposa / 25m Crawl)', volume: '600m' }
      ],
      avancado: [
        { phase: 'Aquecimento', workout: '400m Progressivo', volume: '400m' },
        { phase: 'Série Técnica', workout: '12x50m (25m Mariposa / 25m Técnica)', volume: '600m' },
        { phase: 'Série Principal', workout: '10x100m Mariposa Fracionada', volume: '1000m' }
      ]
    }
  }
];

const SwimmingTechnique: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState(SWIM_STYLES[0].id);
  const [activeLevel, setActiveLevel] = useState<SkillLevel>('basico');
  
  const currentStyle = SWIM_STYLES.find(s => s.id === activeStyle) || SWIM_STYLES[0];
  const currentPlan = currentStyle.plans[activeLevel];

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-sky-50/30 dark:bg-sky-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500 p-2 rounded-xl text-white shadow-lg"><Waves size={24} /></div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Análise Técnica de Nados</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dossiê Técnico e Planeamento</p>
          </div>
        </div>
        <div className="flex bg-slate-900/50 p-1 rounded-2xl overflow-x-auto no-scrollbar border border-slate-800">
          {SWIM_STYLES.map(style => (
            <button 
              key={style.id} 
              onClick={() => setActiveStyle(style.id)} 
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase whitespace-nowrap ${activeStyle === style.id ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {style.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{currentStyle.name}</h4>
              <p className="text-slate-400 font-medium leading-relaxed">{currentStyle.description}</p>
            </div>
            
            <div className="p-6 bg-sky-950/30 rounded-3xl border border-sky-900/50">
              <h5 className="text-[10px] font-black uppercase text-sky-400 tracking-widest mb-3 flex items-center gap-2">
                <Target size={14} /> Foco Principal
              </h5>
              <p className="text-white font-bold">{currentStyle.mainFocus}</p>
            </div>

            <div>
              <h5 className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-3">Erros Comuns a Evitar</h5>
              <div className="grid grid-cols-1 gap-3">
                {currentStyle.commonMistakes.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-xs text-slate-300 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 flex items-center gap-2">
               <Info size={14} /> Educativos Recomendados
            </h5>
            {currentStyle.drills.map((drill, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-sky-500/30 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="text-white font-black uppercase text-sm group-hover:text-sky-400 transition-colors">{drill.name}</h6>
                  <PlayCircle size={18} className="text-slate-600 group-hover:text-sky-500 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mb-4">{drill.instructions}</p>
                <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest">Foco: {drill.focus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secção de Plano de Treino Multinível */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 flex items-center gap-2">
               <Calendar size={14} /> Plano de Treino Sugerido
            </h5>
            
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              {(['basico', 'intermedio', 'avancado'] as SkillLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center gap-2 ${activeLevel === level ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Award size={12} /> {level}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border-slate-800">
             <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900/80">
                   <tr>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Fase</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Conteúdo / Séries</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Volume</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                   {currentPlan.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                         <td className="px-6 py-4">
                            <span className="text-[10px] font-black text-sky-500 uppercase">{item.phase}</span>
                         </td>
                         <td className="px-6 py-4">
                            <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">{item.workout}</span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase">{item.volume}</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-4 bg-slate-900/50 flex justify-between items-center border-t border-slate-800">
                <span className="text-[9px] font-black text-slate-500 uppercase">Volume Total Estimado</span>
                <span className="text-xs font-black text-sky-500 uppercase tracking-widest">
                   {currentPlan.reduce((acc, curr) => acc + parseInt(curr.volume), 0)}m
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimmingTechnique;