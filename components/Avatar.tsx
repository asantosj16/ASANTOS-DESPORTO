
import React, { useState } from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '', onClick }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Caminho absoluto para a imagem local ou externa estável
  const avatarUrl = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200"; 

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
      <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/30 to-sky-400/30 rounded-full blur-md opacity-100 group-hover:opacity-70 transition-opacity"></div>

      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
        {!error ? (
          <>
            <img
              src={avatarUrl}
              alt="Perfil Profissional"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-600">
                <User size={iconSizes[size] * 0.6} className="animate-pulse" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 bg-slate-900 w-full h-full">
            <User size={iconSizes[size] * 0.6} strokeWidth={1.5} className="opacity-40" />
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
