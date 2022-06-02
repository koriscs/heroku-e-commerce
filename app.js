const express = require('express');
const app = express();
const dotenv = require('dotenv');
const pool = require('./database');

app.use(express.json());


dotenv.config();

const port = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    
    pool.query('SELECT * FROM customers;',(error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    
})

app.listen(port, ()=> {
    console.log(`App is listening on `);
})
