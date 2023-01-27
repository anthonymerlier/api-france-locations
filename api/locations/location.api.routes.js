import express from 'express'
const locationsRoutes = express.Router()
import { getAllLocations, getLocation, findLocation, findLocationByCoordinates } from './location.api.controller.js';

locationsRoutes.get('/', getAllLocations)
locationsRoutes.get('/:location', getLocation)
locationsRoutes.get('/find/:query', findLocation)
locationsRoutes.get('/find/geolocation/:latitude/:longitude/', findLocationByCoordinates)

export default locationsRoutes;