
// API service for CPF verification

const API_URL = 'https://webhook.oportunidadesahora.shop/webhook/consultar-dados';

async function verifyCpf(cpf) {
    try {
        console.log('Verificando CPF:', cpf);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf: cleanCpf(cpf) })
        });
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Resposta do webhook:", data);
        
        // Verifica se a resposta contém os dados esperados
        if (data && data.status === 200) {
            return {
                name: data.nome,
                birthDate: convertBrazilianDateToISO(data.nascimento),
                motherName: data.mae,
                cpf: formatCpf(cpf),
                gender: data.sexo
            };
        }
        
        // Verificação alternativa para quando a resposta vem em formato de array
        if (Array.isArray(data) && data.length > 0 && data[0].status === 200) {
            const userData = data[0];
            
            return {
                name: userData.nome,
                birthDate: convertBrazilianDateToISO(userData.nascimento),
                motherName: userData.mae,
                cpf: formatCpf(cpf),
                gender: userData.sexo
            };
        }
        
        throw new Error('CPF inválido ou resposta inesperada do servidor');
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        throw error;
    }
}
