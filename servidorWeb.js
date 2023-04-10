// rodando Node Js no LocalHost
const http = require('http');

const server = http.createServer((req, res)=>{

    res.end('Hello Node Js')

});

const PORT = 4000;
server.listen(4000);

console.log(`Node Js rodando na porta ${PORT}`);
