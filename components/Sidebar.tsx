
import React from 'react';
import { AppSection } from '../types';
import { Home, School, Dumbbell, Waves, FileText, Footprints, Activity, Timer, Zap } from 'lucide-react';
import Avatar from './Avatar';

interface SidebarProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { id: AppSection.HOME, label: 'Início', icon: Home },
    { id: AppSection.ESCOLAR, label: 'Escolar', icon: School },
    { id: AppSection.MUSCULACAO, label: 'Treino', icon: Dumbbell },
    { id: AppSection.NATACAO, label: 'Água', icon: Waves },
    { id: AppSection.CORRIDA, label: 'Corrida', icon: Footprints },
    { id: AppSection.TRIATHLON, label: 'Triathlon', icon: Zap },
    { id: AppSection.HYROX, label: 'Hyrox', icon: Timer },
    { id: AppSection.NUTRICAO, label: 'Saúde', icon: Activity },
    { id: AppSection.DOCUMENTOS, label: 'Referências', icon: FileText },
  ];

  return (
    <>
      {/* Header Mobile - Branding & Avatar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-3xl border-b border-white/5 z-[250] flex items-center justify-between px-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <Avatar size="sm" className="ring-1 ring-blue-500/30" onClick={() => setSection(AppSection.HOME)} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">ASANTOS</span>
            <span className="text-sm font-black text-white uppercase tracking-tighter leading-none">DESPORTO</span>
          </div>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="
        fixed bottom-0 left-0 right-0 h-[76px]
        bg-slate-950/95 backdrop-blur-3xl border-t border-white/5 z-[250] 
        flex flex-row items-center
        md:relative md:w-72 md:h-screen md:border-t-0 md:border-r md:border-slate-800 md:bg-slate-950/40
        md:flex-col md:justify-start md:gap-4 md:p-6 md:inset-auto 
        transition-all duration-500
      ">
        {/* Header Desktop */}
        <div className="hidden md:flex flex-col items-center gap-6 mb-10 px-4 text-center w-full">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">ASANTOS</h1>
            <h2 className="text-lg font-bold tracking-[0.2em] text-blue-500 uppercase leading-none">DESPORTO</h2>
          </div>
          <Avatar size="xl" className="ring-4 ring-slate-800/30 shadow-2xl" onClick={() => setSection(AppSection.HOME)} />
        </div>
        
        {/* Menu Items */}
        <div className="
          flex flex-row md:flex-col gap-1 md:gap-2
          w-full h-full md:h-auto items-center 
          overflow-x-auto no-scrollbar snap-x snap-mandatory 
          px-4 md:px-0
        ">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(10);
                  }
                }}
                className={`
                  relative flex flex-col items-center justify-center shrink-0 
                  min-w-[72px] md:min-w-0 h-full snap-center
                  md:flex-row md:justify-start md:w-full md:px-5 md:py-3.5 md:h-auto
                  rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'text-blue-400 md:bg-blue-600 md:text-white md:shadow-lg md:shadow-blue-900/40' 
                    : 'text-slate-500 hover:text-slate-300 md:hover:bg-white/5 md:hover:text-white'}
                `}
              >
                <div className={`
                  flex flex-col items-center md:flex-row gap-1.5 md:gap-4 relative z-10
                  transition-all duration-300 ${isActive ? '-translate-y-0.5 md:translate-y-0 scale-110 md:scale-100' : ''}
                `}>
                  <item.icon 
                    size={isActive ? 24 : 20} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''}`}
                  />
                  <span className={`
                    text-[9px] md:text-xs font-black md:font-bold tracking-tight uppercase
                    ${isActive ? 'opacity-100' : 'opacity-60 md:opacity-100'}
                    transition-all duration-300
                  `}>
                    {item.label}
                  </span>
                </div>

                {/* Indicador de Seleção Mobile */}
                {isActive && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full md:hidden"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
