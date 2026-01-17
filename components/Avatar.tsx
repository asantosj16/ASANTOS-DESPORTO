
import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Loader2 } from 'lucide-react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '', onClick }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Caminho relativo para garantir portabilidade entre diferentes bases de URL
  const avatarUrl = "images/Perfil.jpg"; 

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 40,
    xl: 56,
  };

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [avatarUrl]);

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-full flex items-center justify-center bg-slate-900 border-2 border-slate-700/50 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group ${sizeClasses[size]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center z-10">
        {!error ? (
          <>
            <img
              src={avatarUrl}
              alt="Perfil"
              className={`w-full h-full object-cover object-top transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <Loader2 size={iconSizes[size] * 0.4} className="text-blue-500 animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 bg-slate-900 w-full h-full">
            <User size={iconSizes[size] * 0.5} strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      {size === 'xl' && (
        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full border-2 border-slate-950 shadow-lg z-20">
           <ShieldCheck size={14} fill="currentColor" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
