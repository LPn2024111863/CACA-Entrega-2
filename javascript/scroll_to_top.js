let mybutton = document.getElementById("Scroll_to_top");

window.onscroll = () => scrollFunction();

/**
 * Função que define a visibilidade do botão "mybutton"
 */
const scrollFunction = () => {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

/**
 * Função que realiza o "scroll-to-top", voltando ao topo da landing page
 */
const scroll_to_top = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}