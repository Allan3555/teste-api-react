
export interface UserData {
  name: string;
  birthDate: string;
  motherName: string;
  cpf: string;
  gender?: string;
}

export const storeUserData = (data: UserData): void => {
  sessionStorage.setItem('userData', JSON.stringify(data));
};

export const getUserData = (): UserData | null => {
  const data = sessionStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

export const formatCpf = (cpf: string): string => {
  // Remove all non-numeric characters
  const cleanedCpf = cpf.replace(/\D/g, '');
  
  // Format as XXX.XXX.XXX-XX
  if (cleanedCpf.length === 11) {
    return `${cleanedCpf.substring(0, 3)}.${cleanedCpf.substring(3, 6)}.${cleanedCpf.substring(6, 9)}-${cleanedCpf.substring(9, 11)}`;
  }
  
  return cleanedCpf;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const getCurrentDatePlusDays = (days: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

export const getBrazilianFormattedDate = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};
