const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors()); // Permitir chamadas do front-end

const SERVICE_ACCOUNT_CREDENTIALS = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
};

const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.get('/getData', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1k6ntEzHEHwfcWXsTL728zv797BbabDue0dZU6cq0QWw',
      range: 'GERAL',
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do Google Sheets', details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));