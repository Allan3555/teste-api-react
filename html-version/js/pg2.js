
document.addEventListener('DOMContentLoaded', function() {
  const userData = getUserData();
  const generateDarfBtn = document.getElementById('generate-darf-btn');
  
  // Redirect if no user data found
  if (!userData) {
    window.location.href = 'index.html';
    return;
  }
  
  console.log("Dados do usuário na PG2:", userData);
  
  // Fill user data in the page
  document.querySelectorAll('.user-name-text').forEach(el => {
    el.textContent = userData.name || 'Nome não disponível';
  });
  
  document.querySelectorAll('.user-cpf-text').forEach(el => {
    el.textContent = userData.cpf || 'CPF não disponível';
  });
  
  // Set user initials for avatar
  document.querySelector('.user-initials').textContent = getInitials(userData.name);
  
  // Handle DARF button click
  generateDarfBtn.addEventListener('click', function() {
    // Open link in new window
    window.open('https://your-redirect.com', '_blank');
  });
  
  // Detect if screen is mobile size and adjust responsive elements
  function checkMobile() {
    const isMobile = window.innerWidth < 768;
    
    const header = document.querySelector('.responsive-header');
    const userInfo = document.querySelector('.user-info');
    
    if (isMobile) {
      header.style.flexDirection = 'column';
      userInfo.style.marginTop = '1rem';
      userInfo.style.width = '100%';
      userInfo.style.justifyContent = 'space-between';
    } else {
      header.style.flexDirection = 'row';
      userInfo.style.marginTop = '0';
      userInfo.style.width = 'auto';
    }
  }
  
  // Initial check and listen for window resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
