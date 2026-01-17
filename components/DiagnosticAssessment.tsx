
import React, { useState } from 'react';
import { ClipboardCheck, Users, Activity, Download, CheckCircle2, Brain, Heart, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Cycle = '1c' | '2c' | '3c' | 'sec';

interface AssessmentDomain {
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
  bgColor: string;
}

interface CycleEvaluation {
  title: string;
  displayTitle: string;
  description: string;
  focus: string;
  domains: AssessmentDomain[];
}

const EVALUATION_DATA: Record<Cycle, CycleEvaluation> = {
  '1c': {
    title: '1º Ciclo',
    displayTitle: '1º CICLO (1º AO 4º ANO)',
    description: '1º Ciclo (Básico)',
    focus: 'Foco na mestria das Habilidades Motoras Fundamentais e consciência corporal.',
    domains: [
      { 
        name: 'PSICOMOTOR', 
        subtitle: '(PRÁTICO)',
        icon: <Activity size={20} />, 
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400/10',
        items: ['Locomoção (galope, salto, corrida)', 'Equilíbrio estático e dinâmico', 'Manipulação (lançar/receber)', 'Coordenação óculo-manual'] 
      },
      { 
        name: 'COGNITIVO', 
        subtitle: '(SABER)',
        icon: <Brain size={20} />, 
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        items: ['Identificar partes do corpo', 'Noções de espaço e tempo', 'Conhecer regras de segurança na aula'] 
      },
      { 
        name: 'ATITUDINAL', 
        subtitle: '(SER)',
        icon: <Heart size={20} />, 
        color: 'text-rose-400',
        bgColor: 'bg-rose-400/10',
        items: ['Respeito pelo material', 'Aceitação da derrota/vitória', 'Cooperação com colegas'] 
      }
    ]
  },
  '2c': {
    title: '2º Ciclo',
    displayTitle: '2º CICLO (5º E 6º ANO)',
    description: '2º Ciclo (Básico)',
    focus: 'Introdução à técnica desportiva básica, cooperação tática e prontidão física.',
    domains: [
      { 
        name: 'PSICOMOTOR', 
        subtitle: '(PRÁTICO)',
        icon: <Activity size={20} />, 
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400/10',
        items: ['Gesto técnico básico (Passe/Drible)', 'Posicionamento defensivo básico', 'Aptidão aeróbica inicial'] 
      },
      { 
        name: 'COGNITIVO', 
        subtitle: '(SABER)',
        icon: <Brain size={20} />, 
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        items: ['Regras básicas das modalidades', 'Importância do aquecimento', 'Higiene e saúde no desporto'] 
      },
      { 
        name: 'ATITUDINAL', 
        subtitle: '(SER)',
        icon: <Heart size={20} />, 
        color: 'text-rose-400',
        bgColor: 'bg-rose-400/10',
        items: ['Fair Play em competição', 'Auto-regulação emocional', 'Assiduidade e pontualidade'] 
      }
    ]
  },
  '3c': {
    title: '3º Ciclo',
    displayTitle: '3º CICLO (7º AO 9º ANO)',
    description: '3º Ciclo (Básico)',
    focus: 'Especialização motora, tática complexa e consciência crítica do esforço.',
    domains: [
      { 
        name: 'PSICOMOTOR', 
        subtitle: '(PRÁTICO)',
        icon: <Activity size={20} />, 
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400/10',
        items: ['Combinações táticas ofensivas', 'Técnicas especializadas', 'Controlo de intensidade de esforço'] 
      },
      { 
        name: 'COGNITIVO', 
        subtitle: '(SABER)',
        icon: <Brain size={20} />, 
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        items: ['Sistemas de Jogo (Voleibol/Futsal)', 'Conceitos de treino e fisiologia', 'Capacidade de Arbitragem'] 
      },
      { 
        name: 'ATITUDINAL', 
        subtitle: '(SER)',
        icon: <Heart size={20} />, 
        color: 'text-rose-400',
        bgColor: 'bg-rose-400/10',
        items: ['Liderança de equipas', 'Responsabilidade social e ética', 'Inclusão de pares com dificuldades'] 
      }
    ]
  },
  'sec': {
    title: 'Secundário',
    displayTitle: 'ENSINO SECUNDÁRIO',
    description: 'Secundário',
    focus: 'Autonomia na gestão da saúde, liderança e planeamento pessoal de treino.',
    domains: [
      { 
        name: 'PSICOMOTOR', 
        subtitle: '(PRÁTICO)',
        icon: <Activity size={20} />, 
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-400/10',
        items: ['Execução técnica autónoma', 'Gestão de volume e intensidade', 'Capacidade de organização de eventos'] 
      },
      { 
        name: 'COGNITIVO', 
        subtitle: '(SABER)',
        icon: <Brain size={20} />, 
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        items: ['Fisiologia avançada do esforço', 'Legislação desportiva e doping', 'Planeamento de vida saudável'] 
      },
      { 
        name: 'ATITUDINAL', 
        subtitle: '(SER)',
        icon: <Heart size={20} />, 
        color: 'text-rose-400',
        bgColor: 'bg-rose-400/10',
        items: ['Auto-avaliação e reflexão crítica', 'Empreendedorismo no desporto', 'Respeito pela diversidade'] 
      }
    ]
  }
};

const DiagnosticAssessment: React.FC = () => {
  const [activeCycle, setActiveCycle] = useState<Cycle>('1c');
  const [isGenerating, setIsGenerating] = useState(false);
  const currentData = EVALUATION_DATA[activeCycle];

  const downloadDiagnosticFile = async (cycle: Cycle) => {
    setIsGenerating(true);
    const data = EVALUATION_DATA[cycle];
    const cycleName = data.title;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.padding = '15mm';
    tempDiv.style.fontFamily = '"Helvetica", "Arial", sans-serif';
    tempDiv.style.color = '#000000';
    tempDiv.style.boxSizing = 'border-box';

    const htmlContent = `
      <div style="border: 2pt solid #020617; padding: 4pt; min-height: 275mm;">
        <div style="border: 0.5pt solid #000; padding: 15pt; height: 100%;">
          
          <!-- Cabeçalho Institucional -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20pt;">
            <tr>
              <td style="width: 70%;">
                <h1 style="margin: 0; font-size: 24pt; color: #1e4ed8; font-weight: 900; letter-spacing: -1pt;">ASANTOS DESPORTO</h1>
                <p style="margin: 0; font-size: 9pt; font-weight: 800; color: #64748b; text-transform: uppercase;">Unidade de Avaliação Pedagógica</p>
              </td>
              <td style="width: 30%; text-align: right;">
                <div style="border: 1pt solid #000; padding: 8pt; background: #f8fafc; display: inline-block; text-align: center;">
                  <span style="font-size: 11pt; font-weight: 900; display: block;">GRELHA DE AVALIAÇÃO</span>
                  <span style="font-size: 8pt; font-weight: 700; color: #334155;">DIAGNÓSTICA - ${cycle.toUpperCase()}</span>
                </div>
              </td>
            </tr>
          </table>

          <!-- Dados do Aluno e Turma -->
          <table style="width: 100%; border-collapse: collapse; font-size: 10pt; margin-bottom: 25pt;">
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt; width: 60%;" colspan="2"><b>Agrupamento/Escola:</b> __________________________________________________</td>
              <td style="border: 0.5pt solid #000; padding: 8pt; width: 40%;"><b>Data:</b> ____ / ____ / 202____</td>
            </tr>
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt;"><b>Turma:</b> _______________</td>
              <td style="border: 0.5pt solid #000; padding: 8pt;"><b>Nº Alunos:</b> __________</td>
              <td style="border: 0.5pt solid #000; padding: 8pt;"><b>Ciclo:</b> ${data.title}</td>
            </tr>
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt;" colspan="3"><b>Nome do Aluno:</b> ____________________________________________________________________</td>
            </tr>
          </table>

          <div style="background: #0f172a; color: #fff; padding: 8pt; font-size: 11pt; font-weight: 800; text-transform: uppercase; margin-bottom: 20pt;">
            Referenciais Técnicos e Critérios de Observação
          </div>

          <!-- Grelha de Domínios -->
          <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 25pt;">
            <thead>
              <tr style="background: #f1f5f9; text-align: center;">
                <th style="border: 1pt solid #000; padding: 10pt; width: 30%;">Domínio</th>
                <th style="border: 1pt solid #000; padding: 10pt; width: 55%;">Parâmetros / Habilidades</th>
                <th style="border: 1pt solid #000; padding: 10pt; width: 15%;">Avaliação</th>
              </tr>
            </thead>
            <tbody>
              ${data.domains.map(d => `
                <tr>
                  <td style="border: 0.5pt solid #000; padding: 12pt; text-align: center; vertical-align: middle;">
                    <b style="font-size: 11pt; display: block; margin-bottom: 4pt;">${d.name}</b>
                    <span style="font-size: 8pt; color: #64748b;">${d.subtitle}</span>
                  </td>
                  <td style="border: 0.5pt solid #000; padding: 12pt; vertical-align: top;">
                    <ul style="margin: 0; padding-left: 15pt;">
                      ${d.items.map(item => `<li style="margin-bottom: 6pt;">${item}</li>`).join('')}
                    </ul>
                  </td>
                  <td style="border: 0.5pt solid #000; padding: 12pt; text-align: center; vertical-align: middle;">
                    <div style="font-size: 8pt;">
                      [ ] Bom<br>
                      [ ] Suf.<br>
                      [ ] Insuf.
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Observações do Professor -->
          <div style="border: 1pt solid #000; padding: 12pt; font-size: 9.5pt; flex-grow: 1;">
            <b style="text-transform: uppercase; border-bottom: 1pt solid #000; padding-bottom: 4pt; display: inline-block; margin-bottom: 8pt;">Parecer Pedagógico / Notas de Campo:</b>
            <div style="height: 60pt; border-bottom: 0.5pt dashed #cbd5e1; margin-bottom: 10pt;"></div>
            <div style="height: 60pt; border-bottom: 0.5pt dashed #cbd5e1;"></div>
          </div>

          <!-- Assinaturas -->
          <table style="width: 100%; border-collapse: collapse; margin-top: 30pt; font-size: 9pt;">
            <tr>
              <td style="width: 45%; text-align: center;">
                <div style="width: 70%; border-top: 0.5pt solid #000; margin: 30pt auto 5pt auto;"></div>
                Assinatura do Avaliador
              </td>
              <td style="width: 10%;">&nbsp;</td>
              <td style="width: 45%; text-align: center;">
                <div style="width: 70%; border-top: 0.5pt solid #000; margin: 30pt auto 5pt auto;"></div>
                Coordenação / Direção
              </td>
            </tr>
          </table>

          <div style="margin-top: 30pt; text-align: center; font-size: 7.5pt; color: #94a3b8; font-weight: 700; text-transform: uppercase; border-top: 0.5pt dashed #cbd5e1; padding-top: 10pt;">
            GERADO EM ALTA RESOLUÇÃO VIA PLATAFORMA ASANTOS DESPORTO - QUALIDADE ULTRA HD v5.0
          </div>
        </div>
      </div>
    `;

    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, { 
        scale: 5, // Ultra HD Quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1000
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`GRELHA_DIAGNOSTICA_${cycle.toUpperCase()}_HD.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden animate-fade-in-up shadow-2xl relative border-white/5">
      {/* Top Header - Avaliação Diagnóstica */}
      <div className="p-8 border-b border-white/5 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl rotate-3">
            <ClipboardCheck size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">AVALIAÇÃO DIAGNÓSTICA</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">AFERIÇÃO DE PONTO DE PARTIDA</p>
          </div>
        </div>
        
        {/* Cycle Tabs Navigation */}
        <div className="flex bg-slate-900/60 p-1 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
          {(Object.keys(EVALUATION_DATA) as Cycle[]).map((cycle) => (
            <button 
              key={cycle} 
              onClick={() => setActiveCycle(cycle)} 
              className={`px-5 py-2 rounded-full text-[10px] font-black transition-all uppercase tracking-widest ${
                activeCycle === cycle 
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cycle === 'sec' ? 'Secundário' : cycle.replace('c', 'º Ciclo')}
            </button>
          ))}
        </div>
      </div>

      <div className="p-10 space-y-10">
        {/* Main Info Card */}
        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-emerald-500/20 transition-all duration-500">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-emerald-500/10 rounded-[1.5rem] text-emerald-500 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
              <Users size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                {currentData.displayTitle}
              </h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider italic">
                {currentData.focus}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => downloadDiagnosticFile(activeCycle)} 
            disabled={isGenerating}
            className="flex flex-col items-center justify-center gap-1 min-w-[160px] h-[60px] bg-white text-slate-950 rounded-[1rem] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>
                <span className="text-[11px] leading-none">BAIXAR</span>
                <span className="text-[13px] leading-none">GRELHA</span>
              </>
            )}
          </button>
        </div>

        {/* Three Columns Domains Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentData.domains.map((domain, idx) => (
            <div key={idx} className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/10 flex flex-col hover:border-white/20 transition-all group/card">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${domain.bgColor} ${domain.color} group-hover/card:scale-110 transition-transform`}>
                  {domain.icon}
                </div>
                <div>
                  <h5 className="text-[12px] font-black uppercase tracking-widest text-white leading-none mb-1">
                    {domain.name}
                  </h5>
                  <span className={`text-[10px] font-bold ${domain.color} tracking-tighter`}>
                    {domain.subtitle}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 flex-grow">
                {domain.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-3 group/item">
                    <CheckCircle2 size={14} className={`${domain.color} shrink-0 mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                    <span className="text-[11px] text-slate-400 font-bold leading-relaxed tracking-tight group-hover/item:text-slate-200 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metadata Tags */}
      <div className="p-6 bg-slate-950/60 border-t border-white/5 flex flex-wrap items-center justify-center gap-8">
         <div className="flex items-center gap-2">
           <Activity size={14} className="text-emerald-500" />
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">AFERIÇÃO TÉCNICA</span>
         </div>
         <div className="flex items-center gap-2">
           <Brain size={14} className="text-blue-500" />
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">MAPA COGNITIVO</span>
         </div>
         <div className="flex items-center gap-2">
           <Heart size={14} className="text-rose-500" />
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">INDICADORES ATITUDINAIS</span>
         </div>
         <div className="flex items-center gap-2">
           <Download size={14} className="text-slate-500" />
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ULTRA HD EXPORT v5.0</span>
         </div>
      </div>
    </div>
  );
};

export default DiagnosticAssessment;
