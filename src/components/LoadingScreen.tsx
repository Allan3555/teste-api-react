
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import GovBrLogo from './GovBrLogo';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, message = 'Carregando dados...' }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simular progresso de carregamento
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500); // Pequeno atraso adicional para mostrar 100% completo
          return 100;
        }
        return newProgress;
      });
    }, 50); // Ajuste este valor para tornar o carregamento mais rápido ou mais lento
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="w-64 text-center">
        <GovBrLogo />
        <div className="mt-6 mb-4">
          <Loader className="animate-spin mx-auto text-[#003087]" size={48} />
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#003087] h-2 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
