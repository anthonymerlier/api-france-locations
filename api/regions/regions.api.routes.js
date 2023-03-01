import express from 'express'
const regionsRoutes = express.Router()
import {
    getAllRegions,
    getRegion,
    findRegions,
    getAllRegionsGeolocations,
    getRegionGeolocation,
    findRegionByCoordinates,
    findRegionsGeolocations
} from './regions.api.controller.js';

// Root => search/regions

regionsRoutes.get('/geolocation', findRegionByCoordinates)

regionsRoutes.get('/geolocation/all', getAllRegionsGeolocations)
regionsRoutes.get('/geolocation/:query', getRegionGeolocation)
regionsRoutes.get('/geolocation/find/:query', findRegionsGeolocations)

regionsRoutes.get('/', getAllRegions)
regionsRoutes.get('/:query', getRegion)
regionsRoutes.get('/find/:query', findRegions)

export default regionsRoutes;