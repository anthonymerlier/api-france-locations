import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import './config/db.js'
import locationsRoutes from './api/locations/location.api.routes.js'
import geolocationsRoutes from './api/geolocations/geolocations.api.routes.js'
import departmentsRoutes from './api/departments/departments.api.routes.js'
import regionsRoutes from './api/regions/regions.api.routes.js'

const app = express();

app.use(cors({
    mode: 'no-cors',
    credentials: true,
    origin: process.env.FRONT_URL,
    "Access-Control-Allow-Origin": process.env.FRONT_URL,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false,
}))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}))
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/api/locations', locationsRoutes)
app.use('/api/geolocations', geolocationsRoutes)
app.use('/api/departments', departmentsRoutes)
app.use('/api/regions', regionsRoutes)

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', err => {
        console.error(err.stack || err)
        setTimeout(() => process.exit(1), 100)
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})