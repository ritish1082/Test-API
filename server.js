const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const authRoute = require('./routes/authApi.js');
const slotsRoute = require('./routes/slotsApi.js');
const cors=require("cors");
const mongoose = require('mongoose');

app.use(express.json())
app.use(cors())

const db_url = process.env.DB_URL;

mongoose.connect(db_url);
const db = mongoose.connection;

const port = 4000;

app.use('/authApi', authRoute);
app.use('/slotsApi', slotsRoute);

app.listen(port, () => {
    console.log(`listening at port number ${port}`);
})

db.on('error', (error) => {
    console.log(error);
})

db.once('connected', () => {
    console.log('Connected to Database');
})