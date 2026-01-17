
import React from 'react';
import { Droplets, Image as ImageIcon, ExternalLink, Info, LifeBuoy, HeartPulse, PlayCircle } from 'lucide-react';

interface AerobicExercise {
  name: string;
  category: string;
  instructions: string;
  focus: string;
  intensity: 'Baixa' | 'Média' | 'Alta';
  imageUrl: string;
  videoUrl: string;
}

const WATER_EXERCISES: AerobicExercise[] = [
  { name: "Corrida Estacionária", category: "Cardio", instructions: "Correr sem sair do lugar, elevando joelhos a 90º.", focus: "Aquecimento sistémico", intensity: "Média", imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+corrida+estacionaria" },
  { name: "Polichinelo Aquático", category: "Cardio", instructions: "Abrir e fechar pernas e braços em simultâneo.", focus: "Cardiovascular", intensity: "Alta", imageUrl: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+polichinelo+aquatico" },
  { name: "Sessão de Bicicleta", category: "Localizada", instructions: "Apoiado no esparguete, pedalar em suspensão.", focus: "Abdómen e Pernas", intensity: "Média", imageUrl: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+bicicleta+esparguete" },
  { name: "Remada de Peito", category: "Membros Superiores", instructions: "Mãos em concha, empurrar água para os lados.", focus: "Peitoral e Dorsais", intensity: "Alta", imageUrl: "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+remada+peito" },
  { name: "Salto Tesoura", category: "Pliometria", instructions: "Alternar pernas em tesoura com salto explosivo.", focus: "Potência de membros inferiores", intensity: "Alta", imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+salto+tesoura" },
  { name: "Twist de Cintura", category: "Core", instructions: "Rotação de anca com pés fixos ou em salto.", focus: "Oblíquos", intensity: "Média", imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+twist+rotacao" },
  { name: "Impulsão Vertical", category: "Cardio", instructions: "Salto vertical saindo totalmente da água.", focus: "Explosão muscular", intensity: "Alta", imageUrl: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+impulsao+vertical" },
  { name: "Braços em Cruz", category: "Membros Superiores", instructions: "Movimento circular com braços estendidos.", focus: "Mobilidade e força de ombros", intensity: "Baixa", imageUrl: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=500&h=350&fit=crop&q=80", videoUrl: "https://www.youtube.com/results?search_query=hidroginastica+bracos+cruz" }
];

const WaterAerobics: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-cyan-50/30 dark:bg-cyan-900/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-600 p-2 rounded-xl text-white shadow-lg"><Droplets size={22} /></div>
          <div><h3 className="text-xl font-bold text-white uppercase tracking-tight">Módulo de Hidroginástica</h3><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base de Dados de Exercícios</p></div>
        </div>
        <div className="flex gap-2"><HeartPulse className="text-rose-500 animate-pulse" size={20} /><LifeBuoy className="text-cyan-500" size={20} /></div>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WATER_EXERCISES.map((exercise, idx) => (
          <div 
            key={idx} 
            className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-cyan-500/30 transition-all flex flex-col group"
          >
            <span className="text-[8px] font-black bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase mb-3 self-start">{exercise.category}</span>
            <div className="mb-3 rounded-xl overflow-hidden bg-slate-800/50 flex items-center justify-center h-40">
              <img 
                src={exercise.imageUrl} 
                alt={exercise.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23334155" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dominant-baseline="middle" fill="%2364748b" font-family="Arial" font-size="12"%3ESem imagem%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <h4 className="text-sm font-black text-white uppercase mb-2 leading-tight">{exercise.name}</h4>
            <p className="text-[10px] text-slate-500 mb-3 flex-grow italic leading-relaxed">"{exercise.instructions}"</p>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
               <span className="text-[9px] font-black text-cyan-500 uppercase tracking-wider">{exercise.intensity}</span>
               <div className="flex items-center gap-1">
                 <ImageIcon size={14} className="text-cyan-500" />
                 <span className="text-[8px] text-slate-600 uppercase">Visual</span>
               </div>
            </div>
            <a 
              href={exercise.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <PlayCircle size={15} /> Tutorial YouTube <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterAerobics;
