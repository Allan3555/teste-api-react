
// Script for pg2.html
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
    document.getElementById('user-name').textContent = userData.name || 'Nome não disponível';
    document.getElementById('user-cpf').textContent = userData.cpf || 'CPF não disponível';
    document.getElementById('user-initials').textContent = getInitials(userData.name);
    
    // Fill payment info
    document.getElementById('payment-name').textContent = userData.name || 'Nome não disponível';
    document.getElementById('payment-cpf').textContent = userData.cpf || 'CPF não disponível';
    
    // Handle DARF button click
    generateDarfBtn.addEventListener('click', function() {
        // Open link in new window
        window.open('https://your-redirect.com', '_blank');
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
