
import React from 'react';
import { Users, Dumbbell, Heart, Shield, CheckCircle } from 'lucide-react';

const MusculacaoTerceiraIdade: React.FC = () => {
  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8">
      <div className="flex items-start gap-4">
        <div className="bg-amber-600/20 text-amber-400 p-3 md:p-4 rounded-xl md:rounded-2xl">
          <Users size={28} className="md:w-8 md:h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Musculação para Terceira Idade
          </h3>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            Treino de força adaptado para idosos com foco em funcionalidade, segurança e qualidade de vida
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Benefícios */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="text-rose-400" size={20} />
            <h4 className="text-lg font-bold text-white">Benefícios Principais</h4>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Prevenção de sarcopenia (perda de massa muscular)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Melhoria da densidade óssea e prevenção de osteoporose</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Aumento da independência funcional</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Redução do risco de quedas</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Melhoria do equilíbrio e coordenação</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={16} />
              <span>Controlo glicémico e saúde cardiovascular</span>
            </li>
          </ul>
        </div>

        {/* Orientações de Segurança */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-400" size={20} />
            <h4 className="text-lg font-bold text-white">Orientações de Segurança</h4>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Avaliação médica prévia obrigatória</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Aquecimento prolongado (10-15 minutos)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Progressão gradual de cargas</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Evitar manobra de Valsalva (respiração forçada)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Preferência por máquinas e movimentos guiados</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Monitorização da pressão arterial</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Protocolo de Treino */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Dumbbell className="text-amber-400" size={20} />
          <h4 className="text-lg font-bold text-white">Protocolo de Treino Recomendado</h4>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="text-amber-400 font-bold mb-2">Frequência</div>
            <div className="text-slate-300 text-sm">2-3 sessões por semana</div>
            <div className="text-slate-400 text-xs mt-1">Mínimo 48h de recuperação</div>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="text-amber-400 font-bold mb-2">Intensidade</div>
            <div className="text-slate-300 text-sm">50-70% de 1RM</div>
            <div className="text-slate-400 text-xs mt-1">Moderada, com controlo técnico</div>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="text-amber-400 font-bold mb-2">Volume</div>
            <div className="text-slate-300 text-sm">2-3 séries x 10-15 reps</div>
            <div className="text-slate-400 text-xs mt-1">Foco em resistência muscular</div>
          </div>
        </div>
      </div>

      {/* Exemplo de Sessão */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">Exemplo de Sessão de Treino</h4>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-slate-300">
            <thead className="text-xs uppercase bg-slate-700 text-amber-400">
              <tr>
                <th scope="col" className="px-6 py-3">Fase do Treino</th>
                <th scope="col" className="px-6 py-3">Exercício</th>
                <th scope="col" className="px-6 py-3">Séries / Reps / Tempo</th>
                <th scope="col" className="px-6 py-3">Notas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">1. Aquecimento</td>
                <td className="px-6 py-4">Caminhada leve<br/>Mobilidade articular<br/>Alongamentos dinâmicos</td>
                <td className="px-6 py-4">10-15 min</td>
                <td className="px-6 py-4">Preparação articular e elevação da temperatura</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white" rowSpan={8}>2. Treino de Força</td>
                <td className="px-6 py-4">Leg Press</td>
                <td className="px-6 py-4">3 x 12</td>
                <td className="px-6 py-4">Foco em quadríceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Cadeira Extensora</td>
                <td className="px-6 py-4">2 x 12</td>
                <td className="px-6 py-4">Isolamento de quadríceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Cadeira Flexora</td>
                <td className="px-6 py-4">2 x 12</td>
                <td className="px-6 py-4">Posterior da coxa</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Supino na máquina</td>
                <td className="px-6 py-4">3 x 12</td>
                <td className="px-6 py-4">Peitoral e tríceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Remada na máquina</td>
                <td className="px-6 py-4">3 x 12</td>
                <td className="px-6 py-4">Costas e bíceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Desenvolvimento na máquina</td>
                <td className="px-6 py-4">2 x 12</td>
                <td className="px-6 py-4">Ombros</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Rosca direta (Halteres/Cabo)</td>
                <td className="px-6 py-4">2 x 12</td>
                <td className="px-6 py-4">Bíceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4">Tríceps no pulley</td>
                <td className="px-6 py-4">2 x 12</td>
                <td className="px-6 py-4">Tríceps</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">3. Trabalho de Equilíbrio</td>
                <td className="px-6 py-4">Apoio unipodal<br/>Marcha com obstáculos<br/>Exercícios propriocetivos</td>
                <td className="px-6 py-4">5-10 min</td>
                <td className="px-6 py-4">Prevenção de quedas</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">4. Cardio Final</td>
                <td className="px-6 py-4">Bicicleta ergométrica ou Elíptica</td>
                <td className="px-6 py-4">10 min</td>
                <td className="px-6 py-4">Intensidade leve a moderada</td>
              </tr>
              <tr className="bg-slate-800 border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">5. Alongamentos</td>
                <td className="px-6 py-4">Alongamentos estáticos (Corpo todo)</td>
                <td className="px-6 py-4">5-10 min</td>
                <td className="px-6 py-4">Relaxamento</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contraindicações */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="text-red-400 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-red-400 mb-2">Contraindicações Absolutas</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Enfarte do miocárdio recente (últimos 6 meses)</li>
              <li>• Angina instável</li>
              <li>• Hipertensão não controlada (&gt;180/110 mmHg)</li>
              <li>• Arritmias graves não controladas</li>
              <li>• Fracturas recentes não consolidadas</li>
              <li>• Processos inflamatórios agudos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nota Final */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
        <div className="text-sm text-slate-300">
          <span className="font-bold text-amber-400">Nota Importante:</span> Cada idoso é único. 
          A individualização do treino é fundamental, considerando comorbilidades, capacidade funcional, 
          experiência prévia e objetivos pessoais. Acompanhamento profissional qualificado é essencial.
        </div>
      </div>
    </div>
  );
};

export default MusculacaoTerceiraIdade;
