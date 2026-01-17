
import React, { useState } from 'react';
import { ClipboardList, Download, Activity, AlertCircle, FileText, CheckCircle2, Circle, CheckCircle, Target, CheckSquare, Square, Stethoscope, Moon, Cigarette, Wine, HeartPulse } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PARQ_QUESTIONS = [
  { id: 1, text: "O seu médico já lhe disse que possui algum problema cardíaco?" },
  { id: 2, text: "Sente dores no peito quando pratica atividade física?" },
  { id: 3, text: "Perde o equilíbrio devido a tonturas ou perdeu a consciência recentemente?" },
  { id: 4, text: "Possui algum problema ósseo ou articular que pode piorar com o exercício?" },
  { id: 5, text: "Toma algum medicamento para a pressão arterial ou coração?" }
];

const MEDICAL_CONDITIONS = [
  "Hipertensão", "Diabetes", "Asma/Bronquite", "Hérnia de Disco", "Arritmia", "Colesterol Alto", "Labirintite", "Alergias Graves"
];

const LIFESTYLE_HABITS = {
  sleep: ["Menos de 5h", "5h a 7h", "7h a 9h", "Mais de 9h"],
  activity: ["Sedentário", "Levemente Ativo", "Ativo", "Muito Ativo"],
  alcohol: ["Não consumo", "Socialmente", "Frequente"],
  smoking: ["Não fumador", "Fumador", "Ex-fumador"]
};

const TRAINING_GOALS = [
  "Hipertrofia", "Perda de Gordura", "Condicionamento", "Saúde/Qualidade", "Performance", "Reabilitação"
];

