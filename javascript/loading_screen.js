import AnimacaoRotativaLogo from './animacao_2d_logo.js';
import CriarGrafico from './grafico_d3.js';

let grafico;
let pageLoaded = false;
let minTimeElapsed = false;


window.addEventListener("DOMContentLoaded", () => {
    new AnimacaoRotativaLogo();
    grafico = new CriarGrafico(); 
});

window.updateGraph = (valor_investigadores, valor_projeto, valor_concurso,
        valor_publicacoes, valor_bolsas) => {
    if (grafico) {
        grafico.changeData(valor_investigadores, valor_projeto, valor_concurso,
        valor_publicacoes, valor_bolsas);
    }   
};

const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    const siteContent = document.getElementById('site-conteudo'); 
    loadingScreen.style.opacity = '0';
    siteContent.style.opacity = '1'; 
    loadingScreen.addEventListener('transitionend', () => loadingScreen.remove());
}
 
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
