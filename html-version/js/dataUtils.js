
// Utility functions for data handling

function formatCpf(cpf) {
  // Remove all non-numeric characters
  const cleanedCpf = cpf.replace(/\D/g, '');
  
  // Format as XXX.XXX.XXX-XX
  if (cleanedCpf.length === 11) {
    return `${cleanedCpf.substring(0, 3)}.${cleanedCpf.substring(3, 6)}.${cleanedCpf.substring(6, 9)}-${cleanedCpf.substring(9, 11)}`;
  }
  
  return cleanedCpf;
}

function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

function getCurrentDatePlusDays(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function getBrazilianFormattedDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function convertBrazilianDateToISO(brazilianDate) {
  if (!brazilianDate) return '';
  
  try {
    const [day, month, year] = brazilianDate.split('/');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error converting date format:', error);
    return brazilianDate;
  }
}

function adjustBirthDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Add one day
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting birth date:', error);
    return formatDate(dateString);
  }
}

function getInitials(name) {
  if (!name) return '';
  
  const nameParts = name.split(' ');
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return nameParts[0][0].toUpperCase();
}

function storeUserData(data) {
  sessionStorage.setItem('userData', JSON.stringify(data));
}

function getUserData() {
  const data = sessionStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
}

function showToast(message, type = 'error') {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'toast-close';
  closeBtn.textContent = '✕';
  closeBtn.onclick = function() {
    toast.remove();
  };
  
  toast.appendChild(closeBtn);
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 5000);
}
