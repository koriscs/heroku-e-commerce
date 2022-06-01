const express = require('express');
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send("We are lit!");
})

app.listen(port, ()=> {
    console.log(`App is listening on ${port}`);
})
