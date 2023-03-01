import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import './config/db.js'

import locationsRoutes from './api/locations/location.api.routes.js'
import departmentsRoutes from './api/departments/departments.api.routes.js'
import regionsRoutes from './api/regions/regions.api.routes.js'
import newRegionsRoutes from './api/new-regions/new_regions.api.routes.js'

const app = express();

app.use(cors({
    'credentials': true,
    'origin': '*',
    "Access-Control-Allow-Origin": true,
    'allowedHeaders': ['Content-Type', 'Authorization', 'application'],
    'methods': 'GET',
    'preflightContinue': false,
}))

app.use(helmet())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too Many Request from this IP, please try again in an 15 minutes'
})

app.use(limiter)

app.use(express.json({ limit: '15kb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '15kb'
}))
app.use(bodyParser.json({ limit: '15kb' }))

app.use(ExpressMongoSanitize({
    allowDots: true,
}));

app.use('/search/locations', locationsRoutes)
app.use('/search/departments', departmentsRoutes)
app.use('/search/regions', regionsRoutes)
app.use('/search/new-regions', newRegionsRoutes)

app.get("*", async (req, res) => {
    return res.status(400).json({ error: `Cette route n'existe pas.` })
})

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', err => {
        console.error(err.stack || err)
        setTimeout(() => process.exit(1), 100)
    })
}

process.on('unhandledRejection', err => {
    console.log('Erreur :');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})