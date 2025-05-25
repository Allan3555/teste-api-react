
// Script for pg1.html
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
    const deadlineDate = calculateDeadlineDate();
    
    // Fill user data in the page
    document.getElementById('user-name').textContent = userData.name || 'Nome não disponível';
    document.getElementById('user-cpf').textContent = userData.cpf || 'CPF não disponível';
    document.getElementById('user-initials').textContent = getInitials(userData.name);
    
    // Fill irregularity details
    document.getElementById('cpf-display').textContent = userData.cpf || 'CPF não disponível';
    document.getElementById('name-display').textContent = userData.name || 'Nome não disponível';
    document.getElementById('birth-date-display').textContent = 
        userData.birthDate ? adjustBirthDate(userData.birthDate) : 'Não disponível';
    document.getElementById('gender-display').textContent = userData.gender || 'Não informado';
    document.getElementById('mother-name-display').textContent = userData.motherName || 'Não disponível';
    document.getElementById('deadline-display').textContent = deadlineDate;
    
    // Handle regularize button click
    regularizeBtn.addEventListener('click', function() {
        loadingScreen.classList.remove('hidden');
        document.getElementById('loading-message').textContent = 'Preparando sua regularização...';
        
        // Redirect after delay to simulate processing
        setTimeout(() => {
            window.location.href = 'pg2.html';
        }, 2000);
    });
    
    // Responsive behavior
    function checkMobile() {
        const isMobileView = isMobile();
        
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            if (isMobileView) {
                headerContent.style.flexDirection = 'column';
                headerContent.style.alignItems = 'flex-start';
            } else {
                headerContent.style.flexDirection = 'row';
                headerContent.style.alignItems = 'center';
            }
        }
    }
    
    // Initial check and listen for window resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
