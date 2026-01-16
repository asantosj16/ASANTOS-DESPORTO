
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Exercise } from '../types';
import { Dumbbell, ChevronDown, ChevronUp, PlayCircle, Filter, Search, CheckCircle2, Info } from 'lucide-react';

const EXERCISES: Exercise[] = [
  // PEITORAL
  { id: '1', name: 'Supino Reto', targetMuscle: 'Peitoral', instructions: 'Deite-se no banco, segure a barra e empurre-a verticalmente.', detailedDescription: 'Mantenha os pés firmes no chão, escápulas aduzidas e descida controlada até tocar levemente o peito.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', name: 'Supino Inclinado (Halteres)', targetMuscle: 'Peitoral', instructions: 'Banco a 45º, empurre os halteres para cima unindo-os levemente.', detailedDescription: 'Foco na porção superior do peitoral. Evite bater os halteres no topo para manter a tensão.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '3', name: 'Peck Deck (Voador)', targetMuscle: 'Peitoral', instructions: 'Sente-se, braços em 90º, feche-os à frente do corpo.', detailedDescription: 'Mantenha o peito aberto e não deixe o peso bater na volta para manter a contração constante.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '4', name: 'Crossover Polia Alta', targetMuscle: 'Peitoral', instructions: 'Cabos no alto, puxe-os para baixo e para frente cruzando as mãos.', detailedDescription: 'Incline levemente o tronco à frente. Ótimo para isolamento da parte inferior e medial.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '5', name: 'Flexão de Braços (Push-ups)', targetMuscle: 'Peitoral', instructions: 'Mãos no chão largura dos ombros, desça o peito e empurre.', detailedDescription: 'Mantenha o core rígido. Se estiver difícil, apoie os joelhos para progressão.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // DORSAIS
  { id: '6', name: 'Remada Curvada', targetMuscle: 'Dorsais', instructions: 'Incline o tronco, coluna reta e puxe a barra ao abdómen.', detailedDescription: 'Tronco a 45 graus, foco na retração das escápulas e cotovelos passando a linha do tronco.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '7', name: 'Puxada Alta (Pulley)', targetMuscle: 'Dorsais', instructions: 'Sente-se e puxe a barra larga em direção ao peito.', detailedDescription: 'Evite inclinar o corpo excessivamente para trás. Puxe com o cotovelo, não com a mão.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '8', name: 'Levantamento Terra', targetMuscle: 'Dorsais', instructions: 'Tire a barra do chão estendendo quadril e joelhos.', detailedDescription: 'Exercício multiarticular. Mantenha a barra colada às pernas e a lombar neutra.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '9', name: 'Remada Baixa (Triângulo)', targetMuscle: 'Dorsais', instructions: 'Sente-se, puxe o triângulo em direção ao umbigo.', detailedDescription: 'Mantenha os joelhos levemente flexionados e as costas retas durante toda a execução.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '10', name: 'Barra Fixa (Pull-ups)', targetMuscle: 'Dorsais', instructions: 'Pendure-se e puxe o queixo acima da barra.', detailedDescription: 'Foco na força relativa. Tente não usar impulso (kipping) para isolar as dorsais.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // PERNAS
  { id: '11', name: 'Agachamento Livre', targetMuscle: 'Pernas', instructions: 'Barra no trapézio, flexione joelhos e anca como se fosse sentar.', detailedDescription: 'Inicie pela anca, peito aberto e joelhos alinhados com a ponta dos pés.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '12', name: 'Leg Press 45º', targetMuscle: 'Pernas', instructions: 'Empurre a plataforma com os pés, sem travar os joelhos.', detailedDescription: 'Pés na largura dos ombros. Não deixe o quadril sair do banco na descida máxima.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '13', name: 'Cadeira Extensora', targetMuscle: 'Pernas', instructions: 'Extensão total do joelho sentada no aparelho.', detailedDescription: 'Ajuste o rolo no tornozelo. Foco no quadríceps isolado.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '14', name: 'Mesa Flexora', targetMuscle: 'Pernas', instructions: 'Deitada, flexione os joelhos trazendo o peso aos glúteos.', detailedDescription: 'Mantenha o quadril colado ao banco para evitar compensação lombar.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '15', name: 'Afundo com Halteres', targetMuscle: 'Pernas', instructions: 'Um passo à frente, desça o joelho de trás até quase o chão.', detailedDescription: 'Mantenha o tronco vertical e o equilíbrio distribuído entre as duas pernas.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '16', name: 'Stiff (Halteres ou Barra)', targetMuscle: 'Pernas', instructions: 'Pernas semi-estendidas, desça o peso rente às pernas.', detailedDescription: 'Foco no alongamento dos isquiotibiais. Empurre o quadril bem para trás.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // OMBROS
  { id: '17', name: 'Desenvolvimento Halteres', targetMuscle: 'Ombros', instructions: 'Sentada, empurre os halteres acima da cabeça.', detailedDescription: 'Evite arquear as costas. Cotovelos levemente à frente da linha do corpo (plano escapular).', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '18', name: 'Elevação Lateral', targetMuscle: 'Ombros', instructions: 'Braços ao lado do corpo, eleve-os até a altura dos ombros.', detailedDescription: 'Pequena flexão nos cotovelos. Lidere o movimento com o cotovelo, não com a mão.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '19', name: 'Elevação Frontal', targetMuscle: 'Ombros', instructions: 'Eleve o peso à frente até a altura dos olhos.', detailedDescription: 'Evite balançar o corpo para subir o peso. Controle a descida lenta.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '20', name: 'Crucifixo Inverso', targetMuscle: 'Ombros', instructions: 'Tronco inclinado, abra os braços lateralmente.', detailedDescription: 'Foco no deltóide posterior e rombóides. Aperte as escápulas no topo.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // BRAÇOS
  { id: '21', name: 'Rosca Direta (Barra W)', targetMuscle: 'Braços', instructions: 'Flexão de cotovelos segurando a barra.', detailedDescription: 'Cotovelos fixos ao lado do tronco. Não use impulso de quadril.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '22', name: 'Rosca Martelo', targetMuscle: 'Braços', instructions: 'Pegada neutra (palmas para dentro), flexione cotovelos.', detailedDescription: 'Trabalha bíceps e braquiorradial (antebraço).', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '23', name: 'Tríceps Pulley (Corda)', targetMuscle: 'Braços', instructions: 'Empurre a corda para baixo abrindo as pontas no final.', detailedDescription: 'Mantenha os cotovelos travados na lateral do corpo.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '24', name: 'Tríceps Testa (Halteres)', targetMuscle: 'Braços', instructions: 'Deitada, desça os halteres em direção à testa e estenda.', detailedDescription: 'Mantenha os cotovelos apontados para o teto e paralelos entre si.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

  // CORE
  { id: '25', name: 'Prancha Isométrica', targetMuscle: 'Core', instructions: 'Apoie antebraços e pontas dos pés, mantendo o corpo reto.', detailedDescription: 'Ative glúteos e abdómen. Não deixe o quadril cair ou subir demais.', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

const MotionVideo: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-2xl">
      <video 
        ref={videoRef}
        src={exercise.videoUrl}
        autoPlay 
        muted 
        loop 
        playsInline
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
         <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
         <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">Análise Biomecânica</span>
      </div>
    </div>
  );
};

const ExerciseTable: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
    <div className="glass-card rounded-[2.5rem] overflow-hidden animate-fade-in-up shadow-2xl">
      {/* Cabeçalho de Controle */}
      <div className="p-8 border-b border-slate-800 bg-slate-900/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
              <Dumbbell size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Biblioteca Técnica</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">25 Exercícios • Guia de Movimento</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="Pesquisar exercício..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
                 : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-white'
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
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest w-12 text-center">Info</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Exercício</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Grupamento</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Demonstração</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredExercises.map((exercise) => {
              const isExpanded = expandedId === exercise.id;
              return (
                <React.Fragment key={exercise.id}>
                  <tr 
                    onClick={() => setExpandedId(isExpanded ? null : exercise.id)} 
                    className={`hover:bg-blue-900/5 cursor-pointer transition-colors ${isExpanded ? 'bg-blue-900/10' : ''}`}
                  >
                    <td className="px-8 py-5 text-center">
                      <div className={`p-1.5 rounded-lg inline-block ${isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                        {exercise.name}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-wider">
                        {exercise.targetMuscle}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-blue-500">
                        <PlayCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Vídeo HD</span>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-950/30">
                      <td colSpan={4} className="p-8 border-l-4 border-blue-600">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-top-4 duration-300">
                           <div className="space-y-8">
                              <div>
                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4 flex items-center gap-2">
                                  <CheckCircle2 size={16} /> Execução Básica
                                </h5>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">{exercise.instructions}</p>
                              </div>
                              
                              <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                  <Info size={16} /> Detalhes Técnicos
                                </h5>
                                <p className="text-xs text-slate-400 italic leading-relaxed">{exercise.detailedDescription}</p>
                              </div>
                           </div>
                           
                           <div className="space-y-4">
                              <MotionVideo exercise={exercise} />
                           </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
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
