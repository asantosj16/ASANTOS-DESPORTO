
import React, { useState } from 'react';
import { Download, BookOpen, Layout, GraduationCap, CheckCircle2, Timer, Target, FileText, Users, MapPin, ClipboardList, Info, Award, Loader2, ChevronRight, ClipboardCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type PlanningTab = 'aula' | 'referencial';
type Cycle = '1c' | '2c' | '3c' | 'sec';

const CYCLE_LABELS: Record<Cycle, string> = {
  '1c': '1º Ciclo (Básico)',
  '2c': '2º Ciclo (Básico)',
  '3c': '3º Ciclo (Básico)',
  'sec': 'Secundário'
};

interface LessonContent {
  theme: string;
  unit: string;
  essentials: string[];
  initial: { description: string; duration: string; materials: string; organization: string };
  fundamental: { description: string; duration: string; materials: string; organization: string };
  final: { description: string; duration: string; materials: string; organization: string };
}

// Dados de Avaliação Diagnóstica integrados
const EVALUATION_DATA: Record<Cycle, { domains: string[], tools: string[], criteria: string[] }> = {
  '1c': {
    domains: ['Psicomotor', 'Cognitivo', 'Atitudinal'],
    tools: ['Grelhas de Observação', 'TGMD-3 (Ulrich)', 'Protocolos Lúdicos'],
    criteria: ['Locomoção e Equilíbrio', 'Manipulação de Objetos', 'Cooperação e Regras']
  },
  '2c': {
    domains: ['Técnico-Tático', 'Condição Física', 'Social'],
    tools: ['FITescola', 'Checklists Técnicos', 'Torneios Reduzidos'],
    criteria: ['Habilidades Básicas de Nado/Jogo', 'Resistência Cardio', 'Fair Play']
  },
  '3c': {
    domains: ['Especialização', 'Análise Tática', 'Autonomia'],
    tools: ['Protocolos Específicos', 'Portefólios', 'Auto-avaliação'],
    criteria: ['Sistemas de Jogo 6x6', 'Gestão do Esforço', 'Arbitragem']
  },
  'sec': {
    domains: ['Gestão Pessoal', 'Performance', 'Cidadania'],
    tools: ['Projetos Pessoais', 'Teste de Cooper', 'Questionários'],
    criteria: ['Planeamento Autónomo', 'Análise Crítica', 'Liderança de Grupos']
  }
};

const DGE_CURRICULUM_DATA: Record<Cycle, { domains: string[], objectives: string[] }> = {
  '1c': {
    domains: ['Deslocamentos e Equilíbrios', 'Perícia e Manipulação', 'Jogos', 'Ginástica', 'Atividades Rítmicas'],
    objectives: ['Desenvolvimento da mestria motora', 'Cooperação em situações de jogo', 'Consciência do corpo e saúde']
  },
  '2c': {
    domains: ['Jogos Desportivos Coletivos', 'Ginástica', 'Atletismo', 'Patinagem', 'Atividades de Raquetes', 'Aptidão Física'],
    objectives: ['Domínio de técnicas fundamentais', 'Compreensão tática básica', 'Monitorização da condição física']
  },
  '3c': {
    domains: ['Basquetebol/Voleibol/Futebol', 'Ginástica Artística/Solo', 'Atletismo', 'Dança', 'Orientação'],
    objectives: ['Especialização técnica e tática', 'Liderança e arbitragem', 'Análise crítica da performance']
  },
  'sec': {
    domains: ['Atividades Físicas de Opção', 'Projeto Individual de Aptidão Física', 'Organização de Atividades'],
    objectives: ['Autonomia na gestão da saúde', 'Liderança de grupos e projetos', 'Especialização em modalidades']
  }
};

const CYCLE_LESSON_CONTENT: Record<Cycle, LessonContent> = {
  '1c': {
    theme: 'Habilidades Motoras e Percepção Espacial',
    unit: 'Perícia e Manipulação / Jogos Pré-Desportivos',
    essentials: ['Locomoção e equilíbrio (DGE-AE)', 'Cooperação em jogo (Perfil do Aluno)', 'Alterações fisiológicas pós-esforço'],
    initial: { duration: '10 min', description: 'Ativação Lúdica: "O Mestre Manda" com variações. Mobilização articular global.', materials: 'Coletes, Apito.', organization: 'Alunos em círculo.' },
    fundamental: { duration: '30 min', description: 'Circuito DGE: 1. Slalom; 2. Salto barreiras; 3. Alvo; 4. Banco sueco. Jogo de perseguição.', materials: 'Cones, Bolas, Banco sueco.', organization: 'Grupos de 4 alunos.' },
    final: { duration: '5 min', description: 'Retorno à Calma: Controlo respiratório. Reflexão sobre material e arrumação.', materials: 'Nenhum.', organization: 'Sentados em semicírculo.' }
  },
  '2c': {
    theme: 'Basquetebol e Ginástica de Solo',
    unit: 'Jogos Desportivos Coletivos / Atividades Rítmicas',
    essentials: ['Drible e passe de peito (AE)', 'Rolamento à frente (AE-Ginástica)', 'Princípios 3x3'],
    initial: { duration: '10 min', description: 'Aquecimento: Drible livre. Paragem em tempos. Estiramentos dinâmicos.', materials: 'Bolas, Cones.', organization: 'Espaço livre.' },
    fundamental: { duration: '35 min', description: 'Progressão: 1. Pares passe; 2. Slalom drible; 3. 2x1. Jogo 3x3.', materials: 'Bolas, Coletes.', organization: 'Pares/Trios.' },
    final: { duration: '5 min', description: 'Balanço: Violações técnicas. Higiene pessoal.', materials: 'Nenhum.', organization: 'Centro do campo.' }
  },
  '3c': {
    theme: 'Voleibol e Condição Física',
    unit: 'Jogos Desportivos / Aptidão Física',
    essentials: ['Serviço técnico (DGE)', 'Sistema "W" na receção', 'Análise de FC'],
    initial: { duration: '15 min', description: 'Aquecimento: Deslocamentos de defesa. Toque/manchete em pares.', materials: 'Rede, Bolas.', organization: 'Lados da rede.' },
    fundamental: { duration: '30 min', description: 'C1: Receção/Levantamento/Ataque. Rotação. Jogo 6x6.', materials: 'Bolas, Rede.', organization: 'Sextetos.' },
    final: { duration: '5 min', description: 'Feedback: Análise de rotação. Alongamentos.', materials: 'Fichas.', organization: 'Dispersos.' }
  },
  'sec': {
    theme: 'Gestão da Saúde Desportiva',
    unit: 'Plano Individual / Atletismo',
    essentials: ['Aquecimento autónomo (AE)', 'Relação Atividade/Bem-estar', 'Arbitragem e Organização'],
    initial: { duration: '15 min', description: 'Autónomo: Gestão individual da ativação.', materials: 'Cronómetros.', organization: 'Gestão autónoma.' },
    fundamental: { duration: '40 min', description: 'Estações HIIT e Torneio Badminton auto-arbitrado.', materials: 'Raquetes, Monitores FC.', organization: 'Estações.' },
    final: { duration: '5 min', description: 'Reflexão: Supercompensação. Arrumação.', materials: 'Diários.', organization: 'Reunião final.' }
  }
};

const LessonPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanningTab>('aula');
  const [selectedCycle, setSelectedCycle] = useState<Cycle>('1c');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentContent = CYCLE_LESSON_CONTENT[selectedCycle];
  const curriculumInfo = DGE_CURRICULUM_DATA[selectedCycle];
  const diagnosticInfo = EVALUATION_DATA[selectedCycle];

  const downloadPDF = async (type: 'aula' | 'diagnostica') => {
    setIsGenerating(true);
    const cycleLabel = CYCLE_LABELS[selectedCycle];
    const title = type === 'aula' ? `Plano de Aula - ${cycleLabel}` : `Guia de Avaliação Diagnóstica - ${cycleLabel}`;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.padding = '15mm';
    tempDiv.style.fontFamily = '"Helvetica", "Arial", sans-serif';
    tempDiv.style.color = '#000000';
    tempDiv.style.boxSizing = 'border-box';

    const htmlContent = type === 'aula' ? `
      <div style="border: 2pt solid #000; padding: 4pt; min-height: 260mm;">
        <div style="border: 0.5pt solid #000; padding: 12pt; height: 100%;">
          <!-- Header -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15pt;">
            <tr>
              <td>
                <h1 style="margin: 0; font-size: 26pt; color: #1e4ed8; font-weight: 900; letter-spacing: -1.5pt;">ASANTOS DESPORTO</h1>
                <p style="margin: 0; font-size: 8pt; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 2pt;">Education Excellence Unit</p>
              </td>
              <td style="text-align: right;">
                <div style="border: 1.5pt solid #000; padding: 6pt; background: #f8fafc; display: inline-block;">
                  <span style="font-size: 12pt; font-weight: 900;">PLANO DE AULA</span><br>
                  <span style="font-size: 7pt; font-weight: 700;">REF: DGE-EF-${selectedCycle.toUpperCase()}</span>
                </div>
              </td>
            </tr>
          </table>

          <!-- Info -->
          <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 15pt;">
            <tr>
              <td style="border: 0.5pt solid #000; padding: 6pt; width: 50%;"><b>Escola:</b> __________________________________</td>
              <td style="border: 0.5pt solid #000; padding: 6pt; width: 25%;"><b>Turma:</b> __________</td>
              <td style="border: 0.5pt solid #000; padding: 6pt; width: 25%;"><b>Data:</b> ___/___/___</td>
            </tr>
          </table>

          <!-- Unit -->
          <div style="background: #1e293b; color: #fff; padding: 6pt; font-size: 10pt; font-weight: 800; text-transform: uppercase; margin-bottom: 0;">
            Unidade: ${currentContent.unit}
          </div>
          <div style="border: 0.5pt solid #000; border-top: 0; padding: 8pt; font-size: 9pt; margin-bottom: 15pt;">
            <b>Aprendizagens Essenciais:</b><br>
            <ul style="margin: 4pt 0 0 0; padding-left: 12pt;">
              ${currentContent.essentials.map(e => `<li>${e}</li>`).join('')}
            </ul>
          </div>

          <!-- Diagnostic Section (Nova) -->
          <div style="background: #f1f5f9; border: 0.5pt solid #000; padding: 6pt; font-size: 9pt; margin-bottom: 15pt;">
            <b style="color: #059669; text-transform: uppercase;">Critérios de Avaliação Diagnóstica Relacionados:</b><br>
            <span style="font-size: 8pt; color: #475569;">${diagnosticInfo.criteria.join(' | ')}</span>
          </div>

          <!-- Body -->
          <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 15pt;">
            <tr style="background: #e2e8f0; font-weight: 900; text-align: center;">
              <td style="border: 1pt solid #000; padding: 6pt; width: 15%;">Fase</td>
              <td style="border: 1pt solid #000; padding: 6pt; width: 60%;">Atividades</td>
              <td style="border: 1pt solid #000; padding: 6pt; width: 25%;">Recursos</td>
            </tr>
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt; text-align: center;"><b>INICIAL</b><br>${currentContent.initial.duration}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt;">${currentContent.initial.description}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt; font-size: 8pt;">${currentContent.initial.materials}<br><b>Org:</b> ${currentContent.initial.organization}</td>
            </tr>
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt; text-align: center;"><b>FUNDAMENTAL</b><br>${currentContent.fundamental.duration}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt;">${currentContent.fundamental.description}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt; font-size: 8pt;">${currentContent.fundamental.materials}<br><b>Org:</b> ${currentContent.fundamental.organization}</td>
            </tr>
            <tr>
              <td style="border: 0.5pt solid #000; padding: 8pt; text-align: center;"><b>FINAL</b><br>${currentContent.final.duration}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt;">${currentContent.final.description}</td>
              <td style="border: 0.5pt solid #000; padding: 8pt; font-size: 8pt;">${currentContent.final.materials}<br><b>Org:</b> ${currentContent.final.organization}</td>
            </tr>
          </table>

          <!-- Obs -->
          <div style="border: 1pt solid #000; padding: 8pt; font-size: 8pt; flex-grow: 1;">
            <b>OBSERVAÇÕES PEDAGÓGICAS / AVALIAÇÃO DA AULA:</b><br><br><br>
          </div>

          <!-- Footer -->
          <div style="margin-top: 20pt; text-align: center; font-size: 7pt; color: #94a3b8; border-top: 0.5pt dashed #cbd5e1; padding-top: 6pt;">
            DOCUMENTO TÉCNICO ASANTOS DESPORTO - REFERENCIAL CURRICULAR DGE PORTUGAL - QUALIDADE ULTRA HD
          </div>
        </div>
      </div>
    ` : `
      <div style="border: 2pt solid #059669; padding: 4pt; min-height: 260mm;">
        <div style="border: 0.5pt solid #000; padding: 12pt; height: 100%;">
          <h1 style="color: #059669; font-size: 20pt; font-weight: 900; text-align: center; margin-bottom: 20pt;">REFERENCIAL DE AVALIAÇÃO DIAGNÓSTICA</h1>
          <p style="text-align: center; font-weight: bold; margin-bottom: 30pt;">Ciclo: ${cycleLabel}</p>

          <div style="margin-bottom: 20pt;">
            <h3 style="background: #059669; color: #fff; padding: 6pt; font-size: 11pt;">DOMÍNIOS DE AVALIAÇÃO</h3>
            <ul style="padding-top: 10pt;">
              ${diagnosticInfo.domains.map(d => `<li style="margin-bottom: 5pt; font-weight: bold;">${d}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 20pt;">
            <h3 style="background: #1e4ed8; color: #fff; padding: 6pt; font-size: 11pt;">INSTRUMENTOS E FERRAMENTAS</h3>
            <ul style="padding-top: 10pt;">
              ${diagnosticInfo.tools.map(t => `<li style="margin-bottom: 5pt;">${t}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 20pt;">
            <h3 style="background: #475569; color: #fff; padding: 6pt; font-size: 11pt;">CRITÉRIOS DE SUCESSO</h3>
            <ul style="padding-top: 10pt;">
              ${diagnosticInfo.criteria.map(c => `<li style="margin-bottom: 5pt;">${c}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, { 
        scale: 5, // Ultra HD
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`${title.replace(/\s+/g, '_')}_UltraHD.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card rounded-[2rem] overflow-hidden animate-fade-in-up shadow-2xl">
      <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl rotate-3">
            <Layout size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Núcleo de Planeamento</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Gestão Curricular & Diagnóstica</p>
          </div>
        </div>
        
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button onClick={() => setActiveTab('aula')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'aula' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Plano de Aula</button>
          <button onClick={() => setActiveTab('referencial')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'referencial' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Referencial & Diagnóstico</button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(CYCLE_LABELS) as Cycle[]).map((cycle) => (
            <button key={cycle} onClick={() => setSelectedCycle(cycle)} className={`flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-300 ${selectedCycle === cycle ? 'bg-blue-600 border-blue-500 text-white shadow-xl scale-105' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}>
              <GraduationCap size={16} />
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{CYCLE_LABELS[cycle].split('(')[0]}</span>
            </button>
          ))}
        </div>

        {activeTab === 'aula' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-emerald-600/10 p-6 rounded-3xl border border-emerald-500/20">
                 <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <ClipboardCheck size={16} /> Foco Diagnóstico do Ciclo
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {diagnosticInfo.criteria.map((c, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-900 rounded-full text-[9px] font-bold text-slate-300 uppercase tracking-tight">{c}</span>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                 <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Target size={16} /> Aprendizagens Essenciais
                 </h4>
                 <ul className="space-y-3">
                   {currentContent.essentials.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                       <span className="text-xs text-slate-400 leading-relaxed font-medium">{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              <button 
                onClick={() => downloadPDF('aula')}
                disabled={isGenerating}
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                Baixar Plano Ultra HD
              </button>
            </div>

            <div className="lg:col-span-8 space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <FileText size={18} className="text-slate-600" />
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estrutura da Aula</h4>
               </div>
               <div className="space-y-3">
                  {[{ label: 'Inicial', time: currentContent.initial.duration, content: currentContent.initial.description, icon: Timer, color: 'text-emerald-500' },
                    { label: 'Fundamental', time: currentContent.fundamental.duration, content: currentContent.fundamental.description, icon: Layout, color: 'text-blue-500' },
                    { label: 'Final', time: currentContent.final.duration, content: currentContent.final.description, icon: Users, color: 'text-slate-500' }
                  ].map((phase, i) => (
                    <div key={i} className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 flex gap-5 items-start group hover:border-blue-900/30 transition-all">
                      <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform"><phase.icon className={phase.color} size={20} /></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{phase.label}</span>
                          <span className="text-[9px] font-black px-2 py-0.5 bg-slate-800 rounded-full text-blue-400">{phase.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{phase.content}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="bg-blue-600/10 p-8 rounded-[2.5rem] border border-blue-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-blue-500" size={24} />
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Domínios DGE</h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {curriculumInfo.domains.map((domain, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/60 rounded-2xl border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <span className="text-xs font-bold text-slate-200 uppercase tracking-tight">{domain}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-600/10 p-8 rounded-[2.5rem] border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardCheck className="text-emerald-500" size={24} />
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Referencial Diagnóstico</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Instrumentos:</span>
                    <p className="text-xs text-slate-300">{diagnosticInfo.tools.join(', ')}</p>
                  </div>
                  <button onClick={() => downloadPDF('diagnostica')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
                    <Download size={16} /> Baixar Guia de Avaliação
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-amber-600/10 p-8 rounded-[2.5rem] border border-amber-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-amber-500" size={24} />
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Perfil de Ciclo</h4>
                </div>
                <ul className="space-y-3">
                   {curriculumInfo.objectives.map((obj, i) => (
                     <li key={i} className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-2xl">
                       <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                       <span className="text-xs font-medium text-slate-400">{obj}</span>
                     </li>
                   ))}
                </ul>
              </div>

              <a href="https://www.dge.mec.pt/educacao-fisica" target="_blank" rel="noopener noreferrer" className="block w-full p-6 bg-slate-950 border border-slate-800 rounded-[2.5rem] hover:bg-slate-900 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform"><MapPin className="text-blue-500" size={20} /></div>
                    <div><h5 className="text-sm font-black text-white uppercase tracking-widest">Portal DGE Oficial</h5><p className="text-[10px] text-slate-500 font-bold uppercase">Portugal (ME)</p></div>
                  </div>
                  <ChevronRight className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-blue-600/5 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6">
         <div className="flex items-center gap-2"><MapPin size={12} className="text-blue-500" /><span className="text-[9px] font-black text-slate-600 uppercase">DGE PORTUGAL</span></div>
         <div className="flex items-center gap-2"><ClipboardCheck size={12} className="text-emerald-500" /><span className="text-[9px] font-black text-slate-600 uppercase">AVALIAÇÃO DIAGNÓSTICA</span></div>
         <div className="flex items-center gap-2"><Award size={12} className="text-amber-500" /><span className="text-[9px] font-black text-slate-600 uppercase">PERFIL DO ALUNO</span></div>
         <div className="flex items-center gap-2"><Info size={12} className="text-purple-500" /><span className="text-[9px] font-black text-slate-600 uppercase">ULTRA HD v5.0</span></div>
      </div>
    </div>
  );
};

export default LessonPlanning;
