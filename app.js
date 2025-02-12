const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const apiRoutes = require('./routes');
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', apiRoutes);



//---------------------------------------------------------------------






// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para páginas web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
// });

app.get('/crearPlayer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'crearPlayer.html'));
});

// Configuración del servidor
const PORT = process.env.HTTP_PORT || 8200;
const IP = process.env.HTTP_IP || 'localhost';

app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});
