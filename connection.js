const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require("dotenv").config();

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(cors());

const SERVICE_ACCOUNT_CREDENTIALS = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQ9/DWaczMGzWi\nudXgByB2BT2ZTXHGU5CB51Bx5cr4gjVyg+I1NCPWojl66muJMEW9d0+IweSXZ4yB\nSe9A6OctMS/J3gddwmwcmibcPT8DxFOqr/uROTGYWJky7TQmAF95LsqFIs11AUdY\nwjPuGoIQussMnFyAnLCaNSfqQheQmX0zvW4EX4YkDpijWArG4cN+zqM4PMDyOwOz\nDCo2/qm/s6VQpDIS80iohes+5BoxoRJkBYYffsa46Z6bFl54cl5xFtei1/uFCQ6D\ntKPRrjuzZ/vDHqaobL35kLcOrDgB/v3xSNr30F0zOAaSvtGGpWpYDBGBb1IkYyCK\nfQpl2H6RAgMBAAECggEAAYanUwAuSe5H770w1zmOGTaJat7CfjAwMwv7+Hz1BL1k\nrlumsadEvLruCwb+YTUsSTQqF/BR3vDXY+lPjoyKME22kOA8HbPqA10f0VtpeU78\nIm1gZlYsgHWN1tidw8pHEt+OhIw1bmLjlmhtUHzlPBc1HOLhF7etNXm+Zcr07kN2\nomS7kAkmf/QT1H1wDJBC9wJqFVQynxIBSoLaeTrRvwf/PYit0nCLHmbBVV5hY/aW\nP2/VUUOvrhDpdByqWxEVHYUbhGrj4GSXB5Me+UNqhJLMD5QlJFye7VE07YCDzvho\nXPvY6K74YnA+R8tfq1wV9Fc/OtFNQeXlGgdE8NT1gQKBgQDn4ZZlOOf7uOrLoe7p\nLxQ6Lw/RVZB+z+oRkIbx8pKtz85Q9/JKISwAazb9UCFdcnoZL10i120HANko4PVe\ntdnbeNrRxmIckQP1+tkMkXcL8pRaccDXO8yKjajyWwVy9KglCHv8fuZbJ84yo4vI\npybv1vC67GjBgqILaNM9YYWVIQKBgQDmtD8KKrN59YHLL7c1Hdrk3ABi2abkKH09\nSAVLesgXTCv4jESX9MrcksiKdj8ZdZHA+46e3zl+8uZqCQ3N2DQeQyL+8EHTvzcb\nY3eUujCd/swRzhGwqcb2EtDFFJciwj8tZPcvOkKiHwwwuLCJFR3CRDKGSdqHQM8f\nyBcHUBFLcQKBgArApDe3ZtJ+ZazhqnF3tGlqS0J6xEONIp6D5C4OAI08yKVqifq0\nBRVT423lrFZn+491ac02ziB4ApnprJciuaJ6vTLjDyOh+dwLMMtrZ2jPa9+xzK5u\nYHLAVOhAHkWRYMau2QkBXW82rlIc0VuRnLWccvdIBSeMBjWfO8Rp5EbhAoGAQHHL\nRkjFV+Unu515nQHY+qMmDHbmMsfIrEypBfunVzK0+bodEyGTZWgvUtZTLAZ2j6T1\noxWSFw89JBOhYoXpkSaJ6RMuIDtC5oizh703BXt+f97DfEkAxg5deSAWU+RVB5Yz\nomKw6F6p5hZBYhme9XxdbLvGqo+FDEi1fhp0qlECgYEAqb0zitF13gKQz2j6u0xx\nuBmzZVRatasvPNVnW0ZzzyU8OZ9+EWe2/m1dhXPZtKvV0UQcpvq+7L/pWjc1+coO\nPE4TL/DF6OGWPf0Idac9S/GEsTztxSAoDo+6AimHrhlwqkk2ud1TP98ZMVRRLJXA\nMICcFohejzZEFHxfc/oE0LQ=\n-----END PRIVATE KEY-----\n",
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
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

//Engenharia
app.get('/getDataEngResumo', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'Resumo',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngResumoMensal', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'resumo_mensal',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngGastoMaterial', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'gasto_material',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngEquipamentos', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'locacao_equipamento',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngMaoObra', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'mao_de_obra',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngCronograma', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'cronograma',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});
app.get('/getDataEngInventario', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ru3cS78cw-7T4hyxgknpAumhBa38fKSiddsJvSgLiwY',
      range: 'Inventario',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/historico_clientes_adriel', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '18qQpZbOuMIR3RieJ7TxM8z4xveUZ9R3jEUsWLCVAz7Q',
      range: 'Dados_Consolidados',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/produtos_nutrimentos_adriel', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '18qQpZbOuMIR3RieJ7TxM8z4xveUZ9R3jEUsWLCVAz7Q',
      range: 'produtos_nutrimentos',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/produtos_racoes_adriel', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '18qQpZbOuMIR3RieJ7TxM8z4xveUZ9R3jEUsWLCVAz7Q',
      range: 'produtos_racoes',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/clientes_adriel', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '18qQpZbOuMIR3RieJ7TxM8z4xveUZ9R3jEUsWLCVAz7Q',
      range: 'clientes',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/hospital', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ce2DTFIRAPuIvMQwXgljzgHzr1MMIt0Xs_uftoQrY94',
      range: 'base',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados do Google Sheets', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: "Success",
    msg: "Api Google sheets rodando!"
  });
});

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


module.exports = app;  // Exporta o app para ser usado como função
