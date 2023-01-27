import express from 'express'
const regionsRoutes = express.Router()
import {
    getAllRegions,
    getRegion,
    findRegions,
    getAllRegionsGeolocations,
    getRegionGeolocation,
    findRegionByCoordinates
} from './regions.api.controller.js';

// Root => api/regions

regionsRoutes.get('/geolocation', findRegionByCoordinates)

regionsRoutes.get('/geolocation/all', getAllRegionsGeolocations)
regionsRoutes.get('/geolocation/:region', getRegionGeolocation)

regionsRoutes.get('/', getAllRegions)
regionsRoutes.get('/:region', getRegion)
regionsRoutes.get('/find/:query', findRegions)

export default regionsRoutes;