const Anamnese: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, 'Sim' | 'Não'>>({});
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [lifestyle, setLifestyle] = useState({
    sleep: '7h a 9h',
    activity: 'Ativo',
    alcohol: 'Não consumo',
    smoking: 'Não fumador'
  });
  const [showError, setShowError] = useState(false);

  const handleAnswer = (id: number, value: 'Sim' | 'Não') => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setShowError(false);
  };

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const isComplete = Object.keys(answers).length === PARQ_QUESTIONS.length;

  const downloadAnamnese = async () => {
    if (!isComplete) {
      setShowError(true);
      return;
    }

    const today = new Date().toLocaleDateString('pt-PT');
    const title = `Relatório de Anamnese & Saúde - ${today}`;
    
    const header = `
      <div style="font-family: 'Helvetica', sans-serif; line-height: 1.4; padding: 40px; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #be123c; margin: 0; font-size: 22pt; text-transform: uppercase;">ASANTOS DESPORTO</h1>
          <p style="color: #64748b; font-weight: bold; margin-top: 5px;">DOSSIÊ TÉCNICO DE AVALIAÇÃO INICIAL</p>
        </div>
    `;
    
    const body = `
      <div style="border-top: 2px solid #be123c; padding-top: 20px;">
        <h2 style="color: #be123c; font-size: 14pt; text-transform: uppercase; margin-bottom: 15px;">1. Identificação e Objetivos</h2>
        <p><b>Data da Avaliação:</b> ${today}</p>
        <p><b>Objetivos Selecionados:</b> ${selectedGoals.join(', ') || 'Não informados'}</p>
      </div>

      <div style="margin-top: 25px;">
        <h2 style="color: #be123c; font-size: 14pt; text-transform: uppercase; margin-bottom: 15px;">2. Prontidão PAR-Q</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${PARQ_QUESTIONS.map(q => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 8px 0;">${q.text}</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; color: ${answers[q.id] === 'Sim' ? '#be123c' : '#059669'};">${answers[q.id]}</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <div style="margin-top: 25px;">
        <h2 style="color: #be123c; font-size: 14pt; text-transform: uppercase; margin-bottom: 15px;">3. Histórico Clínico Detalhado</h2>
        <p><b>Condições Existentes:</b> ${selectedConditions.join(', ') || 'Nenhuma declarada'}</p>
        <p><b>Medicamentos em Uso:</b> ${medications || 'Nenhum declarado'}</p>
        <p><b>Cirurgias/Lesões:</b> ${surgeries || 'Nenhuma declarada'}</p>
      </div>

      <div style="margin-top: 25px; background: #f8fafc; padding: 20px; border-radius: 10px;">
        <h2 style="color: #be123c; font-size: 14pt; text-transform: uppercase; margin-bottom: 15px;">4. Hábitos de Vida</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <p><b>Sono:</b> ${lifestyle.sleep}</p>
          <p><b>Atividade Atual:</b> ${lifestyle.activity}</p>
          <p><b>Álcool:</b> ${lifestyle.alcohol}</p>
          <p><b>Tabaco:</b> ${lifestyle.smoking}</p>
        </div>
      </div>

      <div style="margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px; font-size: 10pt;">
        <p><b>Declaração:</b> Confirmo que as informações prestadas são verídicas. Estou ciente de que qualquer alteração no meu estado de saúde deve ser comunicada imediatamente ao profissional responsável.</p>
        <br><br>
        <div style="display: flex; justify-content: space-between;">
          <div style="text-align: center; width: 45%; border-top: 1px solid #000; padding-top: 5px;">Assinatura do Aluno/Paciente</div>
          <div style="text-align: center; width: 45%; border-top: 1px solid #000; padding-top: 5px;">Assinatura do Profissional</div>
        </div>
      </div>
    `;

    const footer = `</div>`;
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
      pdf.save(`Anamnese_Completa_${today.replace(/\//g, '-')}.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-rose-50/30 dark:bg-rose-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 p-2 rounded-xl text-white shadow-lg">
            <ClipboardList size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Anamnese Multifatorial</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avaliação Bio-Psico-Social</p>
          </div>
        </div>
        <button onClick={downloadAnamnese} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${isComplete ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-rose-600' : 'bg-slate-200 text-slate-400'}`}>
          <Download size={14} /> GERAR RELATÓRIO PDF
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Objetivos e PAR-Q */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Target size={16} className="text-rose-500" /> Metas de Treino
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {TRAINING_GOALS.map(goal => (
                <button key={goal} onClick={() => toggleItem(selectedGoals, setSelectedGoals, goal)} className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${selectedGoals.includes(goal) ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/20' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                  {selectedGoals.includes(goal) ? <CheckSquare size={16} /> : <Square size={16} />}
                  <span className="text-[10px] font-black uppercase tracking-tighter">{goal}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <HeartPulse size={16} className="text-rose-500" /> Protocolo PAR-Q
            </h4>
            <div className="space-y-3">
              {PARQ_QUESTIONS.map(q => (
                <div key={q.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2 leading-tight">{q.text}</p>
                  <div className="flex gap-2">
                    {['Sim', 'Não'].map(val => (
                      <button key={val} onClick={() => handleAnswer(q.id, val as any)} className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${answers[q.id] === val ? (val === 'Sim' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white') : 'bg-white dark:bg-slate-900 text-slate-400'}`}>
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Lado Direito: Histórico Médico e Estilo de Vida */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Stethoscope size={16} className="text-rose-500" /> Histórico Clínico Detalhado
            </h4>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {MEDICAL_CONDITIONS.map(cond => (
                  <button key={cond} onClick={() => toggleItem(selectedConditions, setSelectedConditions, cond)} className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${selectedConditions.includes(cond) ? 'bg-rose-100 text-rose-600 border-rose-200' : 'bg-slate-100 text-slate-500 border-transparent'} border`}>
                    {cond}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Medicamentos em uso..." value={medications} onChange={e => setMedications(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-rose-500" />
              <input type="text" placeholder="Histórico de cirurgias ou lesões..." value={surgeries} onChange={e => setSurgeries(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Activity size={16} className="text-rose-500" /> Hábitos de Vida
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase"><Moon size={12}/> Sono Diário</div>
                <select value={lifestyle.sleep} onChange={e => setLifestyle({...lifestyle, sleep: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-xs font-bold">
                  {LIFESTYLE_HABITS.sleep.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase"><Activity size={12}/> Atividade Física</div>
                <select value={lifestyle.activity} onChange={e => setLifestyle({...lifestyle, activity: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-xs font-bold">
                  {LIFESTYLE_HABITS.activity.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase"><Wine size={12}/> Álcool</div>
                <select value={lifestyle.alcohol} onChange={e => setLifestyle({...lifestyle, alcohol: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-xs font-bold">
                  {LIFESTYLE_HABITS.alcohol.map(h => <option key={h} value={h}>{h}</option>)}
                </select>

                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase"><Cigarette size={12}/> Tabagismo</div>
                <select value={lifestyle.smoking} onChange={e => setLifestyle({...lifestyle, smoking: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-xs font-bold">
                  {LIFESTYLE_HABITS.smoking.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800 flex items-start gap-4 shadow-sm">
          <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <p className="text-[10px] text-rose-700 dark:text-rose-400 leading-tight italic font-medium">
            <strong>DICA PROFISSIONAL:</strong> A anamnese é o alicerce da prescrição segura. Se o aluno responder "SIM" a qualquer item do PAR-Q ou possuir condições clínicas severas, a autorização médica torna-se imprescindível antes da carga inicial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Anamnese;
