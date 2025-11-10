<<<<<<< HEAD
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
    const whatsappLink = "https://api.whatsapp.com/send?phone=5592992759349&text=Entendi%20o%20aviso%20de%20phishing.";

    // 1. Ação ao clicar no Link/Isca (o "vídeo") -> Interrompe o link e mostra o Alerta
    phishingLink.addEventListener('click', function(event) {
        event.preventDefault(); // Impede que vá para o site falso
        iscaContainer.classList.add('oculto'); 
        alertaEducacional.classList.remove('oculto');
    });

    // 2. Ação ao clicar no BOTÃO DE AÇÃO COMPLEXA -> Simula o HACKING
