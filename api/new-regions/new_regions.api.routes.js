import express from 'express'
const newRegionsRoutes = express.Router()
import {
    findNewRegionByCoordinates,
    findNewRegions,
    getAllNewRegions,
    getAllNewRegionsGeolocations,
    getNewRegion,
    getNewRegionGeolocation
} from './new_regions.api.controller.js';

// Root => api/regions/new

newRegionsRoutes.get('/geolocation', findNewRegionByCoordinates)

newRegionsRoutes.get('/geolocation/all', getAllNewRegionsGeolocations)
newRegionsRoutes.get('/geolocation/:region', getNewRegionGeolocation)

newRegionsRoutes.get('/', getAllNewRegions)
newRegionsRoutes.get('/:region', getNewRegion)
newRegionsRoutes.get('/find/:query', findNewRegions)

export default newRegionsRoutes;