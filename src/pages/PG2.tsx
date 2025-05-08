
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '@/utils/dataUtils';
import { Button } from '@/components/ui/button';
import GovBrLogo from '@/components/GovBrLogo';
import { FileText } from 'lucide-react';

const PG2: React.FC = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  
  useEffect(() => {
    // If no user data is found, redirect to the index page
    if (!userData) {
      navigate('/');
    }
  }, [navigate, userData]);
  
  if (!userData) {
    return null; // This will prevent rendering while redirecting
  }
  
  const handleGenerateDARP = () => {
    // In a real application, this would redirect to a payment page or generate a PDF
    window.open('https://your-redirect.com', '_blank');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <GovBrLogo />
            <div className="ml-4">
              <p className="font-bold">Meu Imposto de Renda</p>
              <p className="text-sm text-gray-600">Receita Federal</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right mr-4">
              <p className="font-bold">{userData.name}</p>
              <p className="text-sm">{userData.cpf}</p>
            </div>
            <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
              <span>EV</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* DARF Header */}
      <div className="bg-[#003087] py-3 border-y text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center font-medium">DARF - Documento de Arrecadação de Receitas Federais</p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* User and Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Nome</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">CPF</p>
              <p className="font-medium">{userData.cpf}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Período de Apuração</p>
              <p className="font-medium">13/12/2024</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Data de Vencimento</p>
              <p className="font-medium">08/05/2025</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Número de Referência</p>
              <p className="font-medium">RF776437</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Código da Receita</p>
              <p className="font-medium">5952</p>
            </div>
          </div>
          
          {/* Payment Table */}
          <div className="border-t pt-4 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <p className="text-gray-500 text-sm">Descrição</p>
              <p className="text-gray-500 text-sm text-right">Valor</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <p>Principal</p>
              <p className="text-right">R$ 93,40</p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <p>Multa</p>
              <p className="text-right">R$ 33,37</p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <p>Juros</p>
              <p className="text-right">R$ 10,39</p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 font-bold">
              <p>Valor Total</p>
              <p className="text-right">R$ 137,16</p>
            </div>
          </div>
          
          {/* Warning Box */}
          <div className="bg-govbr-yellow p-4 rounded-md border border-yellow-300 mb-6">
            <p className="flex mb-2">
              <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">Atenção: O não pagamento até a data de vencimento resultará em:</span>
            </p>
            
            <ul className="ml-8 list-disc">
              <li className="mb-1">Acréscimo de multa de 20% sobre o valor total</li>
              <li className="mb-1">Juros de mora calculados com base na taxa SELIC</li>
              <li>Inscrição em Dívida Ativa da União</li>
            </ul>
          </div>
          
          <div className="text-center text-gray-500 text-sm mb-6">
            <p>Documento gerado eletronicamente • Código de Autenticação: 74hSk06S7yeW</p>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleGenerateDARP}
              className="govbr-btn flex items-center justify-center"
            >
              <FileText className="mr-2" size={20} />
              Gerar DARF de pagamento
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PG2;
