document.addEventListener('DOMContentLoaded', function() {
    // Referencia os elementos principais
    const alertaEducacional = document.getElementById('alerta-educacional'); 
    
    // Referencia os novos elementos
    const complexActionButton = document.getElementById('complex-action-button');
    const complexActionOverlay = document.getElementById('complex-action-overlay');
    const warningAudio = document.getElementById('warning-audio');
    const sairButton = document.getElementById('sair-button');
    
    // --- VARIÁVEIS E FUNÇÕES DO RELÓGIO ---
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
    
    // --- VARIÁVEIS E FUNÇÕES DE VIBRAÇÃO ---
    let vibrationTimeout = null;
    let audioEndedListener = null;

    // Função para parar a vibração
    function stopVibration() {
        if (vibrationTimeout) {
            clearTimeout(vibrationTimeout);
            vibrationTimeout = null;
        }
        // Limpa qualquer vibração em andamento
        if (navigator.vibrate) { 
            navigator.vibrate(0); 
        }
    }
    // ------------------------------------------

    // Número de telefone para redirecionamento
    const meuNumeroWhatsapp = "5592992759349";
    const whatsappLink = "https://api.whatsapp.com/send?phone=" + meuNumeroWhatsapp + "&text=Entendi%20o%20aviso%20de%20phishing.";

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING, TOCA O ÁUDIO E INICIA O RELÓGIO
    complexActionButton.addEventListener('click', function() {
        // Esconde o alerta educativo e mostra o overlay
        alertaEducacional.classList.add('oculto');
        complexActionOverlay.classList.remove('oculto');
        
        // INICIA O RELÓGIO
        startTimer();

        const playAudio = async () => {
            warningAudio.currentTime = 0; 
            warningAudio.load(); 
            
            try {
                await warningAudio.play();
                
                // O áudio iniciou com sucesso.

                // 1. LÓGICA DE VIBRAÇÃO (Inicia 3 segundos antes do áudio terminar)
                // Usamos um pequeno timeout para garantir que a duração do áudio (metadata) esteja carregada
                setTimeout(() => {
                    const duration = warningAudio.duration;
                    // Verifica se o navegador suporta vibração, se a duração é válida e se é maior que 3 segundos
                    if (navigator.vibrate && !isNaN(duration) && duration > 3) {
                        const delay = (duration - 3) * 1000;
                        
                        vibrationTimeout = setTimeout(() => {
                            // Padrão de vibração: 200ms liga, 100ms desliga (repetindo 5 vezes)
                            navigator.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200]);
                        }, delay);
                    }
                }, 100); 

                // 2. LÓGICA DE FIM DE ÁUDIO
                // Remove o listener anterior para evitar duplicação
                if (audioEndedListener) warningAudio.removeEventListener('ended', audioEndedListener);

                audioEndedListener = function() {
                    stopTimer(); // Relógio para quando o áudio termina (CORRIGIDO)
                    stopVibration(); // Para a vibração
                    sairButton.classList.remove('oculto');
                };

                warningAudio.addEventListener('ended', audioEndedListener, { once: true });
                
            } catch (error) {
                // Áudio falhou ao tocar (Autoplay bloqueado)
                console.warn("Erro de reprodução de áudio (autoplay bloqueado):", error);
                
                // Se falhar, mostra o botão 'Sair' e para o relógio após 3 segundos
                setTimeout(() => {
                    stopTimer(); 
                    sairButton.classList.remove('oculto');
                }, 3000);
            }
        };
        
        playAudio();
        
        // O FALLBACK DE 8 SEGUNDOS FOI REMOVIDO PARA EVITAR QUE O RELÓGIO PARE PREMATURAMENTE.
    });

    // 3. Ação ao clicar no BOTÃO SAIR -> Redireciona para o WhatsApp
    sairButton.addEventListener('click', function() {
        // Para o relógio
        stopTimer();
        // Para a vibração
        stopVibration();
        
        // Para a reprodução do áudio
        warningAudio.pause();
        warningAudio.currentTime = 0;
        
        // Redireciona para o WhatsApp
        window.location.href = whatsappLink; 
    });
});