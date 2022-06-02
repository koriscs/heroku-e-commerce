const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pool = require('./database');

app.use(express.json());


dotenv.config();

const port = process.env.PGPORT || 3000;

app.get('/', (req, res) =>{
    res.send("<h1>We are lit2!</h1>");
    pool.query('SELECT * FROM customers;',(error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
})

app.listen(port, ()=> {
    console.log(`App is listening on `);
})
