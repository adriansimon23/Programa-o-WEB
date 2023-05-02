const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  console.log('Conexão estabelecida com o servidor');
});

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'dica') {
    document.querySelector('#dica').textContent = message.dica;
    document.querySelector('#tamanho').textContent = message.tamanho;
    document.querySelector('#tentativas').textContent = message.tentativas;
    document.querySelector('#letra').disabled = false;
    document.querySelector('#letra').focus();
  } else if (message.type === 'palavra') {
    document.querySelector('#palavra').textContent = message.palavra;
    document.querySelector('#tentativas').textContent = message.tentativas;
    document.querySelector('#letra').value = '';
    document.querySelector('#letra').focus();
  } else if (message.type === 'gameover') {
    alert(`Fim de jogo! A palavra era ${message.palavra}.`);
    document.querySelector('#guess-form').style.display = 'none';
  }
});

document.querySelector('#guess-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const letra = document.querySelector('#letra').value;
  socket.send(letra);
  document.querySelector('#letra').disabled = true;
});
=======
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
