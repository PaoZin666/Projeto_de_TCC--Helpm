const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Usar o body-parser para pegar o corpo do POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Criar o transportador de e-mail usando o Gmail (ou outro serviço de email)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@gmail.com',  // Seu email
    pass: 'sua-senha'  // Sua senha (ou use uma senha de aplicativo, se usar autenticação de dois fatores)
  }
});

// Rota para enviar o link de recuperação de senha
app.post('/reset-password', (req, res) => {
  const email = req.body.email;
  
  // Gerar um token (usando algo simples, pode ser melhorado)
  const token = Math.random().toString(36).substr(2);

  // Cria o link de reset de senha
  const resetLink = `http://seusite.com/resetar-senha?token=${token}`;

  // Configuração do e-mail
  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Link para Resetar sua Senha',
    text: `Clique no link abaixo para resetar sua senha:\n\n${resetLink}`
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Erro ao enviar o email');
    }
    res.send('Um link foi enviado para o seu email!');
  });
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
