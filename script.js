
const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");

let playerPos = 275;
let score = 0;

// Movimento
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft" && playerPos > 0) {
        playerPos -= 20;
    }

    if (e.key === "ArrowRight" && playerPos < 550) {
        playerPos += 20;
    }

    player.style.left = playerPos + "px";
});

// Criar itens
function criarItem(tipo) {

    const item = document.createElement("div");
    item.classList.add("item");

    if (tipo === "garrafa") {
        item.style.backgroundColor = "blue";
    }

    if (tipo === "lata") {
        item.style.backgroundColor = "red";
    }

    if (tipo === "papel") {
        item.style.backgroundColor = "white";
    }

    if (tipo === "toxico") {
        item.style.backgroundColor = "black";
    }

    item.style.left = Math.random() * 560 + "px";
    item.style.top = "0px";

    gameArea.appendChild(item);

    let posY = 0;

    const queda = setInterval(() => {

        posY += 5;
        item.style.top = posY + "px";

        const itemRect = item.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        const colisao =
            itemRect.left < playerRect.right &&
            itemRect.right > playerRect.left &&
            itemRect.top < playerRect.bottom &&
            itemRect.bottom > playerRect.top;

        if (colisao) {

            clearInterval(queda);
            item.remove();

            if (tipo === "garrafa") score += 10;
            if (tipo === "lata") score += 15;
            if (tipo === "papel") score += 5;
            if (tipo === "toxico") score -= 20;

            scoreText.textContent = "Pontuação: " + score;

            if (score >= 100) {
                alert("Parabéns! Você salvou a natureza! 🌳");
            }
        }

        if (posY > 400) {
            clearInterval(queda);
            item.remove();
        }

    }, 50);
}

// Criar itens automaticamente
setInterval(() => {

    const tipos = [
        "garrafa",
        "lata",
        "papel",
        "toxico"
    ];

    const tipoAleatorio =
        tipos[Math.floor(Math.random() * tipos.length)];

    criarItem(tipoAleatorio);

}, 2000);
