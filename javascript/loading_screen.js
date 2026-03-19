let grafico;

window.addEventListener("DOMContentLoaded", () => {
    new AnimacaoRotativaLogo();
    grafico = new CriarGrafico(); 
    grafico.draw();
});

window.updateGraph = (a,b,c,d,e) => {
    if (grafico) {
        grafico.changeData(a,b,c,d,e);
    }   
};

/**
 * Função para ocultar a tela de carregamento e  exibir o conteúdo do site com uma transição
 */
const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    const siteContent = document.getElementById('site-conteudo'); 
    loadingScreen.style.opacity = '0';
    siteContent.style.opacity = '1'; 
    loadingScreen.addEventListener('transitionend', () => loadingScreen.remove(), { once: true });
}
 

let pageLoaded = false;
let minTimeElapsed = false;
 
window.addEventListener('load', () => {
    pageLoaded = true;
    if (minTimeElapsed) hideLoadingScreen();
});
 
setTimeout(() => {
    minTimeElapsed = true;
    if (pageLoaded) {
        hideLoadingScreen();
    }
}, 3000);



