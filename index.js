// const express = require('express'); -> commomjs

import express from "express"; // module
import router from './routes/index.js';
import db from "./database/db.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Definir el puerto
const port = process.env.PORT || 4000;

// Origen(es)
const whiteList = ['http://localhost:3000'];

async function main() {
    try {
        // Deshabilitar los cors
        app.use(cors({ origin: [whiteList] }));

        // Conectar la base de datos
        db.authenticate().then(() => console.log('Base de datos conectada'))
            .catch(error => console.log(error));
        await db.sync({ force: false });

        // Habilitar body parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));


        // Agregar router
        app.use('/', router);

        app.listen(port, () => {
            console.log(`El servidor está funcionando en el puerto ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();