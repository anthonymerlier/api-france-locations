import express from 'express'
const locationsRoutes = express.Router()
import {
    getAllLocations,
    getLocation,
    findLocations,
    getGeolocation,
    findLocationByCoordinates,
    findGeolocations
} from './location.api.controller.js';

// Root => search/locations

locationsRoutes.get('/geolocation', findLocationByCoordinates)

locationsRoutes.get('/geolocation/:query', getGeolocation)
locationsRoutes.get('/geolocation/find/:query', findGeolocations)

locationsRoutes.get('/', getAllLocations)
locationsRoutes.get('/:query', getLocation)
locationsRoutes.get('/find/:query', findLocations)

export default locationsRoutes;