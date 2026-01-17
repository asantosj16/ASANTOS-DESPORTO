
import React, { useState, useEffect } from 'react';
import { Zap, Trophy, Timer, ArrowRight, Bike, Waves, Footprints, Target, Info, Activity, ClipboardList, Plus, Trash2, Calendar, ShieldCheck } from 'lucide-react';
import { TriathlonLog } from '../types';

type SkillLevel = 'Iniciante' | 'Intermédio' | 'Avançado';

interface TrainingPhase {
  phase: string;
  focus: string;
  volume: string;
}

interface TriathlonPlan {
  level: SkillLevel;
  objective: string;
  description: string;
  swim: TrainingPhase;
  bike: TrainingPhase;
  run: TrainingPhase;
  brick: string;
}

const TRIATHLON_PLANS: TriathlonPlan[] = [
  {
    level: 'Iniciante',
    objective: 'Conclusão de Prova Sprint (750m/20k/5k)',
    description: 'Foco em adaptação ao esforço combinado e segurança técnica em cada modalidade.',
    swim: { phase: 'Base Aeróbica', focus: 'Técnica e Respiração Bilateral', volume: '2x 1500m/semana' },
    bike: { phase: 'Adaptação', focus: 'Cadência (85-90 rpm) e conforto na bike', volume: '2x 20km/semana' },
    run: { phase: 'Base', focus: 'Corrida Contínua em Z2', volume: '2x 5km/semana' },
    brick: '1x Transição curta (15km bike + 2km corrida)'
  },
  {
    level: 'Intermédio',
    objective: 'Performance em Distância Olímpica (1.5k/40k/10k)',
    description: 'Desenvolvimento de limiar anaeróbico e transições rápidas.',
    swim: { phase: 'Construção', focus: 'Intervalados de Limiar', volume: '3x 2500m/semana' },
    bike: { phase: 'Força/Endurance', focus: 'Subidas e Intervalos de Potência', volume: '3x 40km/semana' },
    run: { phase: 'Ritmo de Prova', focus: 'Tempo Runs e Fartleks', volume: '3x 10km/semana' },
    brick: '2x Transição (30km bike + 4km corrida ritmo de prova)'
  },
  {
    level: 'Avançado',
    objective: 'Performance 70.3 / Ironman (Alta Intensidade)',
    description: 'Maximização da eficiência energética e tolerância ao lactato em fadiga extrema.',
    swim: { phase: 'Pico', focus: 'Séries Específicas em Águas Abertas', volume: '4x 3500m/semana' },
    bike: { phase: 'Potência Máxima', focus: 'Intervalos de Alta Intensidade (Z4/Z5)', volume: '4x 80km/semana' },
    run: { phase: 'Volume de Elite', focus: 'Longões e Intervalados de Velocidade', volume: '4x 15km/semana' },
    brick: '2x Brick Longo (60km bike + 12km corrida progressiva)'
  }
];

