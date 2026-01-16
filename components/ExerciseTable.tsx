
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Exercise } from '../types';
import { 
  Dumbbell, PlayCircle, Filter, Search, CheckCircle2, 
  Info, X, AlertTriangle, Zap, Activity, Loader2 
} from 'lucide-react';

const EXERCISES: Exercise[] = [
  // PEITORAL
  { id: '1', name: 'Supino Reto', targetMuscle: 'Peitoral', instructions: 'Deite-se no banco, segure a barra e empurre-a verticalmente.', detailedDescription: 'Mantenha os pés firmes no chão, escápulas aduzidas (juntas) e desça a barra de forma controlada até tocar levemente a linha do mamilo. Expire ao empurrar.', videoUrl: 'https://cdn.pixabay.com/vimeo/394336082/fitness-33161.mp4?width=1280&hash=0e1e2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c' },
  { id: '2', name: 'Supino Inclinado', targetMuscle: 'Peitoral', instructions: 'Banco a 45º, empurre os halteres para cima unindo-os levemente.', detailedDescription: 'Foco na porção superior do peitoral. Mantenha os cotovelos ligeiramente abaixo da linha dos ombros.', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
  { id: '3', name: 'Peck Deck', targetMuscle: 'Peitoral', instructions: 'Sente-se, braços em 90º, feche-os à frente do corpo.', detailedDescription: 'Mantenha o peito sempre estufado e evite que os pesos batam no retorno para manter a tensão mecânica constante.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '4', name: 'Crossover Polia Alta', targetMuscle: 'Peitoral', instructions: 'Cabos no alto, puxe-os para baixo e para frente cruzando as mãos.', detailedDescription: 'Incline levemente o tronco. Sinta o alongamento no início do movimento e a contração máxima no centro.', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4' },
  { id: '5', name: 'Flexão de Braços', targetMuscle: 'Peitoral', instructions: 'Mãos no chão largura dos ombros, desça o peito e empurre.', detailedDescription: 'Mantenha o corpo como uma prancha rígida. Ative o glúteo e o abdômen para evitar a queda da lombar.', videoUrl: 'https://player.vimeo.com/external/394336082.sd.mp4?s=4a38e83344b584e03b30e3f01103c81729352e00&profile_id=165' },

  // DORSAIS
  { id: '6', name: 'Remada Curvada', targetMuscle: 'Dorsais', instructions: 'Incline o tronco, coluna reta e puxe a barra ao abdômen.', detailedDescription: 'Foco na retração escapular. Puxe a barra em direção ao umbigo, mantendo os cotovelos próximos ao corpo.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '7', name: 'Puxada Alta (Pulley)', targetMuscle: 'Dorsais', instructions: 'Sente-se e puxe a barra larga em direção ao peito.', detailedDescription: 'Não use o balanço do corpo. Imagine que quer levar os cotovelos até as costelas laterais.', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4' },
  { id: '8', name: 'Levantamento Terra', targetMuscle: 'Dorsais', instructions: 'Tire a barra do chão estendendo quadril e joelhos.', detailedDescription: 'Exercício de força total. Mantenha a coluna neutra e a barra sempre colada às pernas.', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
  { id: '9', name: 'Remada Baixa', targetMuscle: 'Dorsais', instructions: 'Sente-se, puxe o triângulo em direção ao umbigo.', detailedDescription: 'Mantenha os joelhos semi-flexionados. No final da puxada, "abra" o peito e aperte as costas.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '10', name: 'Barra Fixa', targetMuscle: 'Dorsais', instructions: 'Pendure-se e puxe o queixo acima da barra.', detailedDescription: 'Evite o "chute" com as pernas. Se for iniciante, use um elástico para auxílio ou o graviton.', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4' },

  // PERNAS
  { id: '11', name: 'Agachamento Livre', targetMuscle: 'Pernas', instructions: 'Barra no trapézio, flexione joelhos e anca.', detailedDescription: 'Distribua o peso em todo o pé. Desça até onde conseguir manter a coluna reta.', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
  { id: '12', name: 'Leg Press 45º', targetMuscle: 'Pernas', instructions: 'Empurre a plataforma com os pés, sem travar os joelhos.', detailedDescription: 'Pés paralelos. Não deixe o quadril sair do banco na descida máxima.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '13', name: 'Cadeira Extensora', targetMuscle: 'Pernas', instructions: 'Extensão total do joelho sentada no aparelho.', detailedDescription: 'Ajuste o rolo no tornozelo. Foco no quadríceps isolado.', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4' },

  // OMBROS
  { id: '17', name: 'Desenvolvimento Halteres', targetMuscle: 'Ombros', instructions: 'Sentada, empurre os halteres acima da cabeça.', detailedDescription: 'Mantenha os cotovelos levemente à frente da linha do corpo (plano escapular).', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '18', name: 'Elevação Lateral', targetMuscle: 'Ombros', instructions: 'Braços ao lado do corpo, eleve-os até a altura dos ombros.', detailedDescription: 'Pequena flexão nos cotovelos. Lidere o movimento com o cotovelo, não com a mão.', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },

  // BRAÇOS
  { id: '21', name: 'Rosca Direta', targetMuscle: 'Braços', instructions: 'Flexão de cotovelos segurando a barra.', detailedDescription: 'Cotovelos fixos ao lado do tronco. Não use impulso de quadril.', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4' },
  { id: '22', name: 'Tríceps Pulley', targetMuscle: 'Braços', instructions: 'Empurre a barra para baixo estendendo os braços.', detailedDescription: 'Mantenha os cotovelos travados na lateral do corpo.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // CORE
  { id: '25', name: 'Prancha Abdominal', targetMuscle: 'Core', instructions: 'Corpo reto apoiado em antebraços e pés.', detailedDescription: 'Ative o core e glúteos. Não deixe o quadril subir nem descer.', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
];

const ExerciseModal: React.FC<{ exercise: Exercise; onClose: () => void }> = ({ exercise, onClose }) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Resetar estados quando o exercício mudar
  useEffect(() => {
    setVideoLoading(true);
    setVideoError(false);
  }, [exercise.id]);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 fade-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-slate-800 hover:bg-rose-600 text-white rounded-2xl transition-all z-[310] shadow-xl"
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
                 <span className="text-[10px] font-black uppercase tracking-widest">Biomecânica Ativa</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video Player */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
                {videoLoading && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-20">
                    <Loader2 size={40} className="text-blue-500 animate-spin" />
                  </div>
                )}
                
                {videoError ? (
                  <div className="flex flex-col items-center gap-4 text-slate-500 p-8 text-center animate-in fade-in duration-500">
                    <AlertTriangle size={48} className="text-amber-500 mb-2" />
                    <p className="text-sm font-bold uppercase tracking-tight leading-tight">
                      Falha na conexão de vídeo.<br/>
                      <span className="text-[10px] opacity-60 font-medium">Tente novamente em alguns segundos.</span>
                    </p>
                    <button 
                      onClick={() => { setVideoError(false); setVideoLoading(true); }}
                      className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-[10px] font-black uppercase hover:bg-slate-700 transition-colors"
                    >
                      Tentar Recarregar
                    </button>
                  </div>
                ) : (
                  <video 
                    key={exercise.videoUrl}
                    src={exercise.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    controls
                    playsInline
                    preload="auto"
                    crossOrigin="anonymous"
                    onLoadedData={() => setVideoLoading(false)}
                    onError={() => {
                      setVideoLoading(false);
                      setVideoError(true);
                    }}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
                  />
                )}
                
                {!videoError && (
                  <div className="absolute top-4 left-4 z-10">
                     <div className="bg-blue-600/80 backdrop-blur-md text-white p-2 rounded-xl shadow-lg border border-white/10">
                       <PlayCircle size={20} />
                     </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                 <Activity size={18} className="text-blue-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronização Muscular em HD</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Info size={16} /> Técnica de Execução
                 </h3>
                 <p className="text-slate-300 leading-relaxed font-medium">
                   {exercise.instructions}
                 </p>
              </section>

              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500" /> Análise Profissional
                 </h3>
                 <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50 italic text-slate-400 text-sm leading-relaxed">
                   {exercise.detailedDescription}
                 </div>
              </section>

              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-start gap-3">
                 <Zap size={18} className="text-blue-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-blue-300 font-bold uppercase leading-tight">
                   Nota: Mantenha a amplitude máxima para recrutamento de fibras profundas.
                 </p>
              </div>
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
