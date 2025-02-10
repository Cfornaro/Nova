const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const apiRoutes = require('./routes');

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
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
// });

// Configuración del servidor
const PORT = process.env.HTTP_PORT || 8100;
const IP = process.env.HTTP_IP || '::';

app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});