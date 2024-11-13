function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length > 11) cpf = cpf.substring(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isOldEnough(birthdate) {
    const minAge = 13;
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    if (age > minAge) return true;
    if (age === minAge && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0))) return true;
    return false;
}

document.getElementById('cpf').addEventListener('input', function(event) {
    event.target.value = formatarCPF(event.target.value);
    document.getElementById('cpfError').textContent = '';
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let hasError = false;

    // Validar Nome Completo
    const username = document.getElementById('username');
    if (!username.value) {
        document.getElementById('usernameError').textContent = 'Por favor, preencha o nome completo.';
        hasError = true;
    } else {
        document.getElementById('usernameError').textContent = '';
    }

    // Validar CPF
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        document.getElementById('cpfError').textContent = 'CPF inválido. Por favor, tente novamente.';
        hasError = true;
    } else {
        document.getElementById('cpfError').textContent = '';
    }

    // Validar Data de Nascimento
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate || !isOldEnough(birthdate)) {
        document.getElementById('birthdateError').textContent = 'Você deve ter pelo menos 13 anos.';
        hasError = true;
    } else {
        document.getElementById('birthdateError').textContent = '';
    }

    // Validar Email
    const email = document.getElementById('email');
    if (!email.value) {
        document.getElementById('emailError').textContent = 'Por favor, preencha o email.';
        hasError = true;
    } else if (!isValidEmail(email.value)) {
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido.';
        hasError = true;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Validar Senha
    const password = document.getElementById('password');
    if (!password.value) {
        document.getElementById('passwordError').textContent = 'Por favor, preencha a senha.';
        hasError = true;
    } else if (password.value.length < 8) {
        document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 8 caracteres.';
        hasError = true;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (!hasError) {
        window.location.href = './index.html';
    }
});
