import express from 'express'
const newRegionsRoutes = express.Router()
import {
    findNewRegionByCoordinates,
    findNewRegions,
    findNewRegionsGeolocations,
    getAllNewRegions,
    getAllNewRegionsGeolocations,
    getNewRegion,
    getNewRegionGeolocation
} from './new_regions.api.controller.js';

// Root => search/new-regions

newRegionsRoutes.get('/geolocation', findNewRegionByCoordinates)

newRegionsRoutes.get('/geolocation/all', getAllNewRegionsGeolocations)
newRegionsRoutes.get('/geolocation/:query', getNewRegionGeolocation)
newRegionsRoutes.get('/geolocation/find/:query', findNewRegionsGeolocations)

newRegionsRoutes.get('/', getAllNewRegions)
newRegionsRoutes.get('/:query', getNewRegion)
newRegionsRoutes.get('/find/:query', findNewRegions)

export default newRegionsRoutes;