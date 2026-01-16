/**
 * BitDoido Docs - Sistema de Cópia Automática
 * Estilo WindUI
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cards de comandos
    const commandCards = document.querySelectorAll('.cmd-card');

    commandCards.forEach(card => {
        // Estilização via JS para garantir o feedback
        card.style.cursor = "pointer";
        
        card.addEventListener('click', function() {
            copiarComando(this);
        });
    });
});

/**
 * Função principal de cópia com animação
 */
function copiarComando(elemento) {
    const codigoTag = elemento.querySelector('code');
    const descricaoTag = elemento.querySelector('p');
    
    if (!codigoTag || !descricaoTag) return;

    const textoParaCopiar = codigoTag.innerText;

    // API de Clipboard moderna
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        // Salva os estados originais
        const conteudoOriginal = descricaoTag.innerHTML;
        const corOriginal = descricaoTag.style.color;

        // Inicia Animação de Feedback
        elemento.classList.add('bg-indigo-900/40'); // Classe de destaque temporário
        descricaoTag.style.color = "#818cf8";
        descricaoTag.innerHTML = "✅ Copiado para a área de transferência!";

        // Remove o feedback e restaura o original após 1.5s
        setTimeout(() => {
            elemento.classList.remove('bg-indigo-900/40');
            descricaoTag.style.color = corOriginal;
            descricaoTag.innerHTML = conteudoOriginal;
        }, 1500);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Lógica de Pesquisa de Comandos
document.getElementById('searchBar').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.cmd-card');

    cards.forEach(card => {
        const comando = card.querySelector('code').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        
        if (comando.includes(termo) || desc.includes(termo)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});