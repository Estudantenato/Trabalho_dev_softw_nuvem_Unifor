const express = require('express');
const router = express.Router();

// Rota para buscar dados
router.get('/dados', (req, res) => {
    const dados = [
        { id: 1, nome: 'João', email: 'joao@example.com' },
        { id: 2, nome: 'Maria', email: 'maria@example.com' },
    ];
    res.json(dados);
});

// Rota para salvar dados
router.post('/salvar', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios!' });
    }

    // Aqui você pode salvar os dados em um banco de dados
    console.log('Dados recebidos:', { nome, email });

    res.json({ mensagem: 'Dados recebidos com sucesso!' });
});

module.exports = router;