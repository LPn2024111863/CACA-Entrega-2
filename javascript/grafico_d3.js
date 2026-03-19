/**
 * Classe responsável por criar a grafico, atualizar os valores das barras
 * e alteração responsiva do gráfico.
 */
class CriarGrafico {
    constructor() {
        this.graficoAnimado = false;
        this.data = [
            {legenda: "Investigadores", valor: 0},
            {legenda: "Projetos", valor: 0},
            {legenda: "Concursos", valor: 0},
            {legenda: "Publicações", valor: 0},
            {legenda: "Bolsas", valor: 0}
        ];
        this.draw();
        this.addResizeListener();
    }

    /**
     * Função para atualizar os valores das barras do gráfico
     */
    changeData = (a,b,c,d,e) => {
        this.data = [
            {legenda: "Investigadores", valor: a},
            {legenda: "Projetos", valor: b},
            {legenda: "Concursos", valor: c},
            {legenda: "Publicações", valor: d},
            {legenda: "Bolsas", valor: e}
        ];
        this.graficoAnimado = true;
        this.draw();

        this.bars.interrupt()
                .attr("y", this.y(0))
                .attr("height", 0)
                .transition()
                .duration(800)
                .delay((d, i) => i * 150)
                .attr("y", d => this.y(d.valor))
                .attr("height", d => this.y(0) - this.y(d.valor));

        this.labels.interrupt()
                .attr("opacity", 0)
                .transition()
                .duration(400)
                .delay((d, i) => i * 150 + 750)
                .attr("opacity", 1);
        };
    /**
     * Função para calcular as dimensões do gráfico
     * com base na resolução da tela
     */
    calculateDimensions = () => {
        const container = document.getElementById("d3-contentor");
        if (!container) return null;
        const containerWidth = container.offsetWidth;
        const isMobile = containerWidth < 980;
        const isTablet = containerWidth >= 980 && containerWidth < 1350;
        return {
            width: containerWidth,
            height: isMobile ? 500 : (isTablet ? 600 : 700),
            margin: isMobile ? {top: 30, right: 10, bottom: 80, left: 35} : {top: 50, right: 40, bottom: 80, left: 60},
            isMobile : isMobile,
            isTablet : isTablet
        };
    }


    /**
     * Função principal para desenhar o gráfico
     * criando os eixos, as barras e as legendas 
     */
    draw = () => {
        const dimensions = this.calculateDimensions();
        const { width, height, margin, isMobile, isTablet } = dimensions;
        d3.select("#d3-contentor").selectAll("*").remove();
        /**
         * Crie o elemento SVG com dimensões responsivas
         */
        const svg = d3.select("#d3-contentor")
            .append("svg")
            .attr("viewBox", [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(this.data.length))
            .range([margin.left, width - margin.right])
            .padding(0.2);

      
        const y = d3.scaleLinear()
            .domain([0, 20])
            .range([height - margin.bottom, margin.top]);

        const bars = svg.append("g")
            .attr("fill", "#1B3577")
            .selectAll("rect")
            .data(this.data)
            .join("rect")
                .attr("x", (d, i) => x(i))
                .attr("width", x.bandwidth())
                .attr("y", d => this.graficoAnimado ? y(d.valor) : y(0))
                .attr("height", d => this.graficoAnimado ? y(0) - y(d.valor) : 0);

        /**
         * Cria os rótulos das barras, posicionando-os acima 
         * de cada barra e centralizados horizontalmente
         */
        const labels = svg.append("g")
            .selectAll("text")
            .data(this.data)
            .join("text")
                .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
                .attr("y", d => y(d.valor) - 15)
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr("fill", "#1B3577")
                .attr("font-weight", "bold")
                .text(d => d.valor)
                .attr("opacity", this.graficoAnimado ? 1 : 0);

        const xEixo = svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => this.data[i].legenda));
        /**
         * Ajuse os estilos dos rótulos do eixo x para 
         * melhor legibilidade em diferentes dispositivos
         */
        if (isMobile) {
            xEixo.selectAll("text")
                .attr("font-size", "12px")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-45)");
        } else if (isTablet) {
            xEixo.selectAll("text")
                .attr("font-size", "18px")
                .attr("text-anchor", "middle");
        } else {
            xEixo.selectAll("text")
                .attr("font-size", "20px")
                .attr("text-anchor", "middle");
        }

        /**
         * Formatação do eixo y
         */
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .selectAll("text")
                .attr("font-size", "15px");
        /**
         * Titulo do gráfico
         */
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("font-weight", "bold")
            .attr("fill", "#1B3577")
            .text("Conquistas do CACA em 2026");
        this.bars = bars;
        this.labels = labels;
        this.y = y;
    }
    /**
     * Função para adicionar um listener de redimensionamento
     * para ajustar o gráfico
     */
    addResizeListener = () => {
        window.addEventListener("resize", () => {
            this.draw(); 
        });
    }
}


