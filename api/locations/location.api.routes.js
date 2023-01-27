import express from 'express'
const locationsRoutes = express.Router()
import { getAllLocations, getLocation, findLocation, findLocationByCoordinates, getAllGeolocations, getGeolocation } from './location.api.controller.js';

// Root => api/locations

locationsRoutes.get('/geolocation/', getAllGeolocations)
locationsRoutes.get('/geolocation/:location', getGeolocation)

locationsRoutes.get('/geolocation/:latitude/:longitude/', findLocationByCoordinates)

locationsRoutes.get('/', getAllLocations)
locationsRoutes.get('/:location', getLocation)
locationsRoutes.get('/find/:query', findLocation)

export default locationsRoutes;