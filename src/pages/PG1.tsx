
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, formatDate } from '@/utils/dataUtils';
import GovBrLogo from '@/components/GovBrLogo';
import LoadingScreen from '@/components/LoadingScreen';
import { useIsMobile } from '@/hooks/use-mobile';

const PG1: React.FC = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // If no user data is found, redirect to the index page
    if (!userData) {
      navigate('/');
    }
    
    console.log("Dados do usuário carregados:", userData);
  }, [navigate, userData]);
  
  if (!userData) {
    return null; // This will prevent rendering while redirecting
  }

  // Get current date and add one year for deadline
  const currentDate = new Date();
  const deadlineDate = new Date(currentDate);
  deadlineDate.setFullYear(deadlineDate.getFullYear() + 1);
  
  // Format the deadline date in Brazilian format
  const formattedDeadline = `${deadlineDate.getDate().toString().padStart(2, '0')}/${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}/${deadlineDate.getFullYear()}`;
  
  // Adjust birth date by adding one day if needed
  const adjustBirthDate = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1); // Add one day
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    } catch (error) {
      console.error('Error formatting birth date:', error);
      return formatDate(dateString);
    }
  };
  
  const handleRegularize = () => {
    // Mostrar tela de carregamento antes de navegar
    setLoading(true);
  };

  const handleLoadingComplete = () => {
    navigate('/pg2');
  };

  // Obter as iniciais do nome para o avatar
  const getInitials = (name: string) => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };
  
  const initials = getInitials(userData.name);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} message="Preparando sua regularização..." />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white p-4 shadow-sm">
            <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-center max-w-7xl mx-auto`}>
              <div className="flex items-center mb-2">
                <GovBrLogo />
                <div className="ml-4">
                  <p className="font-bold">Meu Imposto de Renda</p>
                  <p className="text-sm text-gray-600">Receita Federal</p>
                </div>
              </div>
              <div className={`flex items-center ${isMobile ? 'mt-2 w-full justify-between' : ''}`}>
                <div className={`${isMobile ? '' : 'text-right'} mr-4`}>
                  <p className="font-bold">{userData?.name || 'Nome não disponível'}</p>
                  <p className="text-sm">{userData?.cpf || 'CPF não disponível'}</p>
                </div>
                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span>{initials}</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Status Bar */}
          <div className="bg-red-100 py-2 border-y border-red-200">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-sm text-center sm:text-left">Status: <span className="text-red-600 font-medium">REGULARIZAÇÃO NECESSÁRIA</span></p>
            </div>
          </div>
          
          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h1 className="text-xl font-bold mb-6 text-center sm:text-left">Confirmação de Dados</h1>
              
              {/* User Data Box */}
              <div className="bg-govbr-pink p-4 md:p-6 rounded-md border border-red-200 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <h2 className="text-lg font-bold break-words">{userData?.name || 'Nome não disponível'}</h2>
                </div>
                
                <div className="ml-8">
                  <p className="mb-1"><span className="font-medium">Data de nascimento:</span> {userData?.birthDate ? adjustBirthDate(userData.birthDate) : 'Não disponível'}</p>
                  <p className="mb-1"><span className="font-medium">Sexo:</span> {userData?.gender || 'Não informado'}</p>
                  {userData?.motherName && (
                    <p className="mb-1"><span className="font-medium">Nome da mãe:</span> {userData.motherName}</p>
                  )}
                  <p className="mb-4"><span className="font-medium">CPF:</span> <span className="text-red-600">{userData?.cpf || 'Não disponível'} (Em suspensão)</span></p>
                  
                  <div className={`${isMobile ? '' : 'flex justify-between'} mb-2`}>
                    <p className="mb-1"><span className="font-medium">Nº da Infração:</span> RF776437</p>
                    <p><span className="font-medium">Prazo final:</span> <span className="text-red-600">{formattedDeadline}</span></p>
                  </div>
                  
                  <p><span className="font-medium">Status:</span> <span className="text-red-600">Pendente - Regularização necessária</span></p>
                </div>
              </div>
              
              {/* Warning Box */}
              <div className="bg-govbr-yellow p-4 md:p-6 rounded-md border border-yellow-300 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <h2 className="text-lg font-bold">IRREGULARIDADE FISCAL GRAVE DETECTADA</h2>
                </div>
                
                <p className="ml-8 mb-2 text-justify sm:text-left">Foi identificada uma <span className="text-red-600 font-medium">irregularidade crítica</span> relacionada à <span className="font-medium">Declaração do Imposto de Renda 2024</span>. Nossos sistemas detectaram:</p>
                
                <ul className="ml-12 list-disc mb-4">
                  <li className="mb-2">Entrega incorreta da declaração com dados inconsistentes, ou</li>
                  <li>Não entrega da declaração dentro do prazo legal</li>
                </ul>
                
                <p className="ml-8 text-justify sm:text-left">De acordo com o <span className="font-medium">Art. 1º da Lei nº 9.430/1996</span> e as normativas vigentes da Receita Federal, a não regularização imediata desta situação acarretará em sanções severas, incluindo multa de até <span className="text-red-600 font-medium">150% do valor devido</span> e juros progressivos.</p>
              </div>
              
              {/* Consequences Box */}
              <div className="bg-govbr-pink p-4 md:p-6 rounded-md border border-red-200 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h2 className="text-lg font-bold">CONSEQUÊNCIAS IMEDIATAS DA NÃO REGULARIZAÇÃO:</h2>
                </div>
                
                <p className="ml-8 mt-2 mb-3 text-justify sm:text-left">Se a situação não for regularizada imediatamente, você estará sujeito a penalidades graves.</p>
                
                <div className="ml-8">
                  <div className="flex mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <p><span className="font-bold">Multa agravada de até 150%</span> sobre o imposto devido.</p>
                  </div>
                  
                  <div className="flex mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <p><span className="font-bold">Bloqueio do CPF</span> com suspensão de serviços bancários.</p>
                  </div>
                  
                  <div className="flex mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <p><span className="font-bold">Inclusão no CADIN e SERASA</span>, afetando seu crédito.</p>
                  </div>
                  
                  <div className="flex mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <p><span className="font-bold">Possível penhora de bens</span> via processo administrativo fiscal.</p>
                  </div>
                  
                  <div className="flex mb-2">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <p><span className="font-bold">Restrição para emissão de passaporte</span> e viagens.</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="mt-8">
                <button 
                  onClick={handleRegularize}
                  className="govbr-btn"
                >
                  REGULARIZAR AGORA
                </button>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default PG1;

