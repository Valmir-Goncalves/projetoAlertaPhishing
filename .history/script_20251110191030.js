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

    // Número de telefone para redirecionamento (Corrigido para o seu número)
    const meuNumeroWhatsapp = "5592992759349";
    const whatsappLink = "https://api.whatsapp.com/send?phone=" + meuNumeroWhatsapp + "&text=Entendi%20o%20aviso%20de%20phishing.";

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
        
        // --- LÓGICA DE ÁUDIO MAIS ROBUSTA ---
        // 1. Tenta carregar o áudio (já estava lá)
        warningAudio.load(); 

        // 2. Define a função de reprodução
        const playAudio = async () => {
             try {
                 await warningAudio.play();
                 console.log("Áudio iniciado com sucesso");
             } catch (error) {
                 console.warn("Erro de autoplay:", error);
                 // Fallback para o botão aparecer mesmo com falha no autoplay
                 setTimeout(() => sairButton.classList.remove('oculto'), 3000);
             }
         };

        // 3. Ouve o evento de que o áudio pode ser reproduzido, e então tenta tocar.
        warningAudio.addEventListener('canplaythrough', playAudio, { once: true });
        
        // 4. Se o áudio terminar, mostra o botão de sair
        warningAudio.addEventListener('ended', function() {
            sairButton.classList.remove('oculto');
        }, { once: true });
        
        // 5. Fallback final para mostrar o botão se nada acontecer em 8s
        setTimeout(() => {
            if (warningAudio.paused && sairButton.classList.contains('oculto')) {
                 sairButton.classList.remove('oculto');
            }
        }, 8000); 
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