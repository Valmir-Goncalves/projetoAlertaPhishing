document.addEventListener('DOMContentLoaded', function() {
    // Referencia os elementos principais
    const alertaEducacional = document.getElementById('alerta-educacional'); 
    
    // Referencia os novos elementos
    const complexActionButton = document.getElementById('complex-action-button');
    const complexActionOverlay = document.getElementById('complex-action-overlay');
    const warningAudio = document.getElementById('warning-audio');
    const sairButton = document.getElementById('sair-button');
    
    // --- VARIÁVEIS E FUNÇÕES DO NOVO RELÓGIO ---
    const timerDisplay = document.getElementById('digital-timer');
    let timerInterval;
    let seconds = 0;
    
    // Função para formatar segundos em HH:MM:SS
    function formatTime(s) {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;

        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(h)}:${pad(m)}:${pad(sec)}`;
    }
    
    // Função para iniciar o relógio
    function startTimer() {
        seconds = 0;
        timerDisplay.textContent = formatTime(seconds);
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }
    
    // Função para parar o relógio
    function stopTimer() {
        clearInterval(timerInterval);
    }
    // ------------------------------------------

    // Número de telefone para redirecionamento
    const meuNumeroWhatsapp = "5592992759349";
    const whatsappLink = "https://api.whatsapp.com/send?phone=" + meuNumeroWhatsapp + "&text=Entendi%20o%20aviso%20de%20phishing.";

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING, TOCA O ÁUDIO E INICIA O RELÓGIO
    complexActionButton.addEventListener('click', function() {
        // Esconde o alerta educativo
        alertaEducacional.classList.add('oculto');
        
        // Mostra o overlay de ação complexa
        complexActionOverlay.classList.remove('oculto');
        
        // --- INICIA O RELÓGIO ---
        startTimer();
        
        // --- LÓGICA DE ÁUDIO ---
        const playAudio = async () => {
            warningAudio.currentTime = 0; 
            warningAudio.load(); 
            
            try {
                await warningAudio.play();
                
                // Se o áudio tocar, o botão de sair aparece quando ele terminar
                warningAudio.addEventListener('ended', function() {
                    stopTimer(); // Para o relógio quando o áudio termina
                    sairButton.classList.remove('oculto');
                }, { once: true });
                
            } catch (error) {
                // Falha no autoplay (bloqueio do navegador)
                console.warn("Erro de reprodução de áudio (autoplay bloqueado):", error);
                
                // Mostra o botão de sair após um pequeno tempo
                setTimeout(() => {
                    stopTimer(); // Para o relógio se o áudio falhar
                    sairButton.classList.remove('oculto');
                }, 3000);
            }
        };
        
        playAudio();

        // Fallback final: se o áudio não tocar por 8s, o botão de sair aparece.
        setTimeout(() => {
            if (sairButton.classList.contains('oculto')) {
                 stopTimer(); // Garante que o relógio para no fallback
                 sairButton.classList.remove('oculto');
            }
        }, 8000); 
    });

    // 3. Ação ao clicar no BOTÃO SAIR -> Redireciona para o WhatsApp
    sairButton.addEventListener('click', function() {
        // Para o relógio
        stopTimer();
        
        // Para a reprodução do áudio
        warningAudio.pause();
        warningAudio.currentTime = 0;
        
        // Redireciona para o WhatsApp
        window.location.href = whatsappLink; 
    });
});