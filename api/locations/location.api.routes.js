import express from 'express'
const locationsRoutes = express.Router()
import {
    getAllLocations,
    getLocation,
    findLocation,
    getAllGeolocations,
    getGeolocation,
    findLocationByCoordinates,
    findGeolocations
} from './location.api.controller.js';

// Root => api/locations

locationsRoutes.get('/geolocation', findLocationByCoordinates)

locationsRoutes.get('/geolocation/all', getAllGeolocations)
locationsRoutes.get('/geolocation/:location', getGeolocation)
locationsRoutes.get('/geolocation/find/:query', findGeolocations)

locationsRoutes.get('/', getAllLocations)
locationsRoutes.get('/:location', getLocation)
locationsRoutes.get('/find/:query', findLocation)

export default locationsRoutes;