
import React, { useState } from 'react';
import { Download, BookOpen, Layout, GraduationCap, CheckCircle2, Timer, Target } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type PlanningTab = 'aula' | 'anual';
type Cycle = '1c' | '2c' | '3c' | 'sec';

const CYCLE_LABELS: Record<Cycle, string> = {
  '1c': '1º Ciclo',
  '2c': '2º Ciclo',
  '3c': '3º Ciclo',
  'sec': 'Secundário'
};

interface LessonContent {
  theme: string;
  essentials: string[];
  initial: string;
  fundamental: string;
  final: string;
}

const CYCLE_LESSON_CONTENT: Record<Cycle, LessonContent> = {
  '1c': {
    theme: 'Exploração Motora e Jogos Pré-Desportivos',
    essentials: [
      'Executar habilidades motoras fundamentais (locomoção, manipulação e equilíbrio).',
      'Participar em jogos lúdicos respeitando regras e companheiros.',
      'Identificar sinais de fadiga e importância da hidratação.'
    ],
    initial: 'Ativação Lúdica: Jogo do "Gato e Rato" com variações de locomoção (quadrupédia, saltos). Mobilização articular através de mímica animal.',
    fundamental: 'Circuito de Agilidade: 4 Estações (Equilíbrio em banco, Salto de obstáculos baixos, Lançamento de precisão ao alvo, Rastejar sob arcos). Foco na qualidade do movimento.',
    final: 'Retorno à Calma: Jogo da "Estátua" com foco no controlo respiratório. Reflexão sobre a importância do equilíbrio.'
  },
  '2c': {
    theme: 'Introdução aos Jogos Desportivos Coletivos (Basquetebol)',
    essentials: [
      'Executar o drible e o passe de peito em deslocamento.',
      'Compreender as funções de atacante e defesa no jogo reduzido.',
      'Aplicar o "passo zero" e evitar a violação de "campo atrás".'
    ],
    initial: 'Aquecimento Específico: Drible livre em espaço delimitado. Ao sinal, mudar de direção ou trocar de bola com colega. Estiramentos dinâmicos.',
    fundamental: 'Exercícios em Trios: Passe e corte. Progressão para situação de 2x1 focando na decisão de passar ou driblar. Jogo reduzido 3x3 com regras adaptadas.',
    final: 'Feedback Técnico: Discussão sobre a importância da visão periférica no drible. Higiene pessoal.'
  },
  '3c': {
    theme: 'Tática e Sistemas de Jogo (Voleibol)',
    essentials: [
      'Utilizar o passe e a manchete para construção do ataque (3 toques).',
      'Ocupar o espaço defensivo em sistema de "W" na receção ao serviço.',
      'Analisar a eficácia das ações técnico-táticas individuais e coletivas.'
    ],
    initial: 'Manuseio de Bola: Toques e manchetes contra a parede e em pares. Ativação específica de ombros e saltos pliométricos baixos.',
    fundamental: 'Complexo 1 (C1): Receção, levantamento e ataque. Treino de rotação e posicionamento defensivo. Jogo formal com foco na comunicação e apoio ao batedor.',
    final: 'Análise de Jogo: Síntese das soluções táticas encontradas para ultrapassar o bloco adversário. Alongamentos estáticos.'
  },
  'sec': {
    theme: 'Aptidão Física e Gestão da Saúde',
    essentials: [
      'Planear e executar um plano de aquecimento autónomo.',
      'Controlar a intensidade do esforço através da Frequência Cardíaca.',
      'Demonstrar autonomia na seleção de exercícios de compensação muscular.'
    ],
    initial: 'Aquecimento Autónomo: Os alunos gerem 10 min de ativação cardiorrespiratória e articular com base no tema da aula.',
    fundamental: 'Treino Intervalado (HIIT): Circuito de 8 exercícios focado em força-resistência e potência. Monitorização da FC em cada série. Organização de torneio auto-arbitrado.',
    final: 'Reflexão Crítica: Debate sobre a relação entre o esforço realizado e as recomendações da OMS para a saúde.'
  }
};

const LessonPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanningTab>('aula');
  const [selectedCycle, setSelectedCycle] = useState<Cycle>('1c');

  const currentContent = CYCLE_LESSON_CONTENT[selectedCycle];

  const downloadEditable = async (type: PlanningTab) => {
    const cycleLabel = CYCLE_LABELS[selectedCycle];
    const title = type === 'aula' ? `Plano de Aula EF - ${cycleLabel}` : `Planeamento Anual EF - ${cycleLabel}`;
    const header = `<div style="font-family: 'Arial', sans-serif; line-height: 1.6; padding: 20px;"><h1 style="color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 5px; font-size: 18px; text-transform: uppercase;">${title}</h1>`;
    const footer = `<div style="font-size: 10px; color: #64748b; margin-top: 50px; border-top: 1px solid #e2e8f0; text-align: center; padding-top: 10px;">Documento gerado pela plataforma ASANTOS DESPORTO</div></div>`;
    let body = type === 'aula' ? `
      <div style="background: #f1f5f9; padding: 15px; border: 1px solid #cbd5e1; margin-bottom: 20px;"><b>Escola:</b> _________________________ <b>Turma:</b> _____ <b>Data:</b> __/__/____<br><b>Tema da Aula:</b> ${currentContent.theme}</div>
      <h2 style="color: #334155; margin-top: 20px; text-transform: uppercase; font-size: 14px; border-left: 4px solid #1d4ed8; padding-left: 10px;">1. APRENDIZAGENS ESSENCIAIS</h2>${currentContent.essentials.map(e => `<p>• ${e}</p>`).join('')}
      <h2 style="color: #334155; margin-top: 20px; text-transform: uppercase; font-size: 14px; border-left: 4px solid #1d4ed8; padding-left: 10px;">2. PARTE INICIAL</h2><p>${currentContent.initial}</p>
      <h2 style="color: #334155; margin-top: 20px; text-transform: uppercase; font-size: 14px; border-left: 4px solid #1d4ed8; padding-left: 10px;">3. PARTE FUNDAMENTAL</h2><p>${currentContent.fundamental}</p>
      <h2 style="color: #334155; margin-top: 20px; text-transform: uppercase; font-size: 14px; border-left: 4px solid #1d4ed8; padding-left: 10px;">4. PARTE FINAL</h2><p>${currentContent.final}</p>
    ` : `
      <div style="background: #f1f5f9; padding: 15px; border: 1px solid #cbd5e1; margin-bottom: 20px;"><b>Ano Letivo:</b> 2024/2025 | <b>Escola:</b> _________________________________</div>
      <h2 style="color: #334155; margin-top: 20px; text-transform: uppercase; font-size: 14px; border-left: 4px solid #1d4ed8; padding-left: 10px;">ESTRUTURA POR PERÍODOS</h2>
      <p><b>1º PERÍODO:</b> Jogos Desportivos Coletivos (Invasão) e Atletismo.</p>
      <p><b>2º PERÍODO:</b> Ginástica Solo/Aparelhos, Dança e Voleibol.</p>
      <p><b>3º PERÍODO:</b> Atividades Ar Livre, Raquetes e Torneios Finais.</p>
    `;
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
      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-blue-50/30 dark:bg-blue-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-700 p-2 rounded-xl text-white shadow-lg"><Layout size={22} /></div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Núcleo de Planeamento</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Currículo e Didática EF</p>
          </div>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl shadow-inner">
          <button onClick={() => setActiveTab('aula')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'aula' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-md' : 'text-slate-500'}`}>Plano de Aula</button>
          <button onClick={() => setActiveTab('anual')} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === 'anual' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-md' : 'text-slate-500'}`}>Planeamento Anual</button>
        </div>
      </div>
      {activeTab === 'aula' && (
        <div className="px-8 pt-6">
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            {(Object.keys(CYCLE_LABELS) as Cycle[]).map((cycle) => (
              <button key={cycle} onClick={() => setSelectedCycle(cycle)} className={`flex-1 min-w-[100px] px-3 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${selectedCycle === cycle ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-200'}`}><GraduationCap size={14} />{CYCLE_LABELS[cycle]}</button>
            ))}
          </div>
        </div>
      )}
      <div className="p-8">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400"><BookOpen size={20} /><h4 className="font-black uppercase tracking-tighter text-lg">Visualização do Conteúdo</h4></div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{currentContent.theme}</p>
            </div>
            <button onClick={() => downloadEditable(activeTab)} className="flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">BAIXAR PDF</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4"><Target size={18} className="text-blue-400" /><h5 className="text-xs font-black uppercase tracking-widest">Aprendizagens Essenciais</h5></div>
              <ul className="space-y-3">{currentContent.essentials.map((e, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" /><span className="text-xs font-medium opacity-90 leading-relaxed">{e}</span></li>))}</ul>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              {[
                { label: 'Parte Inicial', time: '10-15 min', content: currentContent.initial, icon: Timer, color: 'text-emerald-500' },
                { label: 'Parte Fundamental', time: '30-40 min', content: currentContent.fundamental, icon: Layout, color: 'text-blue-500' },
                { label: 'Parte Final', time: '5-10 min', content: currentContent.final, icon: GraduationCap, color: 'text-slate-500' }
              ].map((phase, i) => (
                <div key={i} className="bg-white dark:bg-slate-900/40 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 flex gap-4 items-start">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl"><phase.icon className={phase.color} size={20} /></div>
                  <div><div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{phase.label}</span><span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">{phase.time}</span></div><p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{phase.content}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanning;
