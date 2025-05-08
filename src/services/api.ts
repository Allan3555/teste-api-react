
import { UserData } from "../utils/dataUtils";

// Replace with actual API URL in production
const API_URL = 'https://your-api.com/webhook';

export const verifyCpf = async (cpf: string): Promise<UserData> => {
  try {
    // In a real application, this would be a real API call
    // For demo purposes, we'll simulate a successful response
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return hardcoded data for a specific CPF
    if (cpf === '276.575.658-96') {
      return {
        name: "Edvania Vilas Boas Contieri",
        birthDate: "1975-04-15",
        motherName: "",
        cpf: "276.575.658-96"
      };
    }
    
    // For any other CPF, throw an error
    throw new Error('CPF inválido');
  } catch (error) {
    throw error;
  }
};
