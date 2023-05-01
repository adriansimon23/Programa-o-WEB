const express = require('express');
const { MongoClient } = require('mongodb');
const fs = require('fs/promises');
const WebSocket = require('ws');

var db;
var locais;
var wss;

async function conecta() {
  var client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  db = await client.db("NOVO_DB");
  locais = await db.collection("places");
}

async function inserir(req, res) {
  try {
    const local = req.body;
    let a = await locais.insertOne(local);
    console.log(a);
    res.send('Nova localização adicionada');
    wss.clients.forEach(client => {
      client.send('Nova localização adicionada');
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Erro ao adicionar localização');
  }
}

async function listar(req, res) {
  try {
    let a = await locais.find({}).toArray();
    res.send(a);
  } catch (e) {
    console.log(e);
    res.status(500).send('Erro ao listar localizações');
  }
}

async function remover(req, res) {
  try {
    const nome = req.params.nome;
    let a = await locais.deleteOne({ nome: nome });
    console.log(a);
    res.send('Localização removida com sucesso');
  } catch (e) {
    console.log(e);
    res.status(500).send('Erro ao remover localização');
  }
}

async function init() {
  await conecta();
  const app = express();
  app.use(express.json());
  app.post('/locais', inserir);
  app.get('/locais', listar);
  app.delete('/locais/:nome', remover);
  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
  wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (message) => {
      console.log(`Recebido mensagem: ${message}`);
    });
  });
}

init();