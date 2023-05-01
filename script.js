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