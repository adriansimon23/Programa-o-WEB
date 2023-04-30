const palavras = [
	{ palavra: "banana", dica: "fruta" },
	{ palavra: "abacaxi", dica: "fruta" },
	{ palavra: "macarrão", dica: "comida" },
    { palavra: "Bola", dica: "futebol"},
    { palavra: "Alemanha", dica: "países"}
];

const palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];

const tamanhoPalavra = palavraAtual.palavra.length;

const tentativasRestantes = tamanhoPalavra + 3;

let palavraAdivinhada = [];

for (let i = 0; i < tamanhoPalavra; i++) {
	palavraAdivinhada.push("_");
}

const palavraElement = document.getElementById("palavra");
palavraElement.innerHTML = palavraAdivinhada.join(" ");

const dicaElement = document.getElementById("dica");
dicaElement.innerHTML = palavraAtual.dica;

const tamanhoElement = document.getElementById("tamanho");
tamanhoElement.innerHTML = tamanhoPalavra;

const tentativasElement = document.getElementById("tentativas");
tentativasElement.innerHTML = tentativasRestantes;

const formulario = document.querySelector("form");
formulario.addEventListener("submit", function(event) {
	event.preventDefault();
	const letraElement = document.getElementById("letra");
})
