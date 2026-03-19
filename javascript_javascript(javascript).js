let graficoAnimado = false;

// Função para criar o gráfico de barras
function criar_grafico(){
    const data = [
        {legenda: "Investigadores", valor: 10},
        {legenda: "Projetos", valor: 14},
        {legenda: "Concursos", valor: 8},
        {legenda: "Publicações", valor: 18},
        {legenda: "Bolsas", valor: 12}
    ];

    const container = document.getElementById("d3-contentor");
    container.innerHTML = "";
    const containerWidth = container.offsetWidth;
    const isMobile = containerWidth < 980;
    const isTablet = containerWidth >= 980 && containerWidth < 1350;
    const width = containerWidth;
    const height = isMobile ? 500: isTablet ? 600 : 700;
    const margin = isMobile
        ? {top: 30, right: 10, bottom: 80, left: 35}
        : {top: 50, right: 40, bottom: 80, left: 60};


    const svg = d3.select("#d3-contentor")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        
        

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, 20])
        .range([height - margin.bottom, margin.top]);

    // Barras inicialments com altura 0 para começar a animação 
    const bars = svg.append("g")
        .attr("fill", "#1B3577")
        .selectAll("rect")
        .data(data)
        .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("width", x.bandwidth())
            .attr("y", d => graficoAnimado ? y(d.valor) : y(0))
            .attr("height", d => graficoAnimado ? y(0) - y(d.valor) : 0);
        

    // Valor das barras, inicialmente invisível 
    const labels = svg.append("g")
        .selectAll("text")
        .data(data)
        .join("text")
            .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
            .attr("y", d => y(d.valor) - 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "#1B3577")
            .attr("font-weight", "bold")
            .text(d => d.valor)
            .attr("opacity", graficoAnimado ? 1 : 0);

    // Eixo do X
    const x_eixo = svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x)
            .tickFormat(i => data[i].legenda)
            )
        if (isMobile){
            x_eixo.selectAll("text")
            .attr("font-size", "12px")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-45)")
            
        }
        else if (isTablet){
            x_eixo.selectAll("text")
            .attr("font-size", "18px")
            .attr("text-anchor", "middle");
        }
        else{
            x_eixo.selectAll("text")
            .attr("font-size", "20px")
            .attr("text-anchor", "middle");
         }

    // Eixo do Y
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .selectAll("text")
            .attr("font-size", "15px");
           

    // Titulo do gráfico
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("fill", "#1B3577")
        .text("Conquistas do CACA em 2026");

    // Animação ao clicar no botão
    const botoes = document.querySelectorAll(".investigacao-contentor button");
    for (const botao of botoes) {
        botao.addEventListener("click", function() {
            graficoAnimado = true;
            // Resest nas barras
            bars.interrupt()
                .attr("y", y(0))
                .attr("height", 0);

            // Mete os valores invisíveis 
            labels.interrupt()
                .attr("opacity", 0);

            // Transição para  a animação das barras
            bars.transition()
                .duration(800)
                .delay((d, i) => i * 150)
                .attr("y", d => y(d.valor))
                .attr("height", d => y(0) - y(d.valor));

            //Transição dos valores
            labels.transition()
                .duration(400)
                .delay((d, i) => i * 150 + 750)
                .attr("opacity", 1);
        });
    };   
}




// Animação do logo CACA em 3d com three.js
function animacao_rotativa_logo(){
    const container = document.getElementById("threejs-logo-contentor");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50,container.offsetWidth / container.offsetHeight, 0.1, 100 );
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const texture = new THREE.TextureLoader().load("imagens/logotipo-mobile.png");
    const geometry = new THREE.BoxGeometry(2, 2, 0);
    const logoMat = new THREE.MeshStandardMaterial({ map: texture });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, [sideMat, sideMat, sideMat, sideMat, logoMat, logoMat]);
    scene.add(mesh);
    camera.position.z = 3;

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    function animate(){
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.05;
        renderer.render(scene,camera);

    }
    animate();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const siteContent = document.getElementById('site-conteudo'); 
    loadingScreen.classList.add('esconder');
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
    if (pageLoaded) hideLoadingScreen();
}, 3000);



window.addEventListener("DOMContentLoaded", function() {
    criar_grafico();
    animacao_rotativa_logo();
});

window.addEventListener("resize", function () {
    criar_grafico();
});


// Botão Scroll-to-top

let mybutton = document.getElementById("Scroll_to_top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function scroll_to_top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Redefinir logo para media queries mobile

function replaceimagemobile(x) {
  var imagem = document.querySelector(".imglogo")
  console.log(imagem)
  if (x.matches) { 
   imagem.src="imagens/logotipo-mobile.png";
  } else {
   imagem.src="imagens/logotipo.png";
  }
}
var x = window.matchMedia("(max-width: 980px)");
replaceimagemobile(x);
x.addEventListener("change", function() {
  replaceimagemobile(x);
});