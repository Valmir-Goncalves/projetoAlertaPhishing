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
    
    function formatTime(s) {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(h)}:${pad(m)}:${pad(sec)}`;
    }
    
    function startTimer() {
        seconds = 0;
        timerDisplay.textContent = formatTime(seconds);
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
    }
    // ------------------------------------------
    
    // --- VARIÁVEIS E FUNÇÕES DE VIBRAÇÃO ---
    let vibrationTimeout = null;
    let audioEndedListener = null;

    function stopVibration() {
        if (vibrationTimeout) {
            clearTimeout(vibrationTimeout);
            vibrationTimeout = null;
        }
        if (navigator.vibrate) { 
            navigator.vibrate(0); 
        }
    }
    // ------------------------------------------

    // --- NOVAS VARIÁVEIS E FUNÇÕES DA BARRA DE PROGRESSO ---
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressMessage = document.getElementById('progress-message');
    let progressInterval;
    let currentProgress = 0; // Para a porcentagem
    const finalProgressPercentage = 100; // Porcentagem final

    function startProgressBar(audioDuration) {
        currentProgress = 0;
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        progressMessage.classList.add('oculto'); // Esconde a mensagem inicial
        
        // Define o tempo total para o progresso normal (áudioDuration - 4 segundos)
        const effectiveDuration = audioDuration - 4; 
        
        // Se a duração for muito curta, preenche a barra imediatamente
        if (effectiveDuration <= 0) {
            updateProgressBar(finalProgressPercentage);
            return;
        }

        const intervalTime = 100; // Atualiza a cada 100ms
        let elapsed = 0; // Tempo decorrido para o progresso normal

        progressInterval = setInterval(() => {
            elapsed += intervalTime / 1000; // Converte para segundos
            
            if (elapsed < effectiveDuration) {
                currentProgress = Math.min(Math.floor((elapsed / effectiveDuration) * finalProgressPercentage), 99);
                updateProgressBar(currentProgress);
            } else {
                // Quando faltam 4 segundos para o áudio terminar
                updateProgressBar(finalProgressPercentage);
                stopProgressBar();
                progressMessage.classList.remove('oculto'); // Mostra a mensagem de sucesso
            }
        }, intervalTime);
    }

    function updateProgressBar(percentage) {
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }

    function stopProgressBar() {
        clearInterval(progressInterval);
    }

    function resetProgressBar() {
        stopProgressBar();
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        progressMessage.classList.add('oculto');
        currentProgress = 0;
    }
    // ------------------------------------------

    // Número de telefone para redirecionamento
    const meuNumeroWhatsapp = "5592992759349";
    const whatsappLink = "https://api.whatsapp.com/send?phone=" + meuNumeroWhatsapp + "&text=Entendi%20o%20aviso%20de%20phishing.";

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA
    complexActionButton.addEventListener('click', function() {
        alertaEducacional.classList.add('oculto');
        complexActionOverlay.classList.remove('oculto');
        
        startTimer(); // Inicia o relógio

        const playAudio = async () => {
            warningAudio.currentTime = 0; 
            warningAudio.load(); 
            
            try {
                await warningAudio.play();
                
                // Audio iniciou com sucesso. Obtém a duração para a barra de progresso e vibração.
                setTimeout(() => { // Pequeno delay para garantir que .duration esteja disponível
                    const audioDuration = warningAudio.duration; 

                    // INICIA A BARRA DE PROGRESSO
                    startProgressBar(audioDuration);

                    // LÓGICA DE VIBRAÇÃO (Inicia 3 segundos antes do áudio terminar)
                    if (navigator.vibrate && !isNaN(audioDuration) && audioDuration > 3) {
                        const vibrationDelay = (audioDuration - 3) * 1000;
                        vibrationTimeout = setTimeout(() => {
                            navigator.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200]);
                        }, vibrationDelay);
                    }
                }, 100); 

                // LÓGICA DE FIM DE ÁUDIO
                if (audioEndedListener) warningAudio.removeEventListener('ended', audioEndedListener);
                audioEndedListener = function() {
                    stopTimer(); 
                    stopVibration(); 
                    stopProgressBar(); // Garante que a barra pare no final do áudio
                    updateProgressBar(finalProgressPercentage); // Garante que a barra esteja cheia
                    progressMessage.classList.remove('oculto'); // Garante que a mensagem apareça
                    sairButton.classList.remove('oculto');
                };
                warningAudio.addEventListener('ended', audioEndedListener, { once: true });
                
            } catch (error) {
                // Áudio falhou ao tocar (Autoplay bloqueado)
                console.warn("Erro de reprodução de áudio (autoplay bloqueado):", error);
                
                // Se falhar, mostra o botão 'Sair', para o relógio e barra após 3 segundos
                setTimeout(() => {
                    stopTimer(); 
                    stopProgressBar();
                    updateProgressBar(finalProgressPercentage); // Garante que a barra esteja cheia
                    progressMessage.classList.remove('oculto'); // Garante que a mensagem apareça
                    sairButton.classList.remove('oculto');
                }, 3000); // 3 segundos para mostrar a mensagem
            }
        };
        
        playAudio();
    });

    // 3. Ação ao clicar no BOTÃO SAIR -> Redireciona para o WhatsApp
    sairButton.addEventListener('click', function() {
        stopTimer();
        stopVibration();
        resetProgressBar(); // Reseta a barra de progresso
        
        warningAudio.pause();
        warningAudio.currentTime = 0;
        
        window.location.href = whatsappLink; 
    });
});