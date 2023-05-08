// Definir a lista de locais
const listaLocais = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Recife', 'Porto Alegre', 'Florianopolis'];

// Escolher uma palavra aleatória da lista
const palavra = listaLocais[Math.floor(Math.random() * listaLocais.length)];

// Inicializar a palavra oculta
let palavraOculta = '';
for (let i = 0; i < palavra.length; i++) {
  palavraOculta += '_';
}

// Definir o número máximo de tentativas
const numTentativasMax = palavra.length + 3;
let numTentativas = 0;

// Selecionar elementos HTML
const palavraElement = document.getElementById('palavra');
const dicaElement = document.getElementById('dica');
const tamanhoElement = document.getElementById('tamanho');
const tentativasElement = document.getElementById('tentativas');
const guessForm = document.getElementById('guess-form');
const letraInput = document.getElementById('letra');

// Exibir a palavra oculta e o número de tentativas
palavraElement.textContent = `A palavra é: ${palavraOculta}`;
tamanhoElement.textContent = `Tamanho da palavra: ${palavra.length}`;
tentativasElement.textContent = `Tentativas restantes: ${numTentativasMax}`;

// Loop principal do jogo
guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Obter a letra digitada pelo jogador
  const letra = letraInput.value.toUpperCase();

  // Verificar se a letra está na palavra
  let acertou = false;
  for (let i = 0; i < palavra.length; i++) {
    if (palavra[i].toUpperCase() === letra) {
      palavraOculta = palavraOculta.slice(0, i) + letra + palavraOculta.slice(i + 1);
      acertou = true;
    }
  }

  // Atualizar os elementos HTML de acordo com a resposta
  if (acertou) {
    if (palavraOculta === palavra) {
      palavraElement.textContent = 'Parabéns, você acertou a palavra!';
      letraInput.disabled = true;
    } else {
      palavraElement.textContent = 'Letra correta! ' + palavraOculta;
    }
  } else {
    numTentativas++;
    if (numTentativas === numTentativasMax) {
      palavraElement.textContent = `Você perdeu :( Tente novamente! A palavra era: ${palavra}`;
      letraInput.disabled = true;
    } else {
      palavraElement.textContent = 'Letra errada, tente novamente! ' + palavraOculta;
      tentativasElement.textContent = `Tentativas restantes: ${numTentativasMax - numTentativas}`;
    }
  }

  // Limpar o input de letra
  letraInput.value = '';
});

// Exibir as dicas
let dicas = ['Começa com a letra ' + palavra[0].toUpperCase()];
if (palavra.length > 8) {
  dicas.push('Possui mais de 8 letras');
}
if (palavra.includes('São Paulo')) {
  dicas.push('É uma cidade muito populosa');
}
if (palavra.includes('Salvador')) {
	dicas.push('Seu clima é quente durante o ano');
  }
if (palavra.includes('Rio de janeiro')) {
	dicas.push('Foi palco de final de Copa do Mundo');
  }
if (palavra.includes('Porto Alegre')) {
	dicas.push('No futebol, uma rivalidade à flor da pele');
  }
if (palavra.includes('Florianópolis')) {
    dicas.push('Ilha da magia');
  }
  
dicaElement.textContent = `Dicas: ${dicas.join(', ')}`;
