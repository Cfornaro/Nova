const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const moviesRoutes = require('./routes/moviesRoutes');

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', moviesRoutes);
// MAS APIS??





//---------------------------------------------------------------------






// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para páginas web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'perfil.html'));
});

app.get('/registrarse', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'registrarse.html'));
});

app.get('/addMovie', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'user.html'));
});

// Configuración del servidor
const PORT = process.env.ALWAYSDATA_HTTPD_PORT || 8100;
const IP = process.env.ALWAYSDATA_HTTPD_IP || '::';

app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});