
import React, { useState, useEffect } from 'react';
import { AppSection } from './types';
import Sidebar from './components/Sidebar';
import AICoach from './components/AICoach';
import AnnualPeriodization from './components/AnnualPeriodization';
import RunningSection from './components/RunningSection';
import Triathlon from './components/Triathlon';
import Hyrox from './components/Hyrox';
import Calisthenics from './components/Calisthenics';
import SwimmingTechnique from './components/SwimmingTechnique';
import SwimmingInfantil from './components/SwimmingInfantil';
import WaterAerobics from './components/WaterAerobics';
import AquaticSafety from './components/AquaticSafety';
import NatacaoAdaptada from './components/NatacaoAdaptada';
import LessonPlanning from './components/LessonPlanning';
import DiagnosticAssessment from './components/DiagnosticAssessment';
import NutricaoDesportiva from './components/NutricaoDesportiva';
import SectionWrapper from './components/SectionWrapper';
import HIITProtocols from './components/HIITProtocols';
import ScientificDocuments from './components/ScientificDocuments';
import TestesAptidaoFisica from './components/TestesAptidaoFisica';
import MusculacaoTerceiraIdade from './components/MusculacaoTerceiraIdade';
import ReabilitacaoMuscular from './components/ReabilitacaoMuscular';
import TriathlonSwimStrategy from './components/TriathlonSwimStrategy';
import { GraduationCap, Dumbbell, Waves, FileText, Footprints, Apple, Timer, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);

  useEffect(() => {
    window.document.documentElement.classList.add('dark');
  }, []);

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return (
          <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto animate-fade-in-up">
            <header className="text-center py-8 md:py-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 uppercase tracking-tighter">
                ASANTOS <span className="text-blue-500 italic">DESPORTO</span>
              </h2>
              <p className="text-sm md:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed px-6">
                A plataforma definitiva para profissionais de Educação Física. Do planeamento escolar à alta performance e gestão desportiva.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
              {[
                { id: AppSection.ESCOLAR, title: 'Educação Física Escolar', icon: GraduationCap, color: 'bg-blue-600', desc: 'Referenciais, Planos e Pedagogia' },
                { id: AppSection.MUSCULACAO, title: 'Musculação', icon: Dumbbell, color: 'bg-slate-700', desc: 'Periodização e Biomecânica' },
                { id: AppSection.NATACAO, title: 'Natação', icon: Waves, color: 'bg-sky-500', desc: 'Técnica e Segurança Aquática' },
                { id: AppSection.TRIATHLON, title: 'Triathlon Performance', icon: Zap, color: 'bg-yellow-500', desc: 'Swim, Bike & Run Combinados' },
                { id: AppSection.HYROX, title: 'Hyrox', icon: Timer, color: 'bg-purple-600', desc: 'Treino Híbrido de Alta Intensidade' },
                { id: AppSection.CORRIDA, title: 'Performance em Corrida', icon: Footprints, color: 'bg-orange-600', desc: 'Ritmo e Planilhas de Endurance' },
                { id: AppSection.NUTRICAO, title: 'Nutrição Desportiva', icon: Apple, color: 'bg-green-600', desc: 'Alimentação para Performance' },
                { id: AppSection.DOCUMENTOS, title: 'Referência Científica', icon: FileText, color: 'bg-emerald-600', desc: 'Base de Dados e Evidências HD' },
              ].map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => setCurrentSection(card.id)}
                  className={`group glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-left flex flex-col items-start gap-4 md:gap-6 animate-fade-in-up stagger-${(i % 5) + 1}`}
                >
                  <div className={`${card.color} text-white p-3 md:p-5 rounded-xl md:rounded-[1.5rem] group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                    <card.icon size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-white tracking-tight">{card.title}</h4>
                    <p className="text-[9px] md:text-[10px] text-slate-400 mt-1 md:mt-2 font-black uppercase tracking-widest opacity-70">{card.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case AppSection.ESCOLAR:
        return (
          <SectionWrapper icon={<GraduationCap />} title="Escolar" subtitle="Planeamento Curricular e Avaliação Diagnóstica." colorClass="bg-blue-600">
            <AICoach section={AppSection.ESCOLAR} />
            <div className="space-y-8 md:space-y-12">
              <LessonPlanning />
              <DiagnosticAssessment />
            </div>
          </SectionWrapper>
        );
      case AppSection.MUSCULACAO:
        return (
          <SectionWrapper icon={<Dumbbell />} title="Musculação" subtitle="Periodização e Biomecânica de Treino." colorClass="bg-slate-700">
            <AICoach section={AppSection.MUSCULACAO} />
            <div className="space-y-8 md:space-y-12">
              <TestesAptidaoFisica />
              <AnnualPeriodization />
              <MusculacaoTerceiraIdade />
              <ReabilitacaoMuscular />
              <Calisthenics />
              <HIITProtocols />
            </div>
          </SectionWrapper>
        );
      case AppSection.CORRIDA:
        return (
          <SectionWrapper icon={<Footprints />} title="Corrida" subtitle="Monitorização de Ritmo e Evolução Semanal." colorClass="bg-orange-600">
            <AICoach section={AppSection.CORRIDA} />
            <div className="pt-2">
              <RunningSection />
            </div>
          </SectionWrapper>
        );
      case AppSection.TRIATHLON:
        return (
          <SectionWrapper icon={<Zap />} title="Triathlon" subtitle="Estratégia e Treino Combinado (Swim/Bike/Run)." colorClass="bg-yellow-500">
            <AICoach section={AppSection.TRIATHLON} />
            <div className="pt-2">
              <Triathlon />
            </div>
          </SectionWrapper>
        );
      case AppSection.NATACAO:
        return (
          <SectionWrapper icon={<Waves />} title="Natação" subtitle="Técnica, Hidroginástica e Salvamento Aquático." colorClass="bg-sky-500">
            <AICoach section={AppSection.NATACAO} />
            <div className="space-y-8 md:space-y-12">
              <SwimmingInfantil />
              <SwimmingTechnique />
              <NatacaoAdaptada />
              <WaterAerobics />
              <AquaticSafety />
            </div>
          </SectionWrapper>
        );
      case AppSection.NUTRICAO:
        return (
          <SectionWrapper icon={<Apple />} title="Nutrição" subtitle="Pirâmide Alimentar e Avaliação Antropométrica." colorClass="bg-green-600">
            <AICoach section={AppSection.NUTRICAO} />
            <div className="space-y-8 md:space-y-12">
              <NutricaoDesportiva />
            </div>
          </SectionWrapper>
        );
      case AppSection.HYROX:
        return (
          <SectionWrapper icon={<Timer />} title="Hyrox" subtitle="Treino Híbrido de Alta Intensidade." colorClass="bg-purple-600">
            <AICoach section={AppSection.HYROX} />
            <div className="pt-2">
              <Hyrox />
            </div>
          </SectionWrapper>
        );
      case AppSection.DOCUMENTOS:
        return (
          <SectionWrapper icon={<FileText />} title="Referência Científica" subtitle="Base de Dados Científicos e Evidências HD." colorClass="bg-emerald-600">
             <AICoach section={AppSection.DOCUMENTOS} />
             <div className="space-y-8 md:space-y-12">
               <TriathlonSwimStrategy />
               <ScientificDocuments />
             </div>
          </SectionWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-darkBg text-white pb-24 md:pb-0">
      <Sidebar currentSection={currentSection} setSection={setCurrentSection} />
      <main className="flex-1 p-4 pt-20 md:p-8 lg:p-12 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
