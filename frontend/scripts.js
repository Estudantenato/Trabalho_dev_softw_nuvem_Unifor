// Lista de feriados (exemplo: Natal e Ano Novo)
const feriados = [
    '2023-12-25', // Natal
    '2024-01-01', // Ano Novo
    // Adicione mais feriados conforme necessário
];

// Função para validar se a data é um feriado
function ehFeriado(data) {
    return feriados.includes(data);
}

// Função para validar se a data é um domingo
function ehDomingo(data) {
    const [ano, mes, dia] = data.split('-');
    const dataBrasil = new Date(ano, mes - 1, dia); // Mês é 0-based (janeiro = 0)
    return dataBrasil.getDay() === 0; // 0 = domingo
}

// Função para validar se a data é um sábado
function ehSabado(data) {
    const [ano, mes, dia] = data.split('-');
    const dataBrasil = new Date(ano, mes - 1, dia); // Mês é 0-based (janeiro = 0)
    return dataBrasil.getDay() === 6; // 6 = sábado
}

// Função para validar o nome
function validarNome(nome) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(nome)) {
        return "O nome deve conter apenas letras.";
    }
    if (nome.length < 8) {
        return "Digite seu nome completo.";
    }
    return null;
}

// Função para atualizar as opções de horário com base no dia selecionado
function atualizarHorarios(data) {
    const horarioSelect = document.getElementById('horario');

    // Limpa as opções atuais
    horarioSelect.innerHTML = '<option value="" disabled selected>Selecione um horário</option>';

    // Horários disponíveis para dias úteis (segunda a sexta)
    const horariosDiasUteis = [
        '09:30', '10:00', '10:15', '10:30', '11:00', '11:30',
        '13:00', '13:15', '13:30', '14:00', '14:15', '14:30',
        '15:00', '15:15', '15:30', '16:00', '16:15', '16:30',
        '17:00', '17:15', '17:30'
    ];

    // Horários disponíveis para sábado
    const horariosSabado = [
        '09:30', '10:00', '10:15', '10:30', '11:00', '11:30',
        '13:00', '13:15', '13:30', '14:00', '14:15', '14:30',
        '15:00', '15:15', '15:30', '16:00', '16:15', '16:30',
        '17:00', '17:15', '17:30', '18:00', '18:15', '18:30',
        '19:00', '19:15', '19:30'
    ];

    // Define os horários com base no dia da semana
    const horarios = ehSabado(data) ? horariosSabado : horariosDiasUteis;

    // Adiciona as opções de horário ao <select>
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        horarioSelect.appendChild(option);
    });
}

// Função para obter o primeiro dia do mês atual
function getPrimeiroDiaDoMes() {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
}

// Função para obter o último dia do mês atual
function getUltimoDiaDoMes() {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
}

// Configura o campo de data para permitir apenas o mês atual
function configurarCalendario() {
    const dataInput = document.getElementById('data');
    dataInput.min = getPrimeiroDiaDoMes();
    dataInput.max = getUltimoDiaDoMes();
}

// Executa a configuração do calendário ao carregar a página
configurarCalendario();

// Evento de change no campo de data
document.getElementById('data').addEventListener('change', (e) => {
    const data = e.target.value;

    // Verifica se é feriado
    if (ehFeriado(data)) {
        document.getElementById('avisoHorario').textContent = "Consulte horários e vagas em datas festivas e feriados.";
        return;
    }

    // Verifica se é domingo
    if (ehDomingo(data)) {
        document.getElementById('avisoHorario').textContent = "Aos domingos não há funcionamento.";
        return;
    }

    // Atualiza as opções de horário com base no dia selecionado
    atualizarHorarios(data);
});

// Evento de submit do formulário de agendamento
document.getElementById('formAgendamento').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;

    // Verifica se é feriado
    if (ehFeriado(data)) {
        document.getElementById('avisoHorario').textContent = "Consulte horários e vagas em datas festivas e feriados.";
        return;
    }

    // Verifica se é domingo
    if (ehDomingo(data)) {
        document.getElementById('avisoHorario').textContent = "Aos domingos não há funcionamento.";
        return;
    }

    // Validação do nome
    const mensagemErroNome = validarNome(nome);
    if (mensagemErroNome) {
        document.getElementById('avisoNome').textContent = mensagemErroNome;
        return;
    } else {
        document.getElementById('avisoNome').textContent = "";
    }

    // Se tudo estiver correto, exibe a mensagem de sucesso
    alert('Agendamento realizado com sucesso!');
    salvarAgendamento(nome, servico, data, horario);
});

// Função para salvar agendamento (simulação)
function salvarAgendamento(nome, servico, data, horario) {
    console.log('Agendamento salvo:', { nome, servico, data, horario });
    // Aqui você pode enviar os dados para o back-end ou salvar no localStorage
}