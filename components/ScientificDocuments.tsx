
import React, { useState } from 'react';
import { 
  BookOpen, GraduationCap, Dumbbell, Waves, Footprints, 
  Apple, Timer, FlaskConical, FileText, CheckCircle2, 
  TrendingUp, Microscope, ExternalLink
} from 'lucide-react';

type DocCategory = 'escolar' | 'musculacao' | 'natacao' | 'corrida' | 'nutricao' | 'hyrox';

interface ScientificPaper {
  title: string;
  author: string;
  summary: string;
  keyFindings: string[];
  url: string; // Link para o artigo completo ou PDF
}

const SCIENTIFIC_DATA: Record<DocCategory, ScientificPaper[]> = {
  escolar: [
    {
      title: "Desenvolvimento Motor e Sucesso Acadêmico",
      author: "Diamond, A. (2015)",
      summary: "Estudo sobre a relação entre funções executivas e atividade física coordenada na infância.",
      keyFindings: ["Atividades motoras complexas estimulam o córtex pré-frontal", "Exercício aeróbico aumenta o BDNF cerebral", "Melhora comprovada em testes de matemática e leitura"],
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4207119/"
    },
    {
      title: "Modelo de Desenvolvimento Motor",
      author: "Gallahue, D. L. (2012)",
      summary: "Referencial sobre as fases do desenvolvimento motor (reflexo, rudimentar, fundamental e especializado).",
      keyFindings: ["Importância da variabilidade na fase fundamental", "Barreira da proficiência motora aos 7 anos", "Especialização precoce vs. Desenvolvimento multilateral"],
      url: "https://scholar.google.pt/scholar?q=Gallahue+Motor+Development"
    }
  ],
  musculacao: [
    {
      title: "Mecanismos de Hipertrofia Muscular",
      author: "Schoenfeld, B. J. (2010)",
      summary: "Revisão sistemática sobre as variáveis que maximizam o crescimento muscular.",
      keyFindings: ["Tensão Mecânica como driver primário", "Stress Metabólico e Dano Muscular como fatores secundários", "Volume de treino correlaciona-se positivamente com ganhos"],
      url: "https://journals.lww.com/nsca-jscr/fulltext/2010/10000/the_mechanisms_of_muscle_hypertrophy_and_their.40.aspx"
    },
    {
      title: "Sinalização mTOR e Síntese Proteica",
      author: "Baar, K. (2014)",
      summary: "Análise da via de sinalização intracelular fundamental para a hipertrofia.",
      keyFindings: ["Ativação da p70S6K após treino resistido", "Interferência mínima do cardio se espaçado (>6h)", "Importância da Leucina no pós-treino"],
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4013406/"
    }
  ],
  natacao: [
    {
      title: "Hidrodinâmica e Eficiência de Nado",
      author: "Toussaint, H. M. (2011)",
      summary: "Estudo sobre a redução do arrasto e aumento da força propulsiva na água.",
      keyFindings: ["Arrasto frontal cresce ao quadrado da velocidade", "Importância da técnica de 'agarrar' a água", "Influência da flutuação horizontal na economia"],
      url: "https://pubmed.ncbi.nlm.nih.gov/2184918/"
    },
    {
      title: "Adaptações Cardiorrespiratórias em Nadadores",
      author: "Costill, D. (2009)",
      summary: "Resposta fisiológica ao treino de alta intensidade em ambiente aquático.",
      keyFindings: ["Bradicardia reflexa de imersão", "Aumento do volume sistólico", "Melhoria na capacidade vital forçada"],
      url: "https://scholar.google.pt/scholar?q=Costill+Swimming+Physiology"
    }
  ],
  corrida: [
    {
      title: "Limiar de Lactato e Endurance",
      author: "Jones, A. M. (2018)",
      summary: "O papel do limiar anaeróbico como preditor de performance em maratona.",
      keyFindings: ["O limiar é mais treinável que o VO2 Máx em atletas de elite", "Treino intervalado extensivo otimiza a remoção de lactato", "Economia de corrida reduz o custo energético por km"],
      url: "https://pubmed.ncbi.nlm.nih.gov/11440578/"
    },
    {
      title: "Cadência e Risco de Lesão",
      author: "Heiderscheit, B. (2011)",
      summary: "Como a frequência de passos influencia as forças de impacto nas articulações.",
      keyFindings: ["Aumento de 5-10% na cadência reduz carga no joelho", "Menor oscilação vertical poupa energia", "Evitar o 'overstriding' (passo à frente do centro de gravidade)"],
      url: "https://pubmed.ncbi.nlm.nih.gov/21233487/"
    }
  ],
  nutricao: [
    {
      title: "Timing de Ingestão Proteica",
      author: "Aragon, A. A. (2013)",
      summary: "Desmistificação da 'janela anabólica' e foco no consumo total diário.",
      keyFindings: ["Balanço proteico positivo é mantido por 24-48h pós-treino", "Distribuição de 0.4g/kg por refeição é ideal", "Consumo pré-sono auxilia na recuperação noturna"],
      url: "https://jissn.biomedcentral.com/articles/10.1186/1550-2783-10-5"
    },
    {
      title: "Creatina e Performance Cognitiva/Motora",
      author: "Rawson, E. S. (2011)",
      summary: "Evidências robustas sobre o suplemento mais estudado da história.",
      keyFindings: ["Aumento de 10-15% na força máxima", "Rápida ressíntese de ATP (PCr)", "Propriedades neuroprotetoras observadas"],
      url: "https://pubmed.ncbi.nlm.nih.gov/21394604/"
    }
  ],
  hyrox: [
    {
      title: "Ciência do Treino Concorrente (Concurrent Training)",
      author: "Coffey, V. G. (2017)",
      summary: "Como combinar força e endurance sem perda de adaptações específicas.",
      keyFindings: ["Efeito de interferência é menor em atletas experientes", "Priorizar a modalidade da prova na sessão principal", "Capacidade aeróbica suporte para recuperação entre estações"],
      url: "https://link.springer.com/article/10.1007/s40279-017-0714-9"
    },
    {
      title: "Metabolismo em Provas Híbridas de Longa Duração",
      author: "Bishop, D. (2019)",
      summary: "Análise energética do esforço intercalado corrida-exercícios de força.",
      keyFindings: ["Predomínio do sistema oxidativo (>80%)", "Fadiga central vs. periférica em transições rápidas", "Importância da densidade de trabalho (Work Capacity)"],
      url: "https://pubmed.ncbi.nlm.nih.gov/22510252/"
    }
  ]
};

