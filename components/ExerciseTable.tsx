
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Exercise } from '../types';
import { 
  Dumbbell, PlayCircle, Filter, Search, CheckCircle2, 
  Info, X, AlertTriangle, Zap, Activity, Loader2, Image as ImageIcon
} from 'lucide-react';

const EXERCISES: Exercise[] = [
  // PEITORAL
  { 
    id: '1', 
    name: 'Supino Reto com Halteres', 
    targetMuscle: 'Peitoral', 
    instructions: 'Deite-se no banco plano, segure um halter em cada mão com as palmas voltadas para a frente e empurre-os verticalmente até a extensão dos braços.', 
    detailedDescription: 'Mantenha as escápulas aduzidas (fechadas) contra o banco. Desça os halteres de forma controlada até que fiquem alinhados com o peito, mantendo os cotovelos em um ângulo aproximado de 45 graus em relação ao tronco para proteger os ombros.', 
    videoUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpwaG54cXN4NXN4NXN4NXN4NXN4NXN4NXN4NXN4NXN4NXN4NXN4NXN4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lS27zPXP682888/giphy.gif' 
  },
  { 
    id: '1-b', 
    name: 'Supino Fechado (Barra)', 
    targetMuscle: 'Peitoral / Tríceps', 
    instructions: 'Deite-se no banco e segure a barra com as mãos em uma largura menor que a dos ombros. Desça a barra até o peito mantendo os cotovelos próximos ao corpo.', 
    detailedDescription: 'Foco intenso no tríceps e na porção medial do peitoral. O uso do arquivo MP4 garante visualização fluida do movimento técnico de compressão.', 
    videoUrl: 'exercise-close-grip-bench-press.mp4' 
  },
  { id: '2', name: 'Supino Inclinado', targetMuscle: 'Peitoral', instructions: 'Banco a 45º, empurre os halteres para cima.', detailedDescription: 'Foco na porção superior do peitoral.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0HlPtbHE2iJJki52/giphy.gif' },
  { id: '3', name: 'Peck Deck', targetMuscle: 'Peitoral', instructions: 'Feche os braços à frente do corpo.', detailedDescription: 'Mantenha o peito estufado.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKv6eS0p/giphy.gif' },
  
  // DORSAIS
  { id: '6', name: 'Remada Curvada', targetMuscle: 'Dorsais', instructions: 'Puxe a barra ao abdômen inclinando o tronco.', detailedDescription: 'Coluna neutra sempre.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0HlPtbHE2iJJki52/giphy.gif' },
  { id: '7', name: 'Puxada Alta', targetMuscle: 'Dorsais', instructions: 'Puxe a barra ao peito.', detailedDescription: 'Cotovelos para baixo e para trás.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKv6eS0p/giphy.gif' },

  // PERNAS
  { id: '11', name: 'Agachamento Livre', targetMuscle: 'Pernas', instructions: 'Desça o quadril mantendo a coluna reta.', detailedDescription: 'Amplitude máxima permitida.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0HlPtbHE2iJJki52/giphy.gif' },
  { id: '12', name: 'Leg Press 45º', targetMuscle: 'Pernas', instructions: 'Empurre a plataforma com os pés.', detailedDescription: 'Não trave os joelhos.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKv6eS0p/giphy.gif' },

  // OMBROS
  { id: '18', name: 'Desenvolvimento', targetMuscle: 'Ombros', instructions: 'Halteres acima da cabeça.', detailedDescription: 'Controle o movimento.', videoUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZubXF6bmN4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4Z3R4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0HlPtbHE2iJJki52/giphy.gif' },
];

const ExerciseModal: React.FC<{ exercise: Exercise; onClose: () => void }> = ({ exercise, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [exercise.id]);

  const isMp4 = exercise.videoUrl.toLowerCase().endsWith('.mp4');

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-slate-800 hover:bg-rose-600 text-white rounded-2xl transition-all z-[310]"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-500/20">
                {exercise.targetMuscle}
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                {exercise.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
               <Zap size={16} className="text-yellow-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Biomecânica Ativa</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
                {loading && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-20">
                    <Loader2 size={40} className="text-blue-500 animate-spin" />
                  </div>
                )}
                
                {error ? (
                  <div className="flex flex-col items-center gap-4 text-slate-500 p-8 text-center">
                    <AlertTriangle size={48} className="text-amber-500 mb-2" />
                    <p className="text-sm font-bold uppercase tracking-tight">Erro no servidor de mídia</p>
                    <button 
                      onClick={() => { setError(false); setLoading(true); }}
                      className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-[10px] font-black uppercase hover:bg-slate-700 transition-colors"
                    >
                      Tentar Recarregar
                    </button>
                  </div>
                ) : (
                  isMp4 ? (
                    <video 
                      ref={videoRef}
                      src={exercise.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      onCanPlay={() => setLoading(false)}
                      onError={() => { setLoading(false); setError(true); }}
                      className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    />
                  ) : (
                    <img 
                      src={exercise.videoUrl} 
                      alt={exercise.name}
                      onLoad={() => setLoading(false)}
                      onError={() => { setLoading(false); setError(true); }}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    />
                  )
                )}
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                 <Activity size={18} className="text-blue-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feed Visual em HD</span>
              </div>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Info size={16} /> Instruções de Treino
                 </h3>
                 <p className="text-slate-300 leading-relaxed font-medium">
                   {exercise.instructions}
                 </p>
              </section>

              <section className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500" /> Notas Técnicas
                 </h3>
                 <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50 italic text-slate-400 text-sm leading-relaxed">
                   {exercise.detailedDescription}
                 </div>
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
      const matchMuscle = filterMuscle === 'Todos' || ex.targetMuscle.includes(filterMuscle);
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

      <div className="p-8 border-b border-slate-800 bg-slate-900/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl rotate-3">
              <Dumbbell size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Guia Visual</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Demonstrações Animadas HD</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="Buscar exercício..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
             />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {muscles.map(muscle => (
             <button
               key={muscle}
               onClick={() => setFilterMuscle(muscle)}
               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                 filterMuscle === muscle 
                 ? 'bg-blue-600 text-white shadow-lg' 
                 : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-white'
               }`}
             >
               {muscle}
             </button>
           ))}
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Nº</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Exercício</th>
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
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-blue-500 group-hover:scale-110 transition-transform">
                    <PlayCircle size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Ver {exercise.videoUrl.endsWith('.mp4') ? 'Vídeo' : 'GIF'}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExerciseTable;
