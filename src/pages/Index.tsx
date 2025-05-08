
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import CpfInput from '@/components/CpfInput';
import GovBrLogo from '@/components/GovBrLogo';
import { verifyCpf } from '@/services/api';
import { storeUserData } from '@/utils/dataUtils';

const Index: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate CPF format (basic validation)
    if (cpf.length !== 14) {
      setError('CPF inválido. Digite um CPF com 11 dígitos.');
      return;
    }
    
    try {
      setLoading(true);
      const userData = await verifyCpf(cpf);
      
      // Store user data in session storage
      storeUserData(userData);
      
      // Navigate to confirmation page
      navigate('/pg1');
    } catch (error) {
      console.error('Error verifying CPF:', error);
      setError('CPF inválido ou não encontrado.');
      toast({
        title: "Erro",
        description: "CPF inválido ou não encontrado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="govbr-bg">
      <div className="govbr-card">
        <GovBrLogo />
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">Bem-vindo ao CPF Brasil</h1>
          <p className="text-gray-600">do GOV.br</p>
        </div>
        
        <p className="text-sm text-center mb-6">
          Ao entrar, você concorda com nosso{' '}
          <a href="#" className="text-blue-600">
            Termo de Responsabilidade e Política de Privacidade
          </a>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="cpf" className="block mb-2 text-sm font-medium">
              Digite seu CPF para acessar
            </label>
            <CpfInput 
              value={cpf} 
              onChange={setCpf} 
              error={error} 
            />
          </div>
          
          <button 
            type="submit" 
            className="govbr-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner mr-2"></span>
                <span>PROCESSANDO...</span>
              </>
            ) : (
              'ENTRAR COM O GOV.BR'
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
