const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());

// Servidor
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor HTTP na porta ${PORT}`);
});

// Rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Websocket
var id_professor = null;
var id_aluno = null;

io.on('connection', (socket) => {

    console.log('Novo usuário conectado ao servidor websocket');

    socket.on('login-professor', (id) => {
        id_professor = id
        console.log('Professor conectado\nID: ' + id_professor);
    });

    socket.on('login-aluno', (id) => {
        id_aluno = id;
        console.log('Aluno conectado\nID: ' + id_aluno);
    });

    socket.on('quiz-finalizado', (resultadoAluno) => {

        let acertos = resultadoAluno.respostas.filter((obj) => obj.acertou == true).length;
        let total = resultadoAluno.respostas.length;
        let nota = (acertos / total) * 100;
        
        resultadoAluno.nota = nota;

        socket.to(id_professor).emit('resultado', resultadoAluno); 
    });
   
    socket.on('disconnect', (socket) => {
        console.log('Usuário ' + socket.id + ' desconectou');
    });
});
