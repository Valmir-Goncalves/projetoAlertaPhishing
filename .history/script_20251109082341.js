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

    // Número de telefone para redirecionamento (substitua pelo seu número no formato internacional)
    // O 'text' é uma mensagem opcional que será pré-preenchida no WhatsApp
    const whatsappLink = "https://api.whatsapp.com/send?phone=55XXXXXXXXXXX&text=Entendi%20o%20aviso%20de%20phishing.";

    // 1. Ação ao clicar no Link/Isca (o "vídeo") -> Interrompe o link e mostra o Alerta
    phishingLink.addEventListener('click', function(event) {
        event.preventDefault(); // Impede que vá para o site falso
        iscaContainer.classList.add('oculto'); 
        alertaEducacional.classList.remove('oculto');
    });

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING
    complexActionButton.addEventListener('click', function() {
        // Esconde o alerta educativo
        alertaEducacional.classList.add('oculto');
        
        // Mostra o overlay de ação complexa
        complexActionOverlay.classList.remove('oculto');
        
        // Tenta reproduzir o áudio
        warningAudio.play().catch(error => {
            console.warn("Áudio não pôde tocar automaticamente. Clique no botão de sair manualmente se necessário.", error);
        });

        // NOVIDADE: Adiciona um listener para quando o áudio terminar
        warningAudio.addEventListener('ended', function() {
            // Mostra o botão 'Sair' imediatamente após o áudio terminar
            sairButton.classList.remove('oculto');
        });

        // Caso o áudio não toque por bloqueio, mostra o botão após um tempo razoável
        setTimeout(() => {
            if (warningAudio.paused && sairButton.classList.contains('oculto')) {
                sairButton.classList.remove('oculto');
            }
        }, 8000); // 8 segundos de espera como fallback
    });

    // 3. Ação ao clicar no BOTÃO SAIR -> Redireciona para o WhatsApp
    sairButton.addEventListener('click', function() {
        // Para a reprodução do áudio
        warningAudio.pause();
        warningAudio.currentTime = 0;
        
        // Redireciona para o WhatsApp
        window.location.href = whatsappLink; 
    });
});