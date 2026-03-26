import AnimacaoRotativaLogo from './animacao_2d_logo.js';
import CriarGrafico from './grafico_d3.js';

let grafico;
let pageLoaded = false;
let minTimeElapsed = false;


window.addEventListener("DOMContentLoaded", () => {
    new AnimacaoRotativaLogo();
    grafico = new CriarGrafico(); 
});

window.updateGraph = (a, b, c, d, e) => {
    if (grafico) {
        grafico.changeData(a, b, c, d, e);
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
