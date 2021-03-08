const express = require('express')
const app = express()
const rutas = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //Exponer una carpeta como publica para archivos estaticos
app.use('/api', rutas)

module.exports = app