
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Footprints, User } from 'lucide-react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '', onClick }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Caminho da imagem (ajustado para a raiz do servidor de desenvolvimento)
  const avatarUrl = "images/Perfil.jpg"; 

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 40,
    xl: 56,
  };

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-full flex items-center justify-center bg-slate-900 border-2 border-slate-700/50 shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group ${sizeClasses[size]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Efeito de brilho de fundo */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/20 to-sky-400/20 rounded-full blur-md opacity-100"></div>

      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
        {!error ? (
          <>
            <img
              src={avatarUrl}
              alt="Perfil"
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <User size={iconSizes[size] * 0.6} className="text-slate-600 animate-pulse" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 bg-slate-900 w-full h-full">
            <User size={iconSizes[size] * 0.6} strokeWidth={1.5} className="opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          </div>
        )}
      </div>
      
      {size === 'xl' && (
        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full border-2 border-slate-950 shadow-lg z-20">
           <ShieldCheck size={14} fill="currentColor" />
        </div>
      )}

      {/* Camada de brilho superior */}
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/5 pointer-events-none z-10"></div>
    </div>
  );
};

export default Avatar;
