<template>
  <div class="container">
    <h1>Jogo da Forca</h1>
    <p>{{ hiddenWord }}</p>
    <div v-if="gameOver">
      <h2>{{ gameOverMessage }}</h2>
      <button @click="restartGame()">Jogar novamente</button>
    </div>
    <div v-else>
      <p>Tentativas restantes: {{ attemptsLeft }}</p>
      <div class="keyboard">
        <button v-for="letter in alphabet" :key="letter" @click="makeGuess(letter)" :disabled="usedLetters.includes(letter)">
          {{ letter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
  name: 'JogoDaForca',
  data() {
    return {
      hiddenWord: '',
      usedLetters: [],
      attemptsLeft: 6,
      gameOver: false,
      gameOverMessage: '',
      alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      socket: io('http://localhost:3000'), // URL do servidor WebSocket
    };
  },
  mounted() {
    // Carrega uma nova palavra aleatória do servidor quando a página é carregada
    axios.get('http://localhost:3000/random-word').then(response => {
      this.hiddenWord = response.data.word;
    });

    // Configura o tratamento de eventos WebSocket
    this.socket.on('guess', data => {
      this.usedLetters.push(data.letter);
      if (!this.hiddenWord.includes(data.letter)) {
        this.attemptsLeft--;
      }
      if (this.attemptsLeft === 0) {
        this.gameOver = true;
        this.gameOverMessage = 'Você perdeu! A palavra era: ' + this.hiddenWord;
      } else if (this.hiddenWord.split('').every(letter => this.usedLetters.includes(letter))) {
        this.gameOver = true;
        this.gameOverMessage = 'Parabéns, você ganhou!';
      }
    });
  },
  methods: {
    makeGuess(letter) {
      this.socket.emit('guess', { letter });
    },
    restartGame() {
      this.hiddenWord = '';
      this.usedLetters = [];
      this.attemptsLeft = 6;
      this.gameOver = false;
      this.gameOverMessage = '';

      axios.get('http://localhost:3000/random-word').then(response => {
        this.hiddenWord = response.data.word;
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin: 20px 0;
}

button {
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 5px;
  background-color: #ddd;
  color: #333;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  /* Estilos para telas menores que 768px */
}
</style>