const Triathlon: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<SkillLevel>('Iniciante');
  const [logs, setLogs] = useState<TriathlonLog[]>(() => {
    const saved = localStorage.getItem('asantos_triathlon_logs_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para o formulário de registo
  const [newLog, setNewLog] = useState<Partial<TriathlonLog>>({
    modality: 'Natação',
    intensity: 'Z2',
    distance: 0,
    durationMinutes: 0
  });

  useEffect(() => {
    localStorage.setItem('asantos_triathlon_logs_v1', JSON.stringify(logs));
  }, [logs]);

  const currentPlan = TRIATHLON_PLANS.find(p => p.level === activeLevel)!;

  const handleAddLog = () => {
    if (!newLog.distance || !newLog.durationMinutes) return;
    
    const log: TriathlonLog = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('pt-PT'),
      modality: newLog.modality as any,
      distance: Number(newLog.distance),
      durationMinutes: Number(newLog.durationMinutes),
      intensity: newLog.intensity as any,
      notes: newLog.notes
    };

    setLogs([log, ...logs]);
    setNewLog({ ...newLog, distance: 0, durationMinutes: 0, notes: '' });
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* 1. Registo de Treinos - AGORA NO TOPO */}
      <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/20 flex items-center gap-4">
          <div className="bg-purple-600 p-2 rounded-xl text-white">
            <ClipboardList size={22} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Diário de Treino Triathlon</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monitorização de Volume e Intensidade</p>
          </div>
        </div>

        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Plus size={16} className="text-purple-500" /> Novo Registo
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase">Modalidade</label>
                <select 
                  value={newLog.modality} 
                  onChange={(e) => setNewLog({...newLog, modality: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option>Natação</option>
                  <option>Ciclismo</option>
                  <option>Corrida</option>
                  <option>Brick</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase">Distância (km/m)</label>
                  <input 
                    type="number" 
                    value={newLog.distance || ''} 
                    onChange={(e) => setNewLog({...newLog, distance: Number(e.target.value)})}
                    placeholder="Ex: 10"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase">Tempo (min)</label>
                  <input 
                    type="number" 
                    value={newLog.durationMinutes || ''} 
                    onChange={(e) => setNewLog({...newLog, durationMinutes: Number(e.target.value)})}
                    placeholder="Ex: 60"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase">Intensidade (Zonas)</label>
                <div className="flex gap-2">
                  {['Z1', 'Z2', 'Z3', 'Z4', 'Z5'].map((z) => (
                    <button 
                      key={z} 
                      onClick={() => setNewLog({...newLog, intensity: z as any})}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${newLog.intensity === z ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase">Notas Rápidas</label>
                <textarea 
                  value={newLog.notes || ''} 
                  onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-medium text-slate-300 outline-none h-20"
                />
              </div>

              <button 
                onClick={handleAddLog}
                className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl"
              >
                Registar Treino
              </button>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-8 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-slate-500" /> Histórico Recente
            </h4>

            {logs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                {logs.map((log) => (
                  <div key={log.id} className="bg-slate-950/60 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-purple-500/30 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            log.modality === 'Natação' ? 'bg-sky-500' : 
                            log.modality === 'Ciclismo' ? 'bg-emerald-500' : 
                            log.modality === 'Corrida' ? 'bg-orange-500' : 'bg-purple-500'
                          }`} />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{log.modality}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-600">{log.date}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-500 uppercase block">Distância</span>
                          <span className="text-sm font-black text-white italic">{log.distance} <span className="text-[10px] not-italic opacity-50 uppercase">{log.modality === 'Natação' ? 'm' : 'km'}</span></span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-500 uppercase block">Duração</span>
                          <span className="text-sm font-black text-white italic">{log.durationMinutes} <span className="text-[10px] not-italic opacity-50 uppercase">min</span></span>
                        </div>
                      </div>

                      {log.notes && (
                        <p className="text-[10px] text-slate-500 italic mb-4 leading-relaxed">"{log.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="px-2 py-1 bg-slate-900 rounded text-[8px] font-black text-purple-400 uppercase tracking-widest">{log.intensity}</span>
                      <button 
                        onClick={() => removeLog(log.id)}
                        className="text-slate-700 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600 gap-4">
                <ClipboardList size={32} />
                <p className="text-xs font-black uppercase tracking-widest">Nenhum treino registado ainda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Secção Estratégica: Planos */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 p-3 rounded-2xl text-black shadow-xl rotate-3">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Estratégia Triathlon</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Planeamento Curricular de Elite</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
            {(['Iniciante', 'Intermédio', 'Avançado'] as SkillLevel[]).map((level) => (
              <button 
                key={level} 
                onClick={() => setActiveLevel(level)} 
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeLevel === level ? 'bg-yellow-500 text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-950/50 p-8 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Trophy size={48} className="text-yellow-500" />
                 </div>
                 <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Target size={16} /> Objetivo do Ciclo
                 </h4>
                 <p className="text-xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">{currentPlan.objective}</p>
                 <p className="text-xs text-slate-400 leading-relaxed italic">{currentPlan.description}</p>
              </div>

              <div className="bg-blue-600/10 p-6 rounded-[2rem] border border-blue-500/20">
                 <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Timer size={16} /> Transições (Bricks)
                 </h4>
                 <p className="text-sm font-bold text-slate-200">{currentPlan.brick}</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <Activity size={18} className="text-slate-600" />
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distribuição por Modalidade</h4>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Natação', icon: Waves, color: 'text-sky-500', data: currentPlan.swim },
                    { label: 'Ciclismo', icon: Bike, color: 'text-emerald-500', data: currentPlan.bike },
                    { label: 'Corrida', icon: Footprints, color: 'text-orange-500', data: currentPlan.run }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900/60 p-6 rounded-[2rem] border border-slate-800 hover:border-yellow-500/20 transition-all flex flex-col group">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 bg-slate-950 rounded-xl ${item.color} group-hover:scale-110 transition-transform shadow-xl`}>
                          <item.icon size={20} />
                        </div>
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Fase {i+1}</span>
                      </div>
                      <h5 className="text-sm font-black text-white uppercase mb-2">{item.label}</h5>
                      <div className="space-y-4 flex-grow">
                        <div>
                          <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Período</span>
                          <span className="text-xs font-bold text-slate-300">{item.data.phase}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Foco Técnico</span>
                          <span className="text-[10px] font-bold text-slate-400 leading-tight block">{item.data.focus}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                          <span className="text-[10px] font-black text-yellow-500">{item.data.volume}</span>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Secção de Informação Técnica Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/20 p-3 rounded-2xl text-blue-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Manual de Transições T1 e T2</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Onde as Provas se Ganham ou Perdem</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-950/40 rounded-3xl border border-white/5">
              <h5 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-3">T1: Água para Ciclismo</h5>
              <ul className="space-y-3">
                {[
                  "Comece a despir o fato (wetsuit) até à cintura ainda a correr para a zona de transição.",
                  "Tenha os óculos e a touca na mão para não os perder no parque.",
                  "Coloque o capacete PRIMEIRO antes de tocar na bicicleta (regra obrigatória).",
                  "Monte a bicicleta apenas após cruzar a linha de montagem demarcada."
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs text-slate-400 font-medium">
                    <span className="text-sky-500 font-black">•</span> {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-slate-950/40 rounded-3xl border border-white/5">
              <h5 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-3">T2: Ciclismo para Corrida</h5>
              <ul className="space-y-3">
                {[
                  "Solte os pés dos sapatos de encaixe nos últimos 200m (se tiver técnica).",
                  "Desmonte antes da linha de paragem obrigatória.",
                  "Coloque a bicicleta no suporte antes de retirar o capacete.",
                  "Use atacadores elásticos nas sapatilhas de corrida para ganho de segundos vitais."
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs text-slate-400 font-medium">
                    <span className="text-orange-500 font-black">•</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600/20 p-3 rounded-2xl text-emerald-400">
              <ClipboardList size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Equipamento Essencial</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Checklist de Performance</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
               { title: "Natação", items: ["Tri-suit", "Óculos espelhados", "Touca silicone", "Wetsuit (<24°C)"], color: "text-sky-500" },
               { title: "Ciclismo", items: ["Bicicleta TT/Road", "Capacete Aero", "Sapatos encaixe", "Kit reparação"], color: "text-emerald-500" },
               { title: "Corrida", items: ["Sapatilhas Carbono", "Viseira/Boné", "Cinto porta-dorsal", "Meias compressão"], color: "text-orange-500" },
               { title: "Nutrição", items: ["Géis de energia", "Eletrólitos", "Bidões térmicos", "Barras pré-prova"], color: "text-yellow-500" }
             ].map((group, i) => (
               <div key={i} className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                  <h6 className={`text-[10px] font-black uppercase mb-2 ${group.color}`}>{group.title}</h6>
                  <div className="space-y-1">
                    {group.items.map((item, idx) => (
                      <p key={idx} className="text-[10px] text-slate-400 font-bold">• {item}</p>
                    ))}
                  </div>
               </div>
             ))}
          </div>
          
          <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
            <p className="text-[10px] text-yellow-500 font-bold leading-tight">
              <strong>DICA:</strong> Nunca teste equipamento novo no dia da prova. Treine com o Tri-suit e as sapatilhas de carbono pelo menos 2 semanas antes.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-yellow-500/5 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6">
         <div className="flex items-center gap-2"><Waves size={12} className="text-sky-500" /><span className="text-[9px] font-black text-slate-600 uppercase">HIDRODINÂMICA</span></div>
         <div className="flex items-center gap-2"><Bike size={12} className="text-emerald-500" /><span className="text-[9px] font-black text-slate-600 uppercase">CADÊNCIA</span></div>
         <div className="flex items-center gap-2"><Footprints size={12} className="text-orange-500" /><span className="text-[9px] font-black text-slate-600 uppercase">ENDURANCE</span></div>
         <div className="flex items-center gap-2"><Zap size={12} className="text-yellow-500" /><span className="text-[9px] font-black text-slate-600 uppercase">PERFORMANCE HD</span></div>
      </div>
    </div>
  );
};

export default Triathlon;
