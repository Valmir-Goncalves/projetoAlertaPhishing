document.addEventListener('DOMContentLoaded', function() {
    // Referencia os elementos principais
    const phishingLink = document.getElementById('phishing-link');
    const alertaEducacional = document.getElementById('alerta-educacional');
    const iscaContainer = document.getElementById('isca-container');
    
    // Referencia os novos elementos
    const complexActionButton = document.getElementById('complex-action-button');
    const complexActionOverlay = document.getElementById('complex-action-overlay');
    const warningAudio = document.getElementById('warning-audio');
    const sairButton = document.getElementById('sair-button');

    // 1. Ação ao clicar no Link/Isca -> Mostra o Alerta Educacional
    phishingLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        iscaContainer.classList.add('oculto'); 
        alertaEducacional.classList.remove('oculto');
    });

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING
    complexActionButton.addEventListener('click', function() {
        // 2a. Esconde o alerta educativo
        alertaEducacional.classList.add('oculto');
        
        // 2b. Mostra o overlay de ação complexa
        complexActionOverlay.classList.remove('oculto');
        
        // 2c. Tenta reproduzir o áudio (necessita de interação, por isso o .catch)
        warningAudio.play().catch(error => {
            console.log("Erro ao tentar tocar o áudio automaticamente:", error);
            // Mensagem de fallback, caso o navegador bloqueie o autoplay sem pré-interação
            // Esta mensagem aparecerá no console do navegador, não para o usuário final.
        });

        // 2d. Mostra o botão 'Sair' depois de um pequeno delay
        setTimeout(() => {
            sairButton.classList.remove('oculto');
        }, 3000); // 3 segundos de "simulação" antes de poder sair
    });

    // 3. Ação ao clicar no BOTÃO SAIR -> Sai do "Programa"
    sairButton.addEventListener('click', function() {
        // Para simular a saída total de um "programa", a melhor opção é recarregar a página
        // ou direcionar para um site seguro (como google.com).
        
        // Recarregar a página para o estado inicial:
        window.location.reload(); 
        
        // Parar o áudio antes de sair:
        warningAudio.pause();
    });
});