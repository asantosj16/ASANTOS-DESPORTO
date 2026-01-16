
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Exercise } from '../types';
import { 
  Dumbbell, PlayCircle, Filter, Search, CheckCircle2, 
  Info, X, AlertTriangle, Zap, Activity 
} from 'lucide-react';

const EXERCISES: Exercise[] = [
  // PEITORAL
  { id: '1', name: 'Supino Reto', targetMuscle: 'Peitoral', instructions: 'Deite-se no banco, segure a barra e empurre-a verticalmente.', detailedDescription: 'Mantenha os pés firmes no chão, escápulas aduzidas (juntas) e desça a barra de forma controlada até tocar levemente a linha do mamilo. Expire ao empurrar.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '2', name: 'Supino Inclinado', targetMuscle: 'Peitoral', instructions: 'Banco a 45º, empurre os halteres para cima unindo-os levemente.', detailedDescription: 'Foco na porção superior do peitoral. Mantenha os cotovelos ligeiramente abaixo da linha dos ombros para proteger a articulação.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '3', name: 'Peck Deck', targetMuscle: 'Peitoral', instructions: 'Sente-se, braços em 90º, feche-os à frente do corpo.', detailedDescription: 'Mantenha o peito sempre estufado e evite que os pesos batam no retorno para manter a tensão mecânica constante.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '4', name: 'Crossover Polia Alta', targetMuscle: 'Peitoral', instructions: 'Cabos no alto, puxe-os para baixo e para frente cruzando as mãos.', detailedDescription: 'Incline levemente o tronco. Sinta o alongamento no início do movimento e a contração máxima no centro.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '5', name: 'Flexão de Braços', targetMuscle: 'Peitoral', instructions: 'Mãos no chão largura dos ombros, desça o peito e empurre.', detailedDescription: 'Mantenha o corpo como uma prancha rígida. Ative o glúteo e o abdômen para evitar a queda da lombar.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },

  // DORSAIS
  { id: '6', name: 'Remada Curvada', targetMuscle: 'Dorsais', instructions: 'Incline o tronco, coluna reta e puxe a barra ao abdômen.', detailedDescription: 'Foco na retração escapular. Puxe a barra em direção ao umbigo, mantendo os cotovelos próximos ao corpo.', videoUrl: 'https://player.vimeo.com/external/494252666.sd.mp4?s=2541a7d656910626352932976b3f71c18e1d51c1&profile_id=165&oauth2_token_id=57447761' },
  { id: '7', name: 'Puxada Alta (Pulley)', targetMuscle: 'Dorsais', instructions: 'Sente-se e puxe a barra larga em direção ao peito.', detailedDescription: 'Não use o balanço do corpo. Imagine que quer levar os cotovelos até as costelas laterais.', videoUrl: 'https://player.vimeo.com/external/494252666.sd.mp4?s=2541a7d656910626352932976b3f71c18e1d51c1&profile_id=165&oauth2_token_id=57447761' },
  { id: '8', name: 'Levantamento Terra', targetMuscle: 'Dorsais', instructions: 'Tire a barra do chão estendendo quadril e joelhos.', detailedDescription: 'Exercício de força total. Mantenha a coluna neutra e a barra sempre colada às pernas.', videoUrl: 'https://player.vimeo.com/external/494252666.sd.mp4?s=2541a7d656910626352932976b3f71c18e1d51c1&profile_id=165&oauth2_token_id=57447761' },
  { id: '9', name: 'Remada Baixa', targetMuscle: 'Dorsais', instructions: 'Sente-se, puxe o triângulo em direção ao umbigo.', detailedDescription: 'Mantenha os joelhos semi-flexionados. No final da puxada, "abra" o peito e aperte as costas.', videoUrl: 'https://player.vimeo.com/external/494252666.sd.mp4?s=2541a7d656910626352932976b3f71c18e1d51c1&profile_id=165&oauth2_token_id=57447761' },
  { id: '10', name: 'Barra Fixa', targetMuscle: 'Dorsais', instructions: 'Pendure-se e puxe o queixo acima da barra.', detailedDescription: 'Evite o "chute" com as pernas. Se for iniciante, use um elástico para auxílio ou o graviton.', videoUrl: 'https://player.vimeo.com/external/494252666.sd.mp4?s=2541a7d656910626352932976b3f71c18e1d51c1&profile_id=165&oauth2_token_id=57447761' },

  // PERNAS
  { id: '11', name: 'Agachamento Livre', targetMuscle: 'Pernas', instructions: 'Barra no trapézio, flexione joelhos e anca.', detailedDescription: 'Distribua o peso em todo o pé. Desça até onde conseguir manter a coluna reta, sem "retroversão pélvica".', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '12', name: 'Leg Press 45º', targetMuscle: 'Pernas', instructions: 'Empurre a plataforma com os pés, sem travar os joelhos.', detailedDescription: 'Não estenda totalmente as pernas (não "trave" o joelho) para evitar lesões graves. Pés paralelos.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '13', name: 'Cadeira Extensora', targetMuscle: 'Pernas', instructions: 'Extensão total do joelho sentada no aparelho.', detailedDescription: 'Ajuste o encosto para que o joelho coincida com o eixo da máquina. Movimento lento na descida.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '14', name: 'Mesa Flexora', targetMuscle: 'Pernas', instructions: 'Deitada, flexione os joelhos trazendo o peso aos glúteos.', detailedDescription: 'Mantenha o quadril pressionado contra o banco. Ative o posterior de coxa com intenção.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '15', name: 'Afundo com Halteres', targetMuscle: 'Pernas', instructions: 'Um passo à frente, desça o joelho de trás até quase o chão.', detailedDescription: 'Mantenha o tronco reto para maior foco no quadríceps ou incline levemente para glúteo.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '16', name: 'Stiff', targetMuscle: 'Pernas', instructions: 'Pernas semi-estendidas, desça o peso rente às pernas.', detailedDescription: 'Sinta o alongamento no posterior. O quadril deve ir para trás, não as mãos para baixo.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '17', name: 'Panturrilha em Pé', targetMuscle: 'Pernas', instructions: 'Eleve os calcanhares o máximo possível e desça controladamente.', detailedDescription: 'Foco na amplitude total. No topo, aperte bem a panturrilha por 1 segundo.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },

  // OMBROS
  { id: '18', name: 'Desenvolvimento Halteres', targetMuscle: 'Ombros', instructions: 'Sentada, empurre os halteres acima da cabeça.', detailedDescription: 'Mantenha os braços ligeiramente à frente da linha dos ombros (plano escapular).', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '19', name: 'Elevação Lateral', targetMuscle: 'Ombros', instructions: 'Braços ao lado do corpo, eleve-os até a altura dos ombros.', detailedDescription: 'Imagine que está derramando uma jarra de água. Não ultrapasse a linha do ombro.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '20', name: 'Crucifixo Inverso', targetMuscle: 'Ombros', instructions: 'Tronco inclinado, abra os braços lateralmente.', detailedDescription: 'Trabalha a parte posterior do ombro. Evite usar o trapézio para "encolher" os ombros.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '21', name: 'Elevação Frontal', targetMuscle: 'Ombros', instructions: 'Eleve o peso à frente até a altura dos olhos.', detailedDescription: 'Pode ser feito com barra ou halteres. Mantenha o corpo estável, sem balanço.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },

  // BRAÇOS
  { id: '22', name: 'Rosca Direta', targetMuscle: 'Braços', instructions: 'Flexão de cotovelos segurando a barra.', detailedDescription: 'Mantenha os cotovelos fixos ao lado das costelas. Não use o impulso das pernas.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '23', name: 'Tríceps Pulley', targetMuscle: 'Braços', instructions: 'Empurre a barra para baixo estendendo os braços.', detailedDescription: 'Estenda totalmente o cotovelo no final do movimento para contração máxima do tríceps.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
  { id: '24', name: 'Rosca Martelo', targetMuscle: 'Braços', instructions: 'Pegada neutra, flexione os cotovelos.', detailedDescription: 'Ótimo para o braquiorradial e braquial. Mantém a pegada como um martelo.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },

  // CORE
  { id: '25', name: 'Prancha Abdominal', targetMuscle: 'Core', instructions: 'Corpo reto apoiado em antebraços e pés.', detailedDescription: 'Ative o core e glúteos. Não deixe o quadril subir nem descer. Respire calmamente.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165&oauth2_token_id=57447761' },
];

const ExerciseModal: React.FC<{ exercise: Exercise; onClose: () => void }> = ({ exercise, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-slate-800 hover:bg-rose-600 text-white rounded-2xl transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-500/20">
                {exercise.targetMuscle}
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                {exercise.name}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
               <div className="flex items-center gap-2">
                 <Zap size={16} className="text-yellow-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Nível: Todos</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video Player */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                <video 
                  src={exercise.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                   <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                     <PlayCircle size={20} />
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                 <Activity size={18} className="text-blue-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biomecânica aplicada em HD</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Info size={16} /> Como Executar
                 </h3>
                 <p className="text-slate-300 leading-relaxed font-medium">
                   {exercise.instructions}
                 </p>
              </section>

              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500" /> Guia Detalhado
                 </h3>
                 <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50 italic text-slate-400 text-sm leading-relaxed">
                   {exercise.detailedDescription}
                 </div>
              </section>

              <section className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-start gap-3">
                 <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-rose-300 font-bold uppercase leading-tight">
                   Nota: Mantenha a cadência 2-0-2 para melhores resultados hipertróficos.
                 </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExerciseTable: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filterMuscle, setFilterMuscle] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const muscles = ['Todos', ...Array.from(new Set(EXERCISES.map(e => e.targetMuscle)))];

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchMuscle = filterMuscle === 'Todos' || ex.targetMuscle === filterMuscle;
      const matchSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchMuscle && matchSearch;
    });
  }, [filterMuscle, searchTerm]);

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden animate-fade-in-up shadow-2xl relative">
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}

      {/* Cabeçalho de Controle */}
      <div className="p-8 border-b border-slate-800 bg-slate-900/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl rotate-3">
              <Dumbbell size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Biblioteca Técnica</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">25 Exercícios • Guia Visual HD</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="Pesquisar exercício..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all shadow-inner"
             />
          </div>
        </div>

        {/* Filtro de Músculos */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {muscles.map(muscle => (
             <button
               key={muscle}
               onClick={() => setFilterMuscle(muscle)}
               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                 filterMuscle === muscle 
                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                 : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-white hover:bg-slate-900'
               }`}
             >
               <Filter size={12} className={filterMuscle === muscle ? 'opacity-100' : 'opacity-30'} />
               {muscle}
             </button>
           ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Nº</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Exercício</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Grupamento</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredExercises.map((exercise, index) => (
              <tr 
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)} 
                className="hover:bg-blue-900/5 cursor-pointer transition-colors group"
              >
                <td className="px-8 py-5 text-[10px] font-black text-slate-600">{index + 1}</td>
                <td className="px-8 py-5">
                  <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {exercise.name}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-wider group-hover:border-blue-500/30">
                    {exercise.targetMuscle}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-blue-500 group-hover:scale-110 transition-transform">
                    <PlayCircle size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Ver Técnica</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredExercises.length === 0 && (
          <div className="p-20 text-center">
             <div className="bg-slate-900 inline-block p-6 rounded-full mb-6">
                <Dumbbell size={40} className="text-slate-700" />
             </div>
             <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Nenhum exercício encontrado</p>
             <button onClick={() => {setSearchTerm(''); setFilterMuscle('Todos');}} className="mt-4 text-blue-500 text-xs font-bold uppercase underline">Limpar Filtros</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTable;
