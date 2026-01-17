
import React, { useState } from 'react';
// Added Activity and ClipboardList to the imports to fix "Cannot find name" errors
import { Waves, Baby, Sparkles, BookOpen, GraduationCap, ShieldCheck, Heart, ToyBrick, ChevronRight, PlayCircle, Activity, ClipboardList } from 'lucide-react';

type AgeGroup = 'bebes' | 'adaptacao' | 'aprendizagem';

interface LessonPlan {
  title: string;
  objective: string;
  activities: string[];
  duration: string;
}

const CHILD_PLANS: Record<AgeGroup, LessonPlan[]> = {
  bebes: [
    {
      title: "Exploração Sensorial",
      objective: "Adaptação térmica e estímulo vestibular.",
      activities: ["Banho de chuva com regador", "Flutuação dorsal com apoio dos pais", "Pequenas imersões ao sinal verbal"],
      duration: "30 min"
    },
    {
      title: "Propulsão de Pernas",
      objective: "Estimular o reflexo de pernada e preensão.",
      activities: ["Chutar a água para fazer bolas", "Agarrar brinquedos flutuantes", "Deslocamento lateral na calha"],
      duration: "30 min"
    }
  ],
  adaptacao: [
    {
      title: "Domínio da Respiração",
      objective: "Controlo da expiração subaquática (bolhas).",
      activities: ["Fazer bolhas com a boca e nariz", "Conversa debaixo de água", "Pegar em objetos no fundo (pouca profundidade)"],
      duration: "45 min"
    },
    {
      title: "Flutuação e Equilíbrio",
      objective: "Autonomia na posição de 'Estrela'.",
      activities: ["Posição de estrela (dorsal/ventral)", "Giro de 360º no eixo longitudinal", "Uso do esparguete para deslocamento"],
      duration: "45 min"
    }
  ],
  aprendizagem: [
    {
      title: "Iniciação ao Crawl",
      objective: "Coordenação braços e respiração lateral.",
      activities: ["Pernada lateral com prancha", "Ciclo de braçadas com 1 braço", "Nado completo com foco na expiração"],
      duration: "45 min"
    },
    {
      title: "Sobrevivência e Segurança",
      objective: "Capacidade de flutuação após queda acidental.",
      activities: ["Salto de pé e retorno à borda", "Flutuação de sobrevivência (1 min)", "Nado de emergência"],
      duration: "45 min"
    }
  ]
};

const SwimmingInfantil: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AgeGroup>('adaptacao');

  const ageGroups: { id: AgeGroup; label: string; icon: any; range: string }[] = [
    { id: 'bebes', label: 'Bebés', icon: Baby, range: '6m - 3 anos' },
    { id: 'adaptacao', label: 'Adaptação', icon: Sparkles, range: '3 - 5 anos' },
    { id: 'aprendizagem', label: 'Aprendizagem', icon: GraduationCap, range: '6 - 10 anos' },
  ];

  return (
    <div className="glass-card rounded-[3rem] overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-8 border-b border-slate-800 bg-blue-600/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-sky-500 p-3 rounded-2xl text-white shadow-xl rotate-3">
            <Baby size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Natação Infantil</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Pedagogia Aquática & Ludicidade</p>
          </div>
        </div>
        
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest flex flex-col items-center min-w-[100px] ${
                activeTab === group.id ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <group.icon size={16} className="mb-1" />
              {group.label}
              <span className="text-[8px] opacity-60 lowercase mt-0.5">{group.range}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 lg:p-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Fundamentos Pedagógicos */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full">
              <BookOpen size={14} className="text-sky-500" />
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Diretrizes de Aula</span>
            </div>
            
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
              A Magia do Aprendizado <span className="text-sky-500 italic">Aquático</span>
            </h4>
            
            <p className="text-slate-400 leading-relaxed font-medium">
              A natação infantil não deve ser apenas técnica, mas uma experiência psicomotora rica. O objetivo é transformar o medo em competência através do jogo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Segurança', desc: 'Prevenção de afogamento e autonomia.', icon: ShieldCheck, color: 'text-emerald-500' },
                { title: 'Motor', desc: 'Coordenação, equilíbrio e força.', icon: Activity, color: 'text-blue-500' },
                { title: 'Afetivo', desc: 'Confiança e vínculo social.', icon: Heart, color: 'text-rose-500' },
                { title: 'Lúdico', desc: 'Aprendizagem por meio do jogo.', icon: ToyBrick, color: 'text-yellow-500' },
              ].map((pill, i) => (
                <div key={i} className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl group hover:border-sky-500/30 transition-all">
                  <pill.icon className={`${pill.color} mb-2`} size={20} />
                  <h5 className="text-xs font-black text-white uppercase tracking-tight mb-1">{pill.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-tight font-medium">{pill.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Planos de Aula */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
               <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <ClipboardList size={14} /> Repositório de Planos
               </h5>
               <span className="text-[10px] font-black text-sky-500 uppercase px-3 py-1 bg-sky-500/10 rounded-full">
                 {CHILD_PLANS[activeTab].length} Modelos HD
               </span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
              {CHILD_PLANS[activeTab].map((plan, idx) => (
                <div key={idx} className="bg-slate-900/60 p-6 rounded-[2rem] border border-white/5 hover:border-sky-500/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h6 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                      {plan.title}
                    </h6>
                    <span className="text-[9px] font-black text-slate-600 bg-slate-950 px-2 py-0.5 rounded-full">
                      {plan.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-500/80 font-bold mb-4 italic">
                    Obj: {plan.objective}
                  </p>
                  <div className="space-y-2">
                    {plan.activities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                        <div className="w-1 h-1 rounded-full bg-sky-500" />
                        {act}
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 flex items-center gap-2 text-[9px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest transition-all">
                    Visualizar Demo <PlayCircle size={14} className="text-sky-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metodologia Prática */}
        <div className="p-8 bg-sky-950/20 border border-sky-500/20 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <ToyBrick size={150} className="text-sky-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h5 className="text-xl font-black text-white uppercase tracking-tight mb-2">A Importância do <span className="text-sky-400">Brincar</span></h5>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Na natação infantil, o jogo é a ferramenta mais séria. Através de histórias e dinâmicas, a criança esquece a profundidade e foca na solução de problemas motores, reduzindo a ansiedade.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Histórias', 'Imitação', 'Desafios', 'Exploração'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-slate-900 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimmingInfantil;
