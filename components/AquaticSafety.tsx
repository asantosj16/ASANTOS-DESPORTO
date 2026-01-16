import React from 'react';
import { ShieldAlert, LifeBuoy, PlayCircle, ExternalLink, Info, Ambulance, Stethoscope, AlertTriangle } from 'lucide-react';

interface SafetyProtocol {
  title: string;
  category: 'Prevenção' | 'Salvamento' | 'Primeiros Socorros';
  description: string;
  steps: string[];
  videoUrl: string;
}

const SAFETY_PROTOCOLS: SafetyProtocol[] = [
  {
    title: "Cadeia de Sobrevivência do Afogamento",
    category: "Prevenção",
    description: "Os 5 elos vitais para prevenir e agir em casos de afogamento segundo a ILS (International Life Saving Federation).",
    steps: [
      "Prevenção: Vigiar e educar",
      "Reconhecer: Identificar o afogado em apuros",
      "Prover flutuação: Lançar boia ou objeto flutuante",
      "Remover da água: Sem se tornar uma vítima",
      "Suporte de vida: Se necessário, acionar 193/192"
    ],
    videoUrl: "https://www.youtube.com/results?search_query=cadeira+de+sobrevivencia+afogamento"
  },
  {
    title: "Técnica de Salvamento Indireto",
    category: "Salvamento",
    description: "Métodos de resgate sem contato físico direto para garantir a segurança do socorrista.",
    steps: [
      "Alcançar: Use um bastão ou vara",
      "Lançar: Atire uma boia ou corda",
      "Remar: Use uma prancha ou bote",
      "Nadar: Apenas se for profissional treinado"
    ],
    videoUrl: "https://www.youtube.com/results?search_query=tecnicas+salvamento+aquatico+indireto"
  },
  {
    title: "RCP em Afogamento",
    category: "Primeiros Socorros",
    description: "Protocolo específico para vítimas de afogamento (foco em ventilações).",
    steps: [
      "Verificar consciência e respiração",
      "Iniciar com 5 ventilações de resgate",
      "30 compressões torácicas",
      "2 ventilações",
      "Manter ciclo 30:2 até o socorro chegar"
    ],
    videoUrl: "https://www.youtube.com/results?search_query=primeiros+socorros+afogamento+rcp"
  }
];

const AquaticSafety: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-5 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-red-50/30 dark:bg-red-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-xl text-white shadow-lg">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Segurança & Salvamento Aquático</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolos de Emergência e Prevenção</p>
          </div>
        </div>
        <div className="flex gap-4">
            <AlertTriangle className="text-amber-500" size={20} />
            <Ambulance className="text-red-500" size={20} />
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SAFETY_PROTOCOLS.map((protocol, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col hover:border-red-200 dark:hover:border-red-900/50 transition-colors group">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider ${
                protocol.category === 'Prevenção' ? 'bg-emerald-100 text-emerald-600' :
                protocol.category === 'Salvamento' ? 'bg-amber-100 text-amber-600' :
                'bg-red-100 text-red-600'
              }`}>
                {protocol.category}
              </span>
              {protocol.category === 'Primeiros Socorros' && <Stethoscope size={16} className="text-red-400" />}
              {protocol.category === 'Salvamento' && <LifeBuoy size={16} className="text-amber-400" />}
            </div>

            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter leading-tight">
              {protocol.title}
            </h4>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {protocol.description}
            </p>

            <div className="space-y-3 mb-8 flex-grow">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Procedimento:</span>
              {protocol.steps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{step}</span>
                </div>
              ))}
            </div>

            <a 
              href={protocol.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-all shadow-md"
            >
              <PlayCircle size={16} /> Tutorial Técnico <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      <div className="px-8 pb-8">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800 flex items-start gap-4">
          <Info className="text-red-500 shrink-0 mt-1" size={20} />
          <div>
            <p className="text-sm font-bold text-red-900 dark:text-red-300 uppercase tracking-tight mb-1">Regra de Ouro do Socorrista:</p>
            <p className="text-xs text-red-700 dark:text-red-400 leading-tight">
              Sua segurança vem em primeiro lugar. <strong>NUNCA</strong> entre na água para realizar um resgate se não tiver treinamento profissional em salvamento aquático e equipamento adequado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquaticSafety;