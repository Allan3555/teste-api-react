
// Main script for index.html
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cpf-form');
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpf-error');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingMessage = document.getElementById('loading-message');

    // Format CPF as user types
    cpfInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length > 9) {
            this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
        } else if (value.length > 6) {
            this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
        } else if (value.length > 3) {
            this.value = `${value.slice(0, 3)}.${value.slice(3)}`;
        } else {
            this.value = value;
        }
        
        // Hide error if user is changing the input
        cpfError.classList.add('hidden');
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const cpf = cpfInput.value;
        
        // Basic validation
        if (!isValidCpfFormat(cpf)) {
            cpfError.textContent = 'CPF inválido. Digite um CPF com 11 dígitos.';
            cpfError.classList.remove('hidden');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        
        try {
            // Call API to verify CPF
            const userData = await verifyCpf(cpf);
            
            // Store data to session storage
            storeUserData(userData);
            
            // Show loading screen before redirect
            loadingScreen.classList.remove('hidden');
            loadingMessage.textContent = 'Verificando seus dados...';
            
            // Redirect after a delay to simulate processing
            setTimeout(() => {
                window.location.href = 'pg1.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            cpfError.textContent = 'CPF inválido ou não encontrado.';
            cpfError.classList.remove('hidden');
            
            showToast('CPF inválido ou não encontrado.');
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
        }
    });
});
