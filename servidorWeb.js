// rodando Node Js no LocalHost

const http = require('http');
const express = require('express');
// const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// const ws = new WebSocket.Server({ server });

const {
    MongoClient
} = require('mongodb');

var db;
var locais;
var names;
async function conecta()
{
    var client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = await client.db("NOVO_DB");
    locais = await db.collection("places");
    // Inicia o servidor
    server.listen(4000, () => {
    console.log('Servidor iniciado na porta 27');
  });
}

async function inserte()
{
    try {
        await locais.insertOne(JSON.stringify(msg));
        
    } catch (e) {
        print (e);
    }
}

async function lista()
{
    try {
        const palavras = await locais.getCollectionInfos();
        print(palavras)
    } catch (error) {
        print ("error");
    }
}


async function init()
{
    await conecta();
    await inserte();
}

init();
