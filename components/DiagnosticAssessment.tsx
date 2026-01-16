
import React, { useState } from 'react';
import { ClipboardCheck, Users, Activity, Download, CheckCircle2, Ruler, Brain, Heart } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Cycle = '1c' | '2c' | '3c' | 'sec';

interface AssessmentDomain {
  name: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

interface CycleEvaluation {
  title: string;
  description: string;
  domains: AssessmentDomain[];
  instruments: string[];
  fitnessTests: string[];
}

const EVALUATION_DATA: Record<Cycle, CycleEvaluation> = {
  '1c': {
    title: '1º Ciclo (1º ao 4º Ano)',
    description: 'Foco na mestria das Habilidades Motoras Fundamentais e consciência corporal.',
    domains: [
      { 
        name: 'Psicomotor (Prático)', 
        icon: <Activity size={16} />, 
        color: 'text-emerald-500',
        items: ['Locomoção (galope, salto, corrida)', 'Equilíbrio estático e dinâmico', 'Manipulação (lançar/receber)', 'Coordenação óculo-manual'] 
      },
      { 
        name: 'Cognitivo (Saber)', 
        icon: <Brain size={16} />, 
        color: 'text-blue-500',
        items: ['Identificar partes do corpo', 'Noções de espaço e tempo', 'Conhecer regras de segurança na aula'] 
      },
      { 
        name: 'Atitudinal (Ser)', 
        icon: <Heart size={16} />, 
        color: 'text-rose-500',
        items: ['Respeito pelo material', 'Aceitação da derrota/vitória', 'Cooperação com colegas'] 
      }
    ],
    instruments: ['Grelhas de Observação Direta', 'Escalas de Estágio de Desenvolvimento', 'Testes de Habilidades de Ulrich (TGMD)'],
    fitnessTests: ['Circuito de Agilidade Infantil', 'Passeio do Caranguejo (Força)', 'Flexibilidade']
  },
  '2c': {
    title: '2º Ciclo (5º e 6º Ano)',
    description: 'Introdução à técnica desportiva básica e cooperação em grupo.',
    domains: [
      { name: 'Psicomotor (Prático)', icon: <Activity size={16} />, color: 'text-emerald-500', items: ['Gesto técnico básico', 'Posicionamento defensivo', 'Aptidão aeróbica'] },
      { name: 'Cognitivo (Saber)', icon: <Brain size={16} />, color: 'text-blue-500', items: ['Regras básicas', 'Importância do aquecimento', 'Higiene e saúde'] },
      { name: 'Atitudinal (Ser)', icon: <Heart size={16} />, color: 'text-rose-500', items: ['Fair Play', 'Auto-regulação emocional', 'Assiduidade'] }
    ],
    instruments: ['Check-lists Técnicos', 'Mini-Torneios', 'FITescola'],
    fitnessTests: ['Teste de Vai-Vem', 'Flexibilidade', 'Abdominais']
  },
  '3c': {
    title: '3º Ciclo (7º ao 9º Ano)',
    description: 'Especialização motora, tática complexa e consciência do esforço.',
    domains: [
      { name: 'Psicomotor (Prático)', icon: <Activity size={16} />, color: 'text-emerald-500', items: ['Combinações táticas', 'Técnicas especializadas', 'Controlo de esforço'] },
      { name: 'Cognitivo (Saber)', icon: <Brain size={16} />, color: 'text-blue-500', items: ['Sistemas de Jogo', 'Conceitos de treino', 'Arbitragem'] },
      { name: 'Atitudinal (Ser)', icon: <Heart size={16} />, color: 'text-rose-500', items: ['Liderança', 'Responsabilidade social', 'Inclusão'] }
    ],
    instruments: ['Portefólio', 'Provas Escritas', 'Fichas Táticas'],
    fitnessTests: ['FITescola Completo', 'Extensão de Braços', 'Salto em Comprimento']
  },
  'sec': {
    title: 'Ensino Secundário',
    description: 'Autonomia na gestão da saúde, liderança e planeamento pessoal.',
    domains: [
      { name: 'Psicomotor (Prático)', icon: <Activity size={16} />, color: 'text-emerald-500', items: ['Execução autónoma', 'Gestão de intensidade', 'Arbitragem oficial'] },
      { name: 'Cognitivo (Saber)', icon: <Brain size={16} />, color: 'text-blue-500', items: ['Fisiologia do esforço', 'Legislação e doping', 'Vida saudável'] },
      { name: 'Atitudinal (Ser)', icon: <Heart size={16} />, color: 'text-rose-500', items: ['Auto-avaliação', 'Empreendedorismo', 'Diversidade'] }
    ],
    instruments: ['Projetos Pessoais', 'Questionários Estilo Vida', 'Grelhas Competição'],
    fitnessTests: ['Bioimpedância', 'Teste Cooper', 'Avaliação Postural']
  }
};

const DiagnosticAssessment: React.FC = () => {
  const [activeCycle, setActiveCycle] = useState<Cycle>('1c');
  const currentData = EVALUATION_DATA[activeCycle];

  const downloadDiagnosticFile = async (cycle: Cycle) => {
    const data = EVALUATION_DATA[cycle];
    const title = `Ficha Avaliação Diagnóstica - ${data.title}`;
    const header = `<div style="font-family: 'Arial', sans-serif; line-height: 1.6; padding: 30px;"><h1 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 5px; font-size: 20px;">${title}</h1>`;
    const footer = `<div style="font-size: 10px; color: #94a3b8; text-align: center; margin-top: 50px; border-top: 1px solid #e2e8f0;">ASANTOS DESPORTO - Avaliação Diagnóstica</div></div>`;
    let body = `<p><b>Data:</b> ___/___/202X | <b>Turma:</b> _________ | <b>Escola:</b> ___________________________<br><b>Nível:</b> ${data.title}</p>
      <h2 style="background: #f1f5f9; padding: 10px; margin-top: 25px; font-size: 14px; text-transform: uppercase;">1. REFERENCIAIS</h2>${data.domains.map(d => `<div style="margin-top: 15px;"><b>${d.name}</b><ul>${d.items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}`;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = header + body + footer;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    document.body.appendChild(tempDiv);
    try {
      const canvas = await html2canvas(tempDiv, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`Avaliacao_Diagnostica_EF_${cycle.toUpperCase()}.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg"><ClipboardCheck size={22} /></div><div><h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Avaliação Diagnóstica</h3><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aferição de Ponto de Partida</p></div></div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl shadow-inner">{(Object.keys(EVALUATION_DATA) as Cycle[]).map((cycle) => (<button key={cycle} onClick={() => setActiveCycle(cycle)} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeCycle === cycle ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-md' : 'text-slate-500'}`}>{cycle === 'sec' ? 'Secundário' : cycle.replace('c', 'º Ciclo')}</button>))}</div>
      </div>
      <div className="p-8">
        <div className="mb-10 bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4"><div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600"><Users size={24} /></div><div><h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1">{currentData.title}</h4><p className="text-xs text-slate-500 font-medium italic">{currentData.description}</p></div></div>
          <button onClick={() => downloadDiagnosticFile(activeCycle)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">BAIXAR GRELHA</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">{currentData.domains.map((domain, idx) => (<div key={idx} className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 flex flex-col"><div className="flex items-center gap-3 mb-4"><div className={`p-2 rounded-xl bg-slate-50 ${domain.color}`}>{domain.icon}</div><h5 className="text-[10px] font-black uppercase tracking-widest">{domain.name}</h5></div><ul className="space-y-3 flex-grow">{domain.items.map((item, iIdx) => (<li key={iIdx} className="flex items-start gap-2"><CheckCircle2 size={12} className={`${domain.color} shrink-0 mt-0.5`} /><span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{item}</span></li>))}</ul></div>))}</div>
      </div>
    </div>
  );
};

export default DiagnosticAssessment;
