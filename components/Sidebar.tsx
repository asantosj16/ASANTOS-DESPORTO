
import React from 'react';
import { AppSection } from '../types';
import { Home, School, Dumbbell, Waves, FileText, Footprints, Activity, Timer } from 'lucide-react';
import Avatar from './Avatar';

interface SidebarProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { id: AppSection.HOME, label: 'Início', icon: Home },
    { id: AppSection.ESCOLAR, label: 'Escolar', icon: School },
    { id: AppSection.MUSCULACAO, label: 'Musculação', icon: Dumbbell },
    { id: AppSection.NATACAO, label: 'Natação', icon: Waves },
    { id: AppSection.CORRIDA, label: 'Corrida', icon: Footprints },
    { id: AppSection.NUTRICAO, label: 'Nutrição', icon: Activity },
    { id: AppSection.HYROX, label: 'Hyrox', icon: Timer },
    { id: AppSection.DOCUMENTOS, label: 'Docs', icon: FileText },
  ];

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 h-20
      bg-slate-950/80 backdrop-blur-3xl border-t border-white/10 z-[100] 
      flex flex-row items-center
      md:relative md:w-72 md:h-screen md:border-t-0 md:border-r md:border-slate-800 md:bg-slate-950/20
      md:flex-col md:justify-start md:gap-4 md:p-6 md:shadow-none md:rounded-none md:inset-auto 
      transition-all duration-500
    ">
      {/* Header Mobile (Opcional, escondido aqui mas pode ser usado para branding) */}
      
      {/* Header Desktop */}
      <div className="hidden md:flex flex-col items-center gap-6 mb-10 px-4 text-center w-full">
        <div className="space-y-1">
          <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">
            ASANTOS
          </h1>
          <h2 className="text-lg font-bold tracking-[0.2em] text-blue-500 uppercase leading-none">
            DESPORTO
          </h2>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-2 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition duration-700"></div>
          <Avatar 
            size="xl" 
            className="ring-4 ring-slate-800/50"
            onClick={() => setSection(AppSection.HOME)} 
          />
        </div>
      </div>
      
      {/* Navegação Principal */}
      <div className="
        flex flex-row md:flex-col gap-1 md:gap-3 
        w-full h-full md:h-auto items-center 
        overflow-x-auto no-scrollbar snap-x snap-mandatory 
        px-4 md:px-0
      ">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`
                relative flex flex-col items-center justify-center shrink-0 
                w-[22%] min-w-[72px] h-full snap-center
                md:flex-row md:justify-start md:w-full md:px-5 md:py-4 md:h-auto
                rounded-2xl transition-all duration-300 group
                active:scale-90
                ${isActive 
                  ? 'text-blue-400 md:bg-blue-600 md:text-white md:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]' 
                  : 'text-slate-500 hover:text-slate-300 md:hover:bg-slate-800/40 md:hover:text-white'}
              `}
            >
              <div className={`
                flex flex-col items-center md:flex-row gap-1 md:gap-4 relative z-10
                transition-transform duration-300 ${isActive ? '-translate-y-1 md:translate-y-0' : ''}
              `}>
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`
                    transition-all duration-300 md:size-[22px]
                    ${isActive 
                      ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-110' 
                      : 'group-hover:scale-110 group-active:scale-95'}
                  `}
                />
                <span className={`
                  text-[9px] md:text-sm font-black md:font-bold tracking-tight uppercase md:normal-case
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-60 md:opacity-100 md:font-medium'}
                  transition-all duration-300 whitespace-nowrap
                `}>
                  {item.label}
                </span>
              </div>

              {/* Indicador Ativo Mobile */}
              {isActive && (
                <>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] md:hidden"></div>
                  <div className="absolute inset-x-2 inset-y-2 bg-blue-500/10 rounded-xl md:hidden animate-pulse"></div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
