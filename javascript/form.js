let nomeValido = true;
let emailValido = true;
let mensagemValida = true;

const mensagem = () => {
    const nomeInput = document.getElementById("nomeInput");
    const nome = nomeInput.value.trim();
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const tiposEmail = ["@hotmail.com","@gmail.com","@uac.pt"];
    const areaMensagem = document.getElementById("areaMensagem");
    const mensagem = areaMensagem.value.trim();
    let erro = false;
    // Verificar nome
    
    if (document.getElementById("nomeInput") ) {
        document.getElementById("nomeInput").onfocus = function() {limpar("nome")};
    }
    
    if (document.getElementById("emailInput")){
        document.getElementById("emailInput").onfocus = function() {limpar("email")};
    }
    
    if (document.getElementById("areaMensagem")){
        document.getElementById("areaMensagem").onfocus = function() {limpar("mensagem")};
    }

    
    nomeValido = false;
    if (nome !== ""){
        nomeValido = true;
    }

    if (!nomeValido ) {
        nomeInput.style.color = "red";
        nomeInput.value = "Nome vazio";
        erro = true;
    }

    // Verificar email
    emailValido = false;
    if (email === ""){
        emailInput.style.color = "red";
        emailInput.value = "Email vazio";
        erro = true;
    } else {
        if (regex.test(email)) {
            emailValido = true;
        }
    }


    if (!emailValido) {
        emailInput.style.color = "red";
        emailInput.value = "Email Inválido";
        erro = true;
    }

    // Verificar mensagem
    mensagemValida = false;
    if (mensagem !== ""){
        mensagemValida = true;
    } 

    if (!mensagemValida) {
        areaMensagem.style.color = "red";
        areaMensagem.value = "Mensagem vazia";
        erro = true;
    }

    if (erro) {
        alert("Corrija os erros identificados no form!")
    } else {
        alert("Mensagem enviada com sucesso!")
    }
}


const limpar = (x) => {
    if(x==="nome" && !nomeValido){
        nomeInput = document.getElementById("nomeInput")
        nomeInput.value="";
        nomeInput.style.color = "black";
    }
    else if(x==="email" && !emailValido){
        emailInput = document.getElementById("emailInput")
        emailInput.value="";
        emailInput.style.color = "black";
    }
    else if(x==="mensagem" && !mensagemValida){
        areaMensagem = document.getElementById("areaMensagem")
        areaMensagem.value="";
        areaMensagem.style.color = "black";
    }
}