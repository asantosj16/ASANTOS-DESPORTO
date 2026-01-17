
import React, { useState } from 'react';
import { getProfessionalAdvice } from '../services/geminiService';
import { AppSection, AICoachResponse } from '../types';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface AICoachProps {
  section: AppSection;
}

const AICoach: React.FC<AICoachProps> = ({ section }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AICoachResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const result = await getProfessionalAdvice(section, query);
    setResponse(result);
    setLoading(false);
    setQuery('');
  };

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl rounded-[1.5rem] md:rounded-3xl p-4 md:p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-3 md:mb-4 text-slate-900 dark:text-white">
        <Sparkles className="text-blue-500 dark:text-blue-400" size={20} />
        <h3 className="text-lg md:text-xl font-bold">Consultor IA Profissional</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="relative mb-4 md:mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Como planear aula de Parkour?"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl md:rounded-2xl py-3 md:py-4 pl-4 md:pl-6 pr-12 md:pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-100 text-sm md:text-base"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="absolute right-1.5 top-1.5 p-2 md:p-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg md:rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="animate-spin size-5" /> : <Send size={18} />}
        </button>
      </form>

      {response && (
        <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 md:p-4 rounded-xl md:rounded-2xl border border-blue-100 dark:border-blue-800">
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-xs md:text-sm">{response.advice}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 md:p-4 rounded-xl md:rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs md:text-sm uppercase tracking-wider">Principais Dicas:</h4>
              <ul className="list-disc list-inside text-[11px] md:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                {response.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
              </ul>
            </div>
            
            {response.suggestedDrills && response.suggestedDrills.length > 0 && (
              <div className="bg-green-50/50 dark:bg-green-900/20 p-3 md:p-4 rounded-xl md:rounded-2xl border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs md:text-sm uppercase tracking-wider">Prática Sugerida:</h4>
                <ul className="list-disc list-inside text-[11px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  {response.suggestedDrills.map((drill, idx) => <li key={idx}>{drill}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
