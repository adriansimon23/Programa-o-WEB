// Definição das palavras e suas respectivas dicas
const palavras = [
	{palavra: "abacaxi", dica: "Fruta tropical"},
	{palavra: "carro", dica: "Veículo com quatro rodas"},
	{palavra: "computador", dica: "Máquina eletrônica"},
	{palavra: "dinossauro", dica: "Animal pré-histórico"},
	{palavra: "elefante", dica: "Animal com tromba"},
	{palavra: "feriado", dica: "Dia de folga"},
	{palavra: "guitarra", dica: "Instrumento musical de cordas"},
	{palavra: "janela", dica: "Parte da casa por onde entra luz"},
	{palavra: "leão", dica: "Animal selvagem"},
	{palavra: "maçã", dica: "Fruta vermelha"},
	{palavra: "praia", dica: "Lugar de areia e mar"},
	{palavra: "refrigerante", dica: "Bebida gaseificada"},
	{palavra: "sorvete", dica: "Sobremesa gelada"},
	{palavra: "televisão", dica: "Meio de comunicação"},
	{palavra: "viagem", dica: "Deslocamento para outro lugar"}
  ];
  
  // Escolha aleatória da palavra e dica
  const indice = Math.floor(Math.random() * palavras.length);
  const palavra = palavras[indice].palavra.toUpperCase();
  const dica = palavras[indice].dica;
  
  // Inicialização do jogo
  let tentativas = palavra.length + 3;
  let letrasCertas = 0;
  let letrasErradas = 0;
  let palavraAdivinhada = "";
  for (let i = 0; i < palavra.length; i++) {
	palavraAdivinhada += "_ ";
  }
  
  // Atualização da tela de jogo
  const dicaElemento = document.getElementById("dica");
  dicaElemento.innerText = "Dica: " + dica;
  
  const palavraElemento = document.getElementById("palavra");
  palavraElemento.innerText = palavraAdivinhada;
  
  const tentativasElemento = document.getElementById("tentativas");
  tentativasElemento.innerText = "Tentativas restantes: " + tentativas;
  
  // Função para verificar se a letra enviada está na palavra
  function verificarLetra(letra) {
	let letraEncontrada = false;
	for (let i = 0; i < palavra.length; i++) {
	  if (palavra[i] === letra) {
		letraEncontrada = true;
		letrasCertas++;
		palavraAdivinhada = palavraAdivinhada.substr(0, i * 2) + letra + " " + palavraAdivinhada.substr((i * 2) + 1);
	  }
	}
	if (!letraEncontrada) {
	  letrasErradas++;
	  tentativas--;
	}
	atualizarTela();
  }
  
  // Função para atualizar a tela de jogo
  function atualizarTela() {
	const letrasElemento = document.getElementById("letras");
	letrasElemento.innerText = "Letras erradas: " + letrasErradas;
  
	palavraElemento.innerText = palavraAdivinhada;
  
	tentativasElemento.innerText = "Tentativas restantes: " + tentativas
  }


  
