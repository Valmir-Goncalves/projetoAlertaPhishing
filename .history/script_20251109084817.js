document.addEventListener('DOMContentLoaded', function() {
    // Referencia os elementos HTML
    const phishingLink = document.getElementById('phishing-link');
    const alertaEducacional = document.getElementById('alerta-educacional');
    const fecharAlerta = document.getElementById('fechar-alerta');
    const iscaContainer = document.getElementById('isca-container');

    // 1. Ação ao clicar no Link/Isca
    phishingLink.addEventListener('click', function(event) {
        // Impede que o navegador siga o link (essencial para simular o ataque)
        event.preventDefault(); 
        
        // Oculta a área da isca para dar foco total ao alerta
        iscaContainer.classList.add('oculto'); 
        
        // Remove a classe 'oculto' e mostra o alerta educativo
        alertaEducacional.classList.remove('oculto');
    });

    // 2. Ação ao clicar no botão "Entendi o Perigo!"
    fecharAlerta.addEventListener('click', function() {
        // Esconde o alerta
        alertaEducacional.classList.add('oculto');
        
        // Volta a mostrar a isca
        iscaContainer.classList.remove('oculto');
    });
});