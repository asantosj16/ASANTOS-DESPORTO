
import React from 'react';

interface SectionWrapperProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ icon, title, subtitle, colorClass, children }) => {
  return (
    <div className="space-y-6 md:space-y-12 max-w-6xl mx-auto animate-fade-in-up">
      <header className="text-center py-8 md:py-16 relative">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 ${colorClass}/10 rounded-full blur-[60px] md:blur-[120px] -z-10`}></div>
        
        <div className={`${colorClass} text-white p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] inline-block mb-4 md:mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-500`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 24, className: 'md:w-8 md:h-8' })}
        </div>
        
        <h2 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-6 uppercase tracking-tighter leading-none px-2">
          {title}
        </h2>
        
        <p className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed px-6">
          {subtitle}
        </p>
      </header>
      
      <div className="space-y-8 md:space-y-12">
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
