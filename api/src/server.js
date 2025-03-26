const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Parse = require('parse/node');

const app = express();
const PORT = 3000;

// Configuração do Parse (Back4App)
Parse.initialize("SUA_APP_ID", "SUA_JS_KEY"); // Substitua pelas suas credenciais
Parse.serverURL = 'https://parseapi.back4app.com/';

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota para listar agendamentos
app.get('/api/agendamentos', async (req, res) => {
    const query = new Parse.Query('Agendamento');
    try {
        const agendamentos = await query.find();
        res.json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um agendamento
app.post('/api/agendamentos', async (req, res) => {
    const { nome, servico, data, horario } = req.body;

    const Agendamento = Parse.Object.extend('Agendamento');
    const agendamento = new Agendamento();

    agendamento.set('nome', nome);
    agendamento.set('servico', servico);
    agendamento.set('data', data);
    agendamento.set('horario', horario);

    try {
        await agendamento.save();
        res.json({ message: 'Agendamento salvo com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});