const connection = require('../db/connection');

//especificamos las funciones que seran exportadas, aqui es donde entra la lógica
exports.getAllMovies = (req, res) => {
    connection.query('SELECT * FROM personajes', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};

exports.getMovieById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM personajes WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
};

exports.addMovie = (req, res) => {
    const {campo1, campo2, campo3 } = req.body;
    const query = 'INSERT INTO personajes (campo1, campo2, campo3) VALUES (?, ?, ?)';
    connection.query(query, [campo1, campo2, campo3], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al insertar personajes');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
};


// Otros controladores para POST, PUT, DELETE si queremos implementar