
document.addEventListener('DOMContentLoaded', function() {
  const userData = getUserData();
  const regularizeBtn = document.getElementById('regularize-btn');
  const loadingScreen = document.getElementById('loading-screen');
  
  // Redirect if no user data found
  if (!userData) {
    window.location.href = 'index.html';
    return;
  }
  
  console.log("Dados do usuário carregados:", userData);
  
  // Calculate deadline date
  const deadlineDate = new Date();
  deadlineDate.setFullYear(deadlineDate.getFullYear() + 1);
  const formattedDeadline = getBrazilianFormattedDate(deadlineDate);
  
  // Fill user data in the page
  document.querySelectorAll('.user-name-text').forEach(el => {
    el.textContent = userData.name || 'Nome não disponível';
  });
  
  document.querySelectorAll('.user-cpf-text').forEach(el => {
    el.textContent = userData.cpf || 'CPF não disponível';
  });
  
  document.querySelector('.user-birth-date').textContent = 
    userData.birthDate ? adjustBirthDate(userData.birthDate) : 'Não disponível';
  
  document.querySelector('.user-gender').textContent = 
    userData.gender || 'Não informado';
  
  document.querySelector('.user-mother').textContent = 
    userData.motherName || 'Não disponível';
  
  document.querySelector('.deadline-date').textContent = formattedDeadline;
  
  // Set user initials for avatar
  document.querySelector('.user-initials').textContent = getInitials(userData.name);
  
  // Handle regularize button click
  regularizeBtn.addEventListener('click', function() {
    loadingScreen.classList.remove('hidden');
    document.getElementById('loading-message').textContent = 'Preparando sua regularização...';
    
    // Redirect after delay to simulate processing
    setTimeout(() => {
      window.location.href = 'pg2.html';
    }, 2000);
  });
  
  // Detect if screen is mobile size and adjust responsive elements
  function checkMobile() {
    const isMobile = window.innerWidth < 768;
    
    const header = document.querySelector('.responsive-header');
    const userInfo = document.querySelector('.user-info');
    const flexResponsive = document.querySelector('.flex-responsive');
    
    if (isMobile) {
      header.style.flexDirection = 'column';
      userInfo.style.marginTop = '1rem';
      userInfo.style.width = '100%';
      userInfo.style.justifyContent = 'space-between';
      
      if (flexResponsive) {
        flexResponsive.style.flexDirection = 'column';
      }
    } else {
      header.style.flexDirection = 'row';
      userInfo.style.marginTop = '0';
      userInfo.style.width = 'auto';
      
      if (flexResponsive) {
        flexResponsive.style.flexDirection = 'row';
        flexResponsive.style.justifyContent = 'space-between';
      }
    }
  }
  
  // Initial check and listen for window resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
