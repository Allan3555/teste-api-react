
import { UserData } from "../utils/dataUtils";

// Updated webhook URL
const API_URL = 'https://webhook.oportunidadesahora.shop/webhook/consultar-dados';

export const verifyCpf = async (cpf: string): Promise<UserData> => {
  try {
    // Realizar a chamada ao webhook atualizado
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
    console.log("Resposta do webhook:", data);
    
    // Verifica se a resposta contém os dados esperados
    if (data && data.status === 200) {
      // Mapeia os dados do webhook para o formato esperado pelo aplicativo
      return {
        name: data.nome,
        birthDate: convertBrazilianDateToISO(data.nascimento),
        motherName: data.mae,
        cpf: data.cpf,
        gender: data.sexo
      };
    }
    
    // Verificação alternativa para quando a resposta vem em formato de array
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
  if (!brazilianDate) return '';
  
  try {
    const [day, month, year] = brazilianDate.split('/');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error converting date format:', error);
    return brazilianDate;
  }
}
