let indice_slide = 1;

const mostrar_slides = (n) => {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        indice_slide = 1;
    } 

    if (n < 1) {
        indice_slide = slides.length;
    }

    Array.from(slides).forEach( (slide) => {
        slide.style.display = "none";
    })

    Array.from(dots).forEach( (dot) => {
        dot.className = dot.className.replace(" active", "");
    })

    slides[indice_slide-1].style.display = "block";  
    dots[indice_slide-1].className += " active";
}

const slide_atual = (n) => mostrar_slides(indice_slide = n)

mostrar_slides(indice_slide);
