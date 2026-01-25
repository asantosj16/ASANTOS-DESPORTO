
import React, { useState } from 'react';
import { Activity, Heart, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ReabilitacaoMuscular: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('superiores');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8">
      <div className="flex items-start gap-4">
        <div className="bg-teal-600/20 text-teal-400 p-3 md:p-4 rounded-xl md:rounded-2xl">
          <Activity size={28} className="md:w-8 md:h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Exercícios de Musculação e Reabilitação
          </h3>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            Protocolos específicos para recuperação e fortalecimento de membros superiores e inferiores
          </p>
        </div>
      </div>

      {/* Princípios Gerais */}
      <div className="bg-slate-800/40 p-5 rounded-xl space-y-3">
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          <Heart className="text-rose-400" size={20} />
          Princípios da Reabilitação
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-2">
            <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
            <span className="text-slate-300">Progressão gradual e controlada</span>
          </div>
          <div className="flex gap-2">
            <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
            <span className="text-slate-300">Respeitar o limiar de dor</span>
          </div>
          <div className="flex gap-2">
            <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
            <span className="text-slate-300">Individualização do treino</span>
          </div>
        </div>
      </div>

      {/* MEMBROS SUPERIORES */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('superiores')}
          className="w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800/70 p-4 rounded-xl transition-colors"
        >
          <h4 className="text-xl font-bold text-white">Membros Superiores</h4>
          {expandedSection === 'superiores' ? (
            <ChevronUp className="text-teal-400" size={24} />
          ) : (
            <ChevronDown className="text-slate-400" size={24} />
          )}
        </button>

        {expandedSection === 'superiores' && (
          <div className="space-y-6 animate-fade-in">
            {/* Ombro */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Ombro</h5>
              
              <div className="space-y-3">
                <div className="border-l-4 border-teal-500 pl-4">
                  <div className="font-semibold text-white">Fase Inicial (1-2 semanas)</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Pêndulo de Codman: 3x20 oscilações</li>
                    <li>• Elevação passiva com auxílio: 3x10</li>
                    <li>• Rotação externa com elástico leve: 3x15</li>
                    <li>• Mobilização escapular: 3x15</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-white">Fase Intermédia (3-6 semanas)</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Elevação lateral com halteres leves: 3x12</li>
                    <li>• Rotação externa no cabo: 3x12</li>
                    <li>• Face pull: 3x15</li>
                    <li>• Remada alta com elástico: 3x12</li>
                    <li>• Fortalecimento do manguito rotador: 3x15</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-white">Fase Avançada (6-12 semanas)</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Desenvolvimento com halteres: 3x10</li>
                    <li>• Elevação frontal: 3x12</li>
                    <li>• Remada alta com barra: 3x10</li>
                    <li>• Cuban press: 3x10</li>
                    <li>• Exercícios pliométricos leves (fase final)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cotovelo */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Cotovelo</h5>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-white mb-2">Epicondilite Lateral (Cotovelo de Tenista)</div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Alongamento dos extensores: 3x30s</li>
                    <li>• Contração excêntrica do extensor: 3x15</li>
                    <li>• Supinação/pronação com peso: 3x12</li>
                    <li>• Fortalecimento de preensão: 3x10</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-white mb-2">Epicondilite Medial (Cotovelo de Golfista)</div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Alongamento dos flexores: 3x30s</li>
                    <li>• Flexão do punho com haltere: 3x15</li>
                    <li>• Contração excêntrica dos flexores: 3x15</li>
                    <li>• Pronação com martelo: 3x12</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Punho e Mão */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Punho e Mão</h5>
              
              <ul className="text-sm text-slate-300 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Flexão e extensão do punho: 3x15</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Desvio radial e ulnar: 3x15</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Exercícios com bola de stress: 3x20 compressões</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Fortalecimento de preensão digital: 3x10 cada dedo</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* MEMBROS INFERIORES */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('inferiores')}
          className="w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800/70 p-4 rounded-xl transition-colors"
        >
          <h4 className="text-xl font-bold text-white">Membros Inferiores</h4>
          {expandedSection === 'inferiores' ? (
            <ChevronUp className="text-teal-400" size={24} />
          ) : (
            <ChevronDown className="text-slate-400" size={24} />
          )}
        </button>

        {expandedSection === 'inferiores' && (
          <div className="space-y-6 animate-fade-in">
            {/* Joelho */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Joelho</h5>
              
              <div className="space-y-3">
                <div className="border-l-4 border-teal-500 pl-4">
                  <div className="font-semibold text-white">Fase Inicial (Pós-lesão ou Cirurgia)</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Contração isométrica do quadríceps: 5x10s (manter)</li>
                    <li>• Elevação da perna estendida: 3x10</li>
                    <li>• Flexão passiva do joelho: 3x10</li>
                    <li>• Mobilização patelar: 3x20 movimentos</li>
                    <li>• Exercícios de propriocepção simples</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-white">Fase Intermédia</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Extensão do joelho com caneleira: 3x12</li>
                    <li>• Flexão do joelho na máquina: 3x12</li>
                    <li>• Mini agachamento (0-45°): 3x10</li>
                    <li>• Leg press com carga progressiva: 3x12</li>
                    <li>• Step-up em degrau baixo: 3x10 cada perna</li>
                    <li>• Exercícios de equilíbrio em prancha</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-white">Fase Avançada</div>
                  <ul className="text-sm text-slate-300 mt-2 space-y-1">
                    <li>• Agachamento completo: 3x10</li>
                    <li>• Avanços (lunges): 3x10 cada perna</li>
                    <li>• Agachamento búlgaro: 3x10 cada perna</li>
                    <li>• Exercícios pliométricos controlados</li>
                    <li>• Treino específico do desporto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Anca */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Anca</h5>
              
              <ul className="text-sm text-slate-300 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Ponte de glúteos: 3x15</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Abdução da anca em decúbito lateral: 3x15</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Rotação externa da anca: 3x15</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Clamshell: 3x15 cada lado</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
                  <span>Monster walks com elástico: 3x20 passos</span>
                </li>
              </ul>
            </div>

            {/* Tornozelo */}
            <div className="bg-slate-800/30 p-5 rounded-xl space-y-4">
              <h5 className="text-lg font-bold text-teal-400">Tornozelo</h5>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-white mb-2">Fortalecimento</div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Elevação de gémeos: 3x15</li>
                    <li>• Dorsiflexão com elástico: 3x15</li>
                    <li>• Inversão/eversão do tornozelo: 3x15</li>
                    <li>• Exercícios com prancha de equilíbrio</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-white mb-2">Propriocepção</div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Apoio unipodal: 3x30s cada perna</li>
                    <li>• Apoio em superfície instável: 3x30s</li>
                    <li>• Salto e aterragem controlada</li>
                    <li>• Marcha em linha reta com olhos fechados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alerta Importante */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-amber-400 shrink-0 mt-1" size={20} />
          <div className="text-sm text-slate-300">
            <span className="font-bold text-amber-400">Importante:</span> Estes protocolos são orientações gerais. 
            Cada lesão é única e requer avaliação individualizada por fisioterapeuta ou médico especialista. 
            Nunca force movimentos com dor aguda e respeite sempre os tempos de recuperação biológica dos tecidos.
          </div>
        </div>
      </div>

      {/* Nota sobre Retorno ao Treino */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
        <div className="text-sm text-slate-300">
          <span className="font-bold text-green-400">Critérios de Retorno ao Treino Normal:</span>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• Ausência de dor em repouso e durante exercícios</li>
            <li>• Amplitude de movimento completa</li>
            <li>• Força mínima de 90% comparado ao lado contralateral</li>
            <li>• Testes funcionais positivos</li>
            <li>• Aprovação médica ou fisioterapêutica</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReabilitacaoMuscular;
