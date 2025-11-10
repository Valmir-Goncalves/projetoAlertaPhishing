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

    // 1. Ação ao clicar no Link/Isca (o "vídeo") -> AGORA VAI DIRETO PARA O ALERTA EDUCATIVO
    phishingLink.addEventListener('click', function(event) {
        event.preventDefault(); // Impede qualquer ação padrão do link
        iscaContainer.classList.add('oculto'); 
        alertaEducacional.classList.remove('oculto'); // Mostra a mensagem "Parabéns!"
    });

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING E TOCA O ÁUDIO
    complexActionButton.addEventListener('click', function() {
        // Esconde o alerta educativo
        alertaEducacional.classList.add('oculto');
        
        // Mostra o overlay de ação complexa
        complexActionOverlay.classList.remove('oculto');
        
        // --- LÓGICA DE ÁUDIO OTIMIZADA ---
        // Garante que o áudio está carregado e pronto
        warningAudio.load(); 
        
        // Tenta reproduzir o áudio DIRETAMENTE no clique do usuário
        const playAudio = async () => {
             try {
                 await warningAudio.play();
                 console.log("Áudio iniciado com sucesso");
                 // Se o áudio tocar, o botão de sair aparece quando ele terminar
                 warningAudio.addEventListener('ended', function() {
                     sairButton.classList.remove('oculto');
                 }, { once: true });
             } catch (error) {
                 console.warn("Erro de autoplay:", error);
                 // Se falhar (autoplay bloqueado), mostra o botão de sair após 3 segundos
                 // para não prender o usuário na tela
                 setTimeout(() => sairButton.classList.remove('oculto'), 3000);
             }
         };
         
         playAudio(); // Chama a função de reprodução imediatamente no clique

        // Fallback final para mostrar o botão se nada acontecer em 8s (redundância de segurança)
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