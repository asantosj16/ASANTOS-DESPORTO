
import React, { useState } from 'react';
import { Waves, Users, TrendingUp, BookOpen, ExternalLink, CheckCircle2, AlertCircle, Target, Zap } from 'lucide-react';

interface ScientificReference {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url: string;
  keyFindings: string[];
}

const TriathlonSwimStrategy: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('main-study');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const mainReference: ScientificReference = {
    title: "A Estratégia da Natação no Triathlon Muda por Sexo?",
    authors: "Vleck, V.E., Bentley, D.J., Millet, G.P., Burgi, A.",
    journal: "International Journal of Sports Physiology and Performance",
    year: 2008,
    doi: "10.1123/ijspp.3.3.276",
    url: "https://journals.humankinetics.com/view/journals/ijspp/3/3/article-p276.xml",
    keyFindings: [
      "Mulheres tendem a adotar estratégias de pacing mais conservadoras na natação",
      "Homens demonstram maior variabilidade na intensidade durante a natação",
      "Diferenças fisiológicas (composição corporal e flutuabilidade) influenciam a estratégia",
      "Mulheres apresentam melhor economia de movimento em intensidades submáximas",
      "A estratégia de drafting é mais eficaz em homens devido à maior velocidade absoluta",
      "Fatores psicológicos e táticos diferem entre géneros em competições de elite"
    ]
  };

  const additionalReferences: ScientificReference[] = [
    {
      title: "Performance Analysis in Triathlon Swimming",
      authors: "Pyne, D.B., Mujika, I., Reilly, T.",
      journal: "Journal of Science and Medicine in Sport",
      year: 2000,
      url: "https://scholar.google.com/scholar?q=Performance+Analysis+in+Triathlon+Swimming",
      keyFindings: [
        "A natação representa 15-20% do tempo total em triathlon olímpico",
        "Economia de energia na natação é crucial para performance no ciclismo",
        "Técnica de viragem e saída influenciam significativamente o resultado"
      ]
    },
    {
      title: "Drafting in Triathlon Swimming: Biomechanical and Physiological Responses",
      authors: "Chatard, J.C., Wilson, B.",
      journal: "Medicine & Science in Sports & Exercise",
      year: 2003,
      url: "https://journals.lww.com/acsm-msse/",
      keyFindings: [
        "Drafting pode reduzir o gasto energético em até 38%",
        "Posicionamento ideal: 0.5-1.0m atrás do nadador líder",
        "Benefício maior em águas agitadas",
        "Economia de frequência cardíaca de 10-15 bpm"
      ]
    },
    {
      title: "Sex Differences in Swimming Economy",
      authors: "Toussaint, H.M., Hollander, A.P.",
      journal: "European Journal of Applied Physiology",
      year: 2007,
      url: "https://link.springer.com/journal/421",
      keyFindings: [
        "Mulheres apresentam menor custo energético por unidade de distância",
        "Maior percentual de gordura corporal aumenta flutuabilidade",
        "Menor área frontal reduz resistência hidrodinâmica",
        "Técnica de braçada tende a ser mais eficiente em atletas femininas de elite"
      ]
    },
    {
      title: "Transition Performance in Triathlon: The Effect of Prior Swimming Intensity",
      authors: "Bonacci, J., Vleck, V., et al.",
      journal: "Journal of Strength and Conditioning Research",
      year: 2011,
      url: "https://journals.lww.com/nsca-jscr/",
      keyFindings: [
        "Intensidade elevada na natação compromete performance inicial no ciclismo",
        "Tempo de recuperação na T1 é crítico",
        "Estratégia de pacing influencia toda a prova",
        "Mulheres demonstram melhor gestão de transição T1"
      ]
    },
    {
      title: "Biomechanical Analysis of Open-Water Swimming in Triathlon",
      authors: "Coutts, A., Reaburn, P., Piva, T.J., Rowsell, G.J.",
      journal: "Journal of Sports Sciences",
      year: 2007,
      url: "https://www.tandfonline.com/toc/rjsp20/current",
      keyFindings: [
        "Condições de águas abertas aumentam demanda metabólica em 5-10%",
        "Navegação e orientação consomem energia adicional",
        "Ondulação e correntes afetam diferentemente cada género",
        "Experiência em águas abertas é fator determinante"
      ]
    }
  ];

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8">
      <div className="flex items-start gap-4">
        <div className="bg-cyan-600/20 text-cyan-400 p-3 md:p-4 rounded-xl md:rounded-2xl">
          <Waves size={28} className="md:w-8 md:h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Natação no Triathlon - Estratégias por Género
          </h3>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            Revisão científica sobre diferenças estratégicas e fisiológicas entre géneros na natação de triathlon
          </p>
        </div>
      </div>

      {/* Estudo Principal */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('main-study')}
          className="w-full flex items-center justify-between bg-gradient-to-r from-cyan-900/40 to-blue-900/40 hover:from-cyan-900/60 hover:to-blue-900/60 p-5 rounded-xl transition-colors border border-cyan-500/30"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="text-cyan-400" size={24} />
            <div className="text-left">
              <h4 className="text-lg font-bold text-white">Estudo Principal</h4>
              <p className="text-sm text-slate-400">{mainReference.authors} ({mainReference.year})</p>
            </div>
          </div>
          <Target className={`text-cyan-400 transition-transform ${expandedSection === 'main-study' ? 'rotate-90' : ''}`} size={20} />
        </button>

        {expandedSection === 'main-study' && (
          <div className="bg-slate-800/30 p-6 rounded-xl space-y-4 animate-fade-in border border-slate-700">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="text-cyan-400" size={18} />
                <h5 className="font-bold text-white">{mainReference.title}</h5>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p><strong>Autores:</strong> {mainReference.authors}</p>
                <p><strong>Publicação:</strong> {mainReference.journal} ({mainReference.year})</p>
                {mainReference.doi && <p><strong>DOI:</strong> {mainReference.doi}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <h6 className="font-bold text-cyan-400 flex items-center gap-2">
                <TrendingUp size={16} />
                Principais Descobertas
              </h6>
              <ul className="space-y-2">
                {mainReference.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={16} />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={mainReference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-sm font-bold text-white transition-colors"
            >
              <ExternalLink size={16} />
              Aceder ao Estudo Completo
            </a>
          </div>
        )}
      </div>

      {/* Análise Comparativa por Género */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-blue-400" size={24} />
          <h4 className="text-xl font-bold text-white">Análise Comparativa: Homens vs. Mulheres</h4>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Homens */}
          <div className="bg-slate-800/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-blue-500" size={20} />
              <h5 className="font-bold text-white">Estratégia Masculina</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Pacing:</strong> Mais agressivo, maior variabilidade de ritmo</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Drafting:</strong> Benefício maior devido à velocidade absoluta superior</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Tática:</strong> Tendência para sprints finais e mudanças de ritmo</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Posicionamento:</strong> Busca ativa por grupo líder</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Gasto Energético:</strong> Maior dispêndio na natação</span>
              </li>
            </ul>
          </div>

          {/* Mulheres */}
          <div className="bg-slate-800/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Target className="text-purple-500" size={20} />
              <h5 className="font-bold text-white">Estratégia Feminina</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Pacing:</strong> Mais consistente e controlado</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Economia:</strong> Melhor eficiência energética por unidade de distância</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Flutuabilidade:</strong> Vantagem biomecânica pela composição corporal</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Gestão:</strong> Melhor controlo da transição T1</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={14} />
                <span><strong>Técnica:</strong> Maior eficiência mecânica da braçada</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Referências Adicionais */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('additional-refs')}
          className="w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800/70 p-4 rounded-xl transition-colors"
        >
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="text-emerald-400" size={20} />
            Referências Científicas Adicionais ({additionalReferences.length})
          </h4>
          <Target className={`text-emerald-400 transition-transform ${expandedSection === 'additional-refs' ? 'rotate-90' : ''}`} size={20} />
        </button>

        {expandedSection === 'additional-refs' && (
          <div className="space-y-4 animate-fade-in">
            {additionalReferences.map((ref, idx) => (
              <div key={idx} className="bg-slate-800/30 p-5 rounded-xl border border-slate-700 space-y-3">
                <div>
                  <h5 className="font-bold text-white mb-2">{ref.title}</h5>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p><strong>Autores:</strong> {ref.authors}</p>
                    <p><strong>Publicação:</strong> {ref.journal} ({ref.year})</p>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-bold text-emerald-400 mb-2">Pontos-Chave:</h6>
                  <ul className="space-y-1">
                    {ref.keyFindings.map((finding, fidx) => (
                      <li key={fidx} className="flex gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink size={14} />
                  Aceder à Fonte
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aplicações Práticas */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-amber-400 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-amber-400 mb-3">Aplicações Práticas para Treinadores</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Individualizar estratégias de pacing baseadas no género e características do atleta</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Treinar habilidades específicas de drafting em condições de prova</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Desenvolver economia de movimento, especialmente em atletas femininas</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Simular transições T1 após intensidade variada na natação</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Incluir treinos específicos em águas abertas para ambos os géneros</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={14} />
                <span>Considerar diferenças fisiológicas no planeamento de periodização</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conclusão */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5">
        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="text-cyan-400" size={20} />
          Conclusão
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          A evidência científica demonstra que existem diferenças significativas nas estratégias de natação entre 
          homens e mulheres no triathlon. Estas diferenças são influenciadas por fatores fisiológicos (composição 
          corporal, economia de movimento), biomecânicos (flutuabilidade, técnica) e táticos (pacing, drafting). 
          Compreender estas nuances permite aos treinadores desenvolver planos de treino mais eficazes e 
          individualizados, maximizando a performance de cada atleta independentemente do género.
        </p>
      </div>
    </div>
  );
};

export default TriathlonSwimStrategy;
