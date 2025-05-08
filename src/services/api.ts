
import { UserData } from "../utils/dataUtils";

// Real webhook URL
const API_URL = 'https://webhook.autominds.com.br/webhook/dados-pessoa';

export const verifyCpf = async (cpf: string): Promise<UserData> => {
  try {
    // Realizar a chamada ao webhook real
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf })
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verifica se a resposta contém os dados esperados
    if (Array.isArray(data) && data.length > 0 && data[0].status === 200) {
      const userData = data[0];
      
      // Mapeia os dados do webhook para o formato esperado pelo aplicativo
      return {
        name: userData.nome,
        birthDate: convertBrazilianDateToISO(userData.nascimento),
        motherName: userData.mae,
        cpf: userData.cpf,
        gender: userData.sexo
      };
    }
    
    throw new Error('CPF inválido ou resposta inesperada do servidor');
  } catch (error) {
    console.error('Erro ao verificar CPF:', error);
    throw error;
  }
};

// Função auxiliar para converter data no formato brasileiro (DD/MM/YYYY) para ISO (YYYY-MM-DD)
function convertBrazilianDateToISO(brazilianDate: string): string {
  const [day, month, year] = brazilianDate.split('/');
  return `${year}-${month}-${day}`;
}
