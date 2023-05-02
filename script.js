// Definir a lista de locais
const listaLocais = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Recife', 'Porto Alegre'];

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
    palavraElement.textContent = `Acertou! A palavra é: ${palavraOculta}`;
  } else {
    numTentativas++;
    tentativasElement.textContent = `Tentativas restantes: ${numTentativasMax - numTentativas}`;
  }

  // Verificar se o jogador ganhou ou perdeu
  if (palavraOculta === palavra) {
    palavraElement.textContent = 'Parabéns, você ganhou!';
    letraInput.disabled = true;
  } else if (numTentativas === numTentativasMax) {
    palavraElement.textContent = `Você perdeu! A palavra era: ${palavra}`;
    letraInput.disabled = true;
  }

  // Limpar o input de letra
  letraInput.value = '';
});

// Exibir a dica (primeira letra da palavra)
dicaElement.textContent = `Dica: Começa com a letra ${palavra[0].toUpperCase()}`;
