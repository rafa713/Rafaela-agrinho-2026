document.getElementById("contatoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Mensagem enviada com sucesso!");

    this.reset();
});

