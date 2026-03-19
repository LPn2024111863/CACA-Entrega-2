const replaceimagemobile = (x) => {
  const imagem = document.querySelector(".imglogo")
  if (x.matches) { 
   imagem.src="imagens/logotipo-mobile.png";
  } else {
   imagem.src="imagens/logotipo.png";
  }
}
const x = window.matchMedia("(max-width: 980px)");
replaceimagemobile(x);
x.addEventListener("change", () => {
  replaceimagemobile(x);
});