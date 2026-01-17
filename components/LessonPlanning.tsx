
import React, { useState } from 'react';
import { Download, BookOpen, Layout, GraduationCap, CheckCircle2, Timer, Target, FileText, Users, MapPin, ClipboardList } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type PlanningTab = 'aula' | 'anual';
type Cycle = '1c' | '2c' | '3c' | 'sec';

const CYCLE_LABELS: Record<Cycle, string> = {
  '1c': '1º Ciclo (Ensino Básico)',
  '2c': '2º Ciclo (Ensino Básico)',
  '3c': '3º Ciclo (Ensino Básico)',
  'sec': 'Ensino Secundário'
};

interface LessonContent {
  theme: string;
  unit: string;
  essentials: string[];
  initial: { description: string; duration: string; materials: string; organization: string };
  fundamental: { description: string; duration: string; materials: string; organization: string };
  final: { description: string; duration: string; materials: string; organization: string };
}

const CYCLE_LESSON_CONTENT: Record<Cycle, LessonContent> = {
  '1c': {
    theme: 'Exploração de Habilidades Motoras e Percepção Espacial',
    unit: 'Perícia e Manipulação / Jogos Pré-Desportivos',
    essentials: [
      'Executar habilidades de locomoção e equilíbrio com controlo segmentar.',
      'Cooperar com os companheiros em situações de jogo respeitando as regras.',
      'Identificar as alterações fisiológicas básicas após o esforço.'
    ],
    initial: {
      duration: '10 min',
      description: 'Ativação Lúdica: "O Mestre Manda" com variações de deslocamentos (saltitar, correr para trás, quadrupédia). Mobilização articular global em círculo.',
      materials: 'Coletes, Apito.',
      organization: 'Alunos em círculo, professor ao centro.'
    },
    fundamental: {
      duration: '30 min',
      description: 'Circuito de Agilidade: 1. Slalom entre cones; 2. Salto sobre mini-barreiras; 3. Lançamento à baliza/alvo; 4. Equilíbrio em banco sueco. Jogo reduzido de perseguição.',
      materials: 'Cones, Bolas de borracha, Banco sueco, Arcos.',
      organization: 'Grupos de 4 alunos por estação.'
    },
    final: {
      duration: '5 min',
      description: 'Retorno à Calma: Jogo da "Câmara Lenta" focado no controlo respiratório. Reflexão sobre a importância do material e arrumação coletiva.',
      materials: 'Nenhum.',
      organization: 'Alunos sentados em semicírculo.'
    }
  },
  '2c': {
    theme: 'Introdução ao Basquetebol e Ginástica de Solo',
    unit: 'Jogos Desportivos Coletivos / Atividades Rítmicas',
    essentials: [
      'Executar o drible de progressão e o passe de peito com precisão.',
      'Realizar o rolamento à frente com apoio correto das mãos e queixo ao peito.',
      'Compreender os princípios básicos de ataque e defesa no jogo 3x3.'
    ],
    initial: {
      duration: '10 min',
      description: 'Aquecimento Específico: Drible livre em espaço delimitado. Ao sinal, paragem em 1 ou 2 tempos. Estiramentos dinâmicos de braços e pernas.',
      materials: 'Bolas de Basquetebol, Cones.',
      organization: 'Espaço livre, drible individual.'
    },
    fundamental: {
      duration: '35 min',
      description: 'Progressão Técnica: 1. Exercícios em pares de passe e receção; 2. Circuito de drible com mudança de direção; 3. Situação de 2x1 em meio campo. Jogo condicionado com obrigatoriedade de 3 passes.',
      materials: 'Bolas, Coletes, Cestos de Basquetebol.',
      organization: 'Pares e trios distribuídos pelo pavilhão.'
    },
    final: {
      duration: '5 min',
      description: 'Balanço da Aula: Discussão sobre as violações de "passos" e "drible". Introdução à higiene pessoal pós-esforço.',
      materials: 'Nenhum.',
      organization: 'Reunião no centro do campo.'
    }
  },
  '3c': {
    theme: 'Sistemas Táticos no Voleibol e Condição Física',
    unit: 'Jogos Desportivos / Aptidão Física',
    essentials: [
      'Utilizar o serviço por baixo ou por cima com eficácia técnica.',
      'Ocupar o espaço defensivo em sistema de "W" na receção.',
      'Analisar a frequência cardíaca para monitorizar a intensidade do treino.'
    ],
    initial: {
      duration: '15 min',
      description: 'Aquecimento Geral e Específico: Corrida variada, deslocamentos laterais de defesa. Trabalho de toques e manchetes em pares com rede.',
      materials: 'Rede de Voleibol, Bolas.',
      organization: 'Grupos em cada lado da rede.'
    },
    fundamental: {
      duration: '30 min',
      description: 'Complexo 1 (C1): Receção, levantamento e ataque. Treino de rotação de posições. Jogo formal 6x6 focando na construção do ataque a 3 toques.',
      materials: 'Bolas, Coletes, Rede.',
      organization: 'Sextetos posicionados taticamente.'
    },
    final: {
      duration: '5 min',
      description: 'Feedback: Análise dos erros de rotação. Alongamentos estáticos de grandes grupos musculares.',
      materials: 'Fichas de monitorização.',
      organization: 'Dispersos pelo campo, sentados.'
    }
  },
  'sec': {
    theme: 'Treino Individualizado e Gestão da Saúde Desportiva',
    unit: 'Plano Individual de Treino / Atletismo',
    essentials: [
      'Planear e executar um programa autónomo de aquecimento e recuperação.',
      'Avaliar criticamente a relação entre atividade física e bem-estar psicossocial.',
      'Intervir em funções de arbitragem e organização de torneios escolares.'
    ],
    initial: {
      duration: '15 min',
      description: 'Aquecimento Autónomo: Os alunos gerem a sua própria ativação com base no plano individual previamente estabelecido.',
      materials: 'Cronómetros, Tapetes.',
      organization: 'Gestão autónoma do espaço.'
    },
    fundamental: {
      duration: '40 min',
      description: 'Trabalho de Estações HIIT: 1. Burpees; 2. Prancha; 3. Sprints; 4. Flexões. Monitorização de FC. Organização de torneio de Badminton auto-arbitrado.',
      materials: 'Raquetes, Volantes, Monitores de frequência cardíaca.',
      organization: 'Divisão por estações e campos de badminton.'
    },
    final: {
      duration: '5 min',
      description: 'Reflexão: Discussão sobre a supercompensação e descanso. Arrumação autónoma do pavilhão.',
      materials: 'Diários de Treino.',
      organization: 'Reunião coletiva final.'
    }
  }
};

const LessonPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanningTab>('aula');
  const [selectedCycle, setSelectedCycle] = useState<Cycle>('1c');

  const currentContent = CYCLE_LESSON_CONTENT[selectedCycle];

  const downloadPDF = async (type: PlanningTab) => {
    const cycleLabel = CYCLE_LABELS[selectedCycle];
    const title = type === 'aula' ? `Plano de Aula - ${cycleLabel}` : `Plano Anual - ${cycleLabel}`;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.padding = '15mm';
    tempDiv.style.fontFamily = '"Helvetica", "Arial", sans-serif';
    tempDiv.style.color = '#000000';

    const htmlContent = `
      <div style="border: 1px solid #000; padding: 5px;">
        <!-- Cabeçalho Institucional -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
          <tr>
            <td style="width: 70%; vertical-align: middle;">
              <h1 style="margin: 0; font-size: 20px; color: #1e4ed8; font-weight: 900;">ASANTOS DESPORTO</h1>
              <p style="margin: 0; font-size: 11px; font-weight: bold; color: #475569;">UNIDADE DE APOIO AO PROFESSOR DE EDUCAÇÃO FÍSICA</p>
            </td>
            <td style="width: 30%; text-align: right; vertical-align: middle;">
              <div style="border: 1px solid #000; padding: 5px; font-size: 14px; font-weight: bold; background: #f8fafc;">
                PLANO DE AULA
              </div>
            </td>
          </tr>
        </table>

        <!-- Dados da Aula -->
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
          <tr>
            <td style="border: 1px solid #000; padding: 4px; width: 50%;"><b>Escola:</b> __________________________________________</td>
            <td style="border: 1px solid #000; padding: 4px; width: 25%;"><b>Turma:</b> __________</td>
            <td style="border: 1px solid #000; padding: 4px; width: 25%;"><b>Data:</b> ____/____/____</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 4px;"><b>Professor:</b> ________________________________________</td>
            <td style="border: 1px solid #000; padding: 4px;"><b>Aula Nº:</b> _________</td>
            <td style="border: 1px solid #000; padding: 4px;"><b>Duração:</b> 45/90 min</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 4px;"><b>Local:</b> Pavilhão / Recinto Desportivo</td>
            <td colspan="2" style="border: 1px solid #000; padding: 4px;"><b>Ciclo:</b> ${cycleLabel}</td>
          </tr>
        </table>

        <!-- Temas e Objetivos -->
        <div style="background: #e2e8f0; border: 1px solid #000; padding: 4px; font-size: 12px; font-weight: bold; margin-bottom: 0;">
          TEMA / UNIDADE DIDÁTICA: ${currentContent.unit}
        </div>
        <div style="border: 1px solid #000; padding: 8px; font-size: 11px; border-top: 0; margin-bottom: 15px;">
          <p style="margin: 0 0 5px 0;"><b>Objetivos / Aprendizagens Essenciais:</b></p>
          <ul style="margin: 0; padding-left: 15px;">
            ${currentContent.essentials.map(e => `<li style="margin-bottom: 3px;">${e}</li>`).join('')}
          </ul>
        </div>

        <!-- Estrutura Principal -->
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="background: #cbd5e1; text-align: center; font-weight: bold;">
              <th style="border: 1px solid #000; padding: 6px; width: 12%;">Tempo / Fases</th>
              <th style="border: 1px solid #000; padding: 6px; width: 58%;">Descrição das Atividades / Conteúdos Técnicos</th>
              <th style="border: 1px solid #000; padding: 6px; width: 15%;">Material</th>
              <th style="border: 1px solid #000; padding: 6px; width: 15%;">Organização</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; vertical-align: top;">
                <b style="font-size: 11px;">INICIAL</b><br><br>${currentContent.initial.duration}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: justify;">
                ${currentContent.initial.description}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.initial.materials}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.initial.organization}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; vertical-align: top;">
                <b style="font-size: 11px;">FUNDAMENTAL</b><br><br>${currentContent.fundamental.duration}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: justify;">
                ${currentContent.fundamental.description}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.fundamental.materials}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.fundamental.organization}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; vertical-align: top;">
                <b style="font-size: 11px;">FINAL</b><br><br>${currentContent.final.duration}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: justify;">
                ${currentContent.final.description}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.final.materials}
              </td>
              <td style="border: 1px solid #000; padding: 8px; vertical-align: top; text-align: center;">
                ${currentContent.final.organization}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Observações e Assinaturas -->
        <div style="margin-top: 15px;">
          <div style="border: 1px solid #000; padding: 8px; font-size: 10px; height: 60px;">
            <b>Observações / Avaliação da Aula:</b><br>
            _____________________________________________________________________________________________________________________<br>
            _____________________________________________________________________________________________________________________
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px;">
            <tr>
              <td style="width: 50%; text-align: center;">
                <div style="width: 80%; border-top: 1px solid #000; margin: 30px auto 5px auto;"></div>
                Assinatura do Professor
              </td>
              <td style="width: 50%; text-align: center;">
                <div style="width: 80%; border-top: 1px solid #000; margin: 30px auto 5px auto;"></div>
                Visto da Direção / Coordenação
              </td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 15px; text-align: center; font-size: 7px; color: #94a3b8; text-transform: uppercase;">
          DOCUMENTO GERADO VIA PLATAFORMA ASANTOS DESPORTO - REFERENCIAL CURRICULAR DE PORTUGAL (ME)
        </div>
      </div>
    `;

    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, { 
        scale: 3,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
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
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Didática e Gestão Curricular</p>
          </div>
        </div>
        
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button 
            onClick={() => setActiveTab('aula')} 
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'aula' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Plano de Aula
          </button>
          <button 
            onClick={() => setActiveTab('anual')} 
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'anual' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Estrutura Anual
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Seleção de Ciclo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(CYCLE_LABELS) as Cycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setSelectedCycle(cycle)}
              className={`flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-300 ${
                selectedCycle === cycle 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl scale-105' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <GraduationCap size={16} />
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none">
                {CYCLE_LABELS[cycle].split('(')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Visualização de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
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
              onClick={() => downloadPDF(activeTab)}
              className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
            >
              <Download size={16} className="group-hover:bounce" />
              Gerar PDF Profissional
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <FileText size={18} className="text-slate-600" />
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Organização da Sessão</h4>
             </div>

             <div className="space-y-3">
                {[
                  { label: 'Parte Inicial', time: currentContent.initial.duration, content: currentContent.initial.description, icon: Timer, color: 'text-emerald-500' },
                  { label: 'Parte Fundamental', time: currentContent.fundamental.duration, content: currentContent.fundamental.description, icon: Layout, color: 'text-blue-500' },
                  { label: 'Parte Final', time: currentContent.final.duration, content: currentContent.final.description, icon: Users, color: 'text-slate-500' }
                ].map((phase, i) => (
                  <div key={i} className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 flex gap-5 items-start group hover:border-blue-900/30 transition-all">
                    <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform">
                      <phase.icon className={phase.color} size={20} />
                    </div>
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
      </div>

      <div className="p-6 bg-blue-600/5 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6">
         <div className="flex items-center gap-2">
            <MapPin size={12} className="text-blue-500" />
            <span className="text-[9px] font-black text-slate-600 uppercase">Referencial PT (ME)</span>
         </div>
         <div className="flex items-center gap-2">
            <Users size={12} className="text-emerald-500" />
            <span className="text-[9px] font-black text-slate-600 uppercase">Avaliação Inclusiva</span>
         </div>
         <div className="flex items-center gap-2">
            <BookOpen size={12} className="text-amber-500" />
            <span className="text-[9px] font-black text-slate-600 uppercase">Didática Ativa</span>
         </div>
         <div className="flex items-center gap-2">
            <ClipboardList size={12} className="text-purple-500" />
            <span className="text-[9px] font-black text-slate-600 uppercase">Padrão Scribd HD</span>
         </div>
      </div>
    </div>
  );
};

export default LessonPlanning;
