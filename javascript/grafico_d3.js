/**
 * Classe responsável por criar o gráfico, atualizar os valores das barras
 * e gerir o comportamento responsivo via D3.js.
 */
export default class CriarGrafico {
    /**
     * Construtor da classe. Define o estado inicial dos dados e desenha o gráfico.
     */
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
     * Atualiza os dados do gráfico e as transições de animação.
     * @param {number} valor_investigadores - Valor para "Investigadores".
     * @param {number} valor_projeto - Valor para "Projetos".
     * @param {number} valor_concurso - Valor para "Concursos".
     * @param {number} valor_publicacoes - Valor para "Publicações".
     * @param {number} valor_bolsas - Valor para "Bolsas".
     * @returns {void}
     */
    changeData = (valor_investigadores, valor_projeto, valor_concurso,
        valor_publicacoes, valor_bolsas) => {
        this.data = [
            {legenda: "Investigadores", valor: valor_investigadores},
            {legenda: "Projetos", valor: valor_projeto},
            {legenda: "Concursos", valor: valor_concurso},
            {legenda: "Publicações", valor: valor_publicacoes},
            {legenda: "Bolsas", valor: valor_bolsas}
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
     * Calcula as dimensões e margens do gráfico baseadas na largura atual do contentor.
     * @returns {{width: number, height: number, margin: Object, isMobile: boolean, isTablet: boolean} | null}
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
            isMobile: isMobile,
            isTablet: isTablet
        };
    }

    /**
     * Função principal que limpa o contentor e renderiza eixos, barras e rótulos.
     * @returns {void}
     */
    draw = () => {
        const dimensions = this.calculateDimensions();
        if (!dimensions) return;
        
        const { width, height, margin, isMobile, isTablet } = dimensions;
        d3.select("#d3-contentor").selectAll("*").remove();

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

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .selectAll("text")
                .attr("font-size", "15px");

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
     * Adiciona o listener para efetuar um "redraw" do gráfico em caso de redimensionamento da janela.
     * @returns {void}
     */
    addResizeListener = () => {
        window.addEventListener("resize", () => {
            this.draw(); 
        });
    }
}