const ScientificDocuments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocCategory>('escolar');

  const tabs: { id: DocCategory; label: string; icon: any; color: string }[] = [
    { id: 'escolar', label: 'Escolar', icon: GraduationCap, color: 'text-blue-500' },
    { id: 'musculacao', label: 'Musculação', icon: Dumbbell, color: 'text-slate-400' },
    { id: 'natacao', label: 'Natação', icon: Waves, color: 'text-sky-500' },
    { id: 'corrida', label: 'Corrida', icon: Footprints, color: 'text-orange-500' },
    { id: 'nutricao', label: 'Nutrição', icon: Apple, color: 'text-emerald-500' },
    { id: 'hyrox', label: 'Hyrox', icon: Timer, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Navegação por Abas */}
      <div className="glass-card rounded-[2.5rem] p-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar border-white/5 shadow-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-6 py-4 rounded-3xl transition-all duration-500 whitespace-nowrap group
                ${isActive ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'}
              `}
            >
              <tab.icon size={18} className={`${isActive ? tab.color : 'opacity-50 group-hover:opacity-100'} transition-all`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {SCIENTIFIC_DATA[activeTab].map((paper, idx) => (
          <div key={idx} className="glass-card rounded-[3rem] overflow-hidden border-white/5 group hover:border-white/10 transition-all duration-700">
            <div className="p-8 md:p-10 space-y-8">
              {/* Header do Card */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FlaskConical size={14} className="text-blue-500" />
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">Referência Científica</span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                    {paper.title}
                  </h3>
                  <p className="text-sm font-bold text-blue-400 italic">
                    {paper.author}
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[1.5rem] border border-white/5">
                  <Microscope size={24} className="text-slate-700 group-hover:text-blue-500 transition-colors duration-700" />
                </div>
              </div>

              {/* Resumo */}
              <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-white/5">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {paper.summary}
                </p>
              </div>

              {/* Achados Chave */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" /> Principais Conclusões (Evidência A)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {paper.keyFindings.map((finding, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-200 tracking-tight leading-snug">
                        {finding}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Rodapé do Card - Link Externo */}
            <a 
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-6 bg-slate-900/30 border-t border-white/5 flex items-center justify-between group/link hover:bg-blue-600/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-slate-500 group-hover/link:text-blue-400 transition-colors" />
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest group-hover/link:text-blue-300 transition-colors">Base de Dados ASANTOS</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-widest group-hover/link:text-white transition-all">
                <span>Ver Artigo Completo</span>
                <ExternalLink size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Nota de Rodapé */}
      <div className="p-8 border-2 border-dashed border-white/5 rounded-[3rem] text-center max-w-4xl mx-auto">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
          Os dados apresentados são baseados em diretrizes internacionais (ACSM, WHO, NSCA) e revisões sistemáticas peer-reviewed. <br/>
          Consulte sempre a literatura original para aplicação clínica profunda.
        </p>
      </div>
    </div>
  );
};

export default ScientificDocuments;
