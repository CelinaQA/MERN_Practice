'use strict';

const express = require("express");
const cors = require('cors');
const createError = require('http-errors');

// instantiate my app
const app = express();
app.use(cors());
app.use(express.json()); // body parser - must come before route

// Requests

const productRoute = require("./routes/products");

app.use("/product", productRoute);

// error handling
app.use((req, res, next) => {
    next(createError(404, `Resource not found`));
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message || `Something went wrong`);
});

app.get("/hello", (req, res) => {
    res.send("hello route");
})

// communicate with the app on a specific port

// app.listen(5019);

const server = app.listen(5001, () => {
    console.log(`Server: ${server.address().port}`)
})