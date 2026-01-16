
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
      fixed bottom-0 left-0 right-0 h-16
      bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 z-[100] 
      flex flex-row items-center
      md:relative md:w-72 md:h-screen md:border-t-0 md:border-r md:bg-transparent 
      md:flex-col md:justify-start md:gap-4 md:p-6 md:shadow-none md:rounded-none md:inset-auto 
      transition-all duration-300
    ">
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
      
      <div className="flex flex-row md:flex-col gap-0 md:gap-3 w-full h-full md:h-auto items-center overflow-x-auto no-scrollbar px-2 md:px-0">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`
                relative flex flex-col items-center justify-center shrink-0 w-[20%] min-w-[64px]
                md:flex-row md:justify-start md:w-full md:px-5 md:py-4 
                rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'text-blue-400 md:bg-blue-600 md:text-white md:shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300 md:hover:bg-slate-800/50 md:hover:text-white'}
              `}
            >
              <div className="flex flex-col items-center md:flex-row gap-0.5 md:gap-4 relative z-10">
                <item.icon 
                  size={isActive ? 20 : 18} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-300 md:size-[22px] ${isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110' : 'group-hover:scale-110'}`}
                />
                <span className={`
                  text-[7px] md:text-sm font-black md:font-bold tracking-tight uppercase md:normal-case
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-60 md:opacity-100 md:font-medium'}
                  transition-all duration-300
                `}>
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full md:hidden"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
