const express = require('express');

const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const index = express();

const path = require ('path')

index.use(bodyParser.json());


//mysql

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uniminuto'

});

//RUTA

index.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'index.html'))

});

index.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'login.html'))

});

index.get('/registrar.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'registrar.html'))

});

index.get('/registrarElemento.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'registrarElemento.html'))

});

index.get('/listaElemento.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'listaElemento.html'))

});

index.get('/prueba.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'prueba.html'))

});

index.get('/editarCliente.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'editarCliente.html'))

});

// todos los clientes

index.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay resultado');
        }
    });
});

index.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM clientes WHERE id = ${id}';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay resultado');
        }
    });
});

index.post('/agregar', (req, res) => {
    const sql = 'INSERT INTO clientes SET ?';

    const clientesObj = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email
    }

    connection.query(sql, clientesObj, error => {
        if (error) throw error;
        res.send('Cliente creado')

    });
});

index.put('/actualizar/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, email} = req.body;
    const sql = `UPDATE clientes SET nombre = '${nombre}', apellido='${apellido}', email='${email}' WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Cliente actualizado');
    });

});

index.delete('/eliminar/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM clientes WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Cliente eliminado');
    });

});

//Check connect

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});


index.listen(PORT, () => console.log('Server running on port ${PORT}'));
