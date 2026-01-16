
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Exercise } from '../types';
import { ArrowUpDown, Dumbbell, ChevronDown, ChevronUp, Info, ListChecks, PlayCircle, Activity, Star } from 'lucide-react';

const EXERCISES: Exercise[] = [
  { id: '1', name: 'Supino Reto', targetMuscle: 'Peitoral', instructions: 'Deite-se no banco, segure a barra e empurre-a.', detailedDescription: 'Mantenha os pés firmes, escápulas aduzidas e descida controlada.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', name: 'Agachamento Livre', targetMuscle: 'Quadríceps', instructions: 'Barra no trapézio, flexione joelhos e anca.', detailedDescription: 'Inicie pela anca, peito aberto e joelhos alinhados.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '3', name: 'Remada Curvada', targetMuscle: 'Dorsais', instructions: 'Incline o tronco, coluna reta e puxe a barra.', detailedDescription: 'Tronco a 45 graus, foco na retração das escápulas.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

const MotionVideo: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-40 bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
      <video 
        ref={videoRef}
        src={exercise.videoUrl}
        autoPlay 
        muted 
        loop 
        playsInline
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
         <span className="text-[8px] font-black text-white uppercase tracking-widest">Análise Técnica Ativa</span>
      </div>
    </div>
  );
};

const ExerciseTable: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Exercise; direction: 'asc' | 'desc' } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asentos_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('asentos_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const processedExercises = useMemo(() => {
    let data = [...EXERCISES];
    if (filterFavorites) data = data.filter(ex => favorites.includes(ex.id));
    if (sortConfig) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [sortConfig, filterFavorites, favorites]);

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><Dumbbell size={20} /></div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Biblioteca de Exercícios</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dados Técnicos em Vídeo</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[600px] no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 w-12"></th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Exercício</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Músculo</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Demonstração</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {processedExercises.map((exercise) => {
              const isExpanded = expandedId === exercise.id;
              return (
                <React.Fragment key={exercise.id}>
                  <tr onClick={() => setExpandedId(isExpanded ? null : exercise.id)} className="hover:bg-slate-800/30 cursor-pointer">
                    <td className="px-6 py-4">{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</td>
                    <td className="px-6 py-4 font-bold text-white">{exercise.name}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-black rounded-full uppercase">{exercise.targetMuscle}</span></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2 text-blue-500"><PlayCircle size={16} /><span className="text-[10px] font-black uppercase">Vídeo HD</span></div></td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-blue-950/20">
                      <td colSpan={4} className="px-8 py-8 border-l-4 border-blue-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Execução</h5>
                              <p className="text-sm text-slate-300">{exercise.instructions}</p>
                           </div>
                           <MotionVideo exercise={exercise} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExerciseTable;
