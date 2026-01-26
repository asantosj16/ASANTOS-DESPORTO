import React, { useState } from 'react';
import { Users, Heart, Target, Calendar, CheckCircle2, ArrowRight, X, Info } from 'lucide-react';

interface PlanDetail {
  structure: string[];
  equipment: string;
  notes: string;
}

interface Plan {
  level: string;
  duration: string;
  focus: string;
  sessions: string;
  activities: string[];
  color: string;
  details: PlanDetail;
}

const NatacaoAdaptada: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    {
      level: "Iniciante",
      duration: "8-12 semanas",
      focus: "Adaptação e fundamentos",
      sessions: "2-3 sessões/semana",
      activities: ["Flutuação assistida", "Deslocamentos básicos", "Exercícios de respiração", "Introdução aos nados"],
      color: "bg-green-500",
      details: {
        structure: [
          "1. Acolhimento e Entrada (5')",
          "2. Adaptação e Respiração (10')",
          "3. Flutuação e Equilíbrio (15')",
          "4. Relaxamento (10')"
        ],
        equipment: "Espaguetes, tapetes flutuantes, brinquedos.",
        notes: "Uso de acompanhante dentro d'água se necessário. Foco total na confiança."
      }
    },
    {
      level: "Intermediário",
      duration: "12-16 semanas",
      focus: "Desenvolvimento de habilidades",
      sessions: "3-4 sessões/semana",
      activities: ["Técnicas de nado específicas", "Exercícios de força na água", "Jogos adaptados", "Aumento gradual de intensidade"],
      color: "bg-blue-500",
      details: {
        structure: [
          "1. Aquecimento com deslocamentos (10')",
          "2. Propulsão de Pernas e Braços (20')",
          "3. Mergulho e jogos de fundo (10')",
          "4. Volta à calma (5')"
        ],
        equipment: "Pranchas, palmarias, halteres aquáticos.",
        notes: "Foco na autonomia e redução do auxílio. Introdução de estilos."
      }
    },
    {
      level: "Avançado",
      duration: "16+ semanas",
      focus: "Performance e competição",
      sessions: "4-5 sessões/semana",
      activities: ["Treino de endurance", "Técnicas avançadas", "Preparação para provas", "Manutenção de condicionamento"],
      color: "bg-purple-500",
      details: {
        structure: [
          "1. Aquecimento nado contínuo (10')",
          "2. Séries de condicionamento (30')",
          "3. Velocidade e saídas (15')",
          "4. Soltura (5')"
        ],
        equipment: "Cronômetro, elásticos, paraquedas.",
        notes: "Simulação de situações de prova e regras de competição."
      }
    }
  ];

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 dark:bg-blue-700 p-2 rounded-xl text-white shadow-md">
            <Users size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Natação Adaptada</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Inclusão e adaptação para todos os níveis de habilidade.</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Introdução */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart size={20} className="text-blue-500" />
              Benefícios da Natação Adaptada
            </h5>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                Melhora da mobilidade e força muscular
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                Redução do estresse articular
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                Desenvolvimento cardiovascular
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                Aumento da autoestima e socialização
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                Adaptação para diferentes deficiências
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-500" />
              Objetivos do Programa
            </h5>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h6 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Inclusão Social</h6>
                <p className="text-sm text-blue-700 dark:text-blue-300">Promover a participação ativa em atividades aquáticas adaptadas às necessidades individuais.</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h6 className="font-bold text-green-900 dark:text-green-100 mb-2">Desenvolvimento Motor</h6>
                <p className="text-sm text-green-700 dark:text-green-300">Melhorar coordenação, equilíbrio e força através de exercícios específicos.</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h6 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Bem-estar Emocional</h6>
                <p className="text-sm text-purple-700 dark:text-purple-300">Fomentar confiança, independência e qualidade de vida.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Planos de Treino */}
        <div>
          <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" />
            Planos de Treino Adaptados
          </h5>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -inset-0.5 ${plan.color} rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300`}></div>
                <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md text-white ${plan.color}`}>{plan.duration}</span>
                    <CheckCircle2 size={16} className="text-slate-300 dark:text-slate-700" />
                  </div>
                  <h6 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{plan.level}</h6>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{plan.focus}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{plan.sessions}</p>

                  <div className="flex-grow">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest">Atividades:</p>
                    <ul className="space-y-1">
                      {plan.activities.map((activity, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => setSelectedPlan(plan)}
                    className="mt-4 flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    VER DETALHES <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendações */}
        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl">
          <h6 className="font-bold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
            <Heart size={16} />
            Recomendações Importantes
          </h6>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Avaliação médica prévia obrigatória</li>
            <li>• Adaptações individuais conforme a deficiência</li>
            <li>• Supervisão profissional especializada</li>
            <li>• Equipamentos de apoio quando necessário</li>
            <li>• Progressão gradual e respeitando limites</li>
          </ul>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scale-up relative">
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
                <span className={`text-[10px] font-black px-2 py-1 rounded-md text-white ${selectedPlan.color} mb-2 inline-block`}>
                    {selectedPlan.level.toUpperCase()}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Detalhes da Sessão</h3>
                <p className="text-sm text-slate-500">{selectedPlan.focus}</p>
            </div>

            <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-blue-500" />
                        Estrutura da Aula
                    </h5>
                    <ul className="space-y-2">
                        {selectedPlan.details.structure.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 border-l-2 border-slate-200 dark:border-slate-700 pl-3">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                        <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">Equipamentos</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{selectedPlan.details.equipment}</p>
                     </div>
                     <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                        <h5 className="font-bold text-amber-800 dark:text-amber-200 mb-2 text-xs uppercase tracking-wider flex items-center gap-1">
                            <Info size={12} /> Notas
                        </h5>
                        <p className="text-xs text-amber-700 dark:text-amber-300">{selectedPlan.details.notes}</p>
                     </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                    Fechar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NatacaoAdaptada;