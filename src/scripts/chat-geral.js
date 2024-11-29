function enviarAreaRisco() {
    const area = document.getElementById('area').value.trim();

    if (!area) {
        alert('Por favor, descreva a área de risco antes de enviar.');
        return;
    }

    document.getElementById('alertRisco').style.display = 'block';
    setTimeout(() => {
        document.getElementById('alertRisco').style.display = 'none';
    }, 3000);
}

function enviarDenuncia() {
    const denuncia = document.getElementById('denuncia').value.trim();
    const identificacao = document.getElementById('identificacao').value;

    if (!denuncia) {
        alert('Por favor, descreva a denúncia antes de enviar.');
        return;
    }

    if (!identificacao) {
        alert('Por favor, selecione se deseja se identificar.');
        return;
    }

    document.getElementById('alertDenuncia').style.display = 'block';
    setTimeout(() => {
        document.getElementById('alertDenuncia').style.display = 'none';
    }, 3000);
}

function agendarHorario() {
    const nome = document.getElementById('nome').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    if (!nome || !data || !hora) {
        alert('Por favor, preencha todos os campos antes de agendar.');
        return;
    }

    const dataHoraSelecionada = new Date(`${data}T${hora}`);
    const agora = new Date();
    const umaHoraDepois = new Date(agora.getTime() + 60 * 60 * 1000);

    if (dataHoraSelecionada <= umaHoraDepois) {
        alert('O horário selecionado deve ser pelo menos 1 hora à frente do horário atual.');
        return;
    }

    document.getElementById('alertAgendamento').style.display = 'block';
    setTimeout(() => {
        document.getElementById('alertAgendamento').style.display = 'none';
    }, 3000);
}
