/**
 * Classe responsável por criar a animação rotativa do logotipo
 * usando a biblioteca Three.js.
 */
class AnimacaoRotativaLogo {
    constructor() {
        this.container = document.getElementById("threejs-logo-contentor");
        this.scene = new THREE.Scene();
        this.setupCamera();
        this.setupRenderer();
        this.setupMesh();
        this.setupLights();
        this.addResizeListener();
        this.animate();
    }

    /**
     * Função que configura o aspect ratio e a posição da câmera
     */
    setupCamera = () => {
        const aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
        this.camera.position.z = 3;
    }
    
    /**
     * Inicializa o renderizador WebGL e o adiciona ao container
     */
    setupRenderer = () => {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    /**
     * Função que cria a geometria do logotipo
     */
    setupMesh = () => {
        const texture = new THREE.TextureLoader().load("imagens/logotipo-mobile.png");
        const geometry = new THREE.BoxGeometry(2, 2, 0);
        const logoMat = new THREE.MeshStandardMaterial({ map: texture });
        const sideMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(geometry, [sideMat, sideMat, sideMat, sideMat, logoMat, logoMat]);
        this.scene.add(this.mesh);
    }

    setupLights = () =>{
        this.scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    }
    /**
     * Permite que a animação se ajuste ao redimensionar a janela, 
     * atualizando o aspect ratio da câmera e o tamanho do renderizador
     */
    addResizeListener  = () => {
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        });
    }

    /**
     * Animação que faz o logotipo rodar continuamente em torno do eixo Y
     */ 
    animate = () => {
        requestAnimationFrame(() => this.animate());
        this.mesh.rotation.y += 0.05;
        this.renderer.render(this.scene, this.camera);
    }
  

}


