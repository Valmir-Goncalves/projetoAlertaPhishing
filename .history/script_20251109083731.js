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
        
        // Garante que o áudio está carregado e pronto
        warningAudio.load();
        
        // Tenta reproduzir o áudio com tratamento de erro melhorado
        const playAudio = async () => {
            try {
                // Tenta reproduzir o áudio
                await warningAudio.play();
                console.log("Áudio iniciado com sucesso");
            } catch (error) {
                console.warn("Erro ao tocar áudio:", error);
                // Se falhar, mostra o botão de sair após 3 segundos
                setTimeout(() => sairButton.classList.remove('oculto'), 3000);
            }
        };
        
        // Inicia a reprodução do áudio
        playAudio();

        // Quando o áudio terminar, mostra o botão de sair
        warningAudio.addEventListener('ended', function() {
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