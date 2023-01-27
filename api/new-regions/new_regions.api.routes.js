import express from 'express'
const newRegionsRoutes = express.Router()
import { findNewRegionByCoordinates, findNewRegions, getAllNewRegions, getAllNewRegionsGeolocations, getNewRegion, getNewRegionGeolocation } from './new_regions.api.controller.js';

// Root => api/regions/new

newRegionsRoutes.get('/', getAllNewRegions)
newRegionsRoutes.get('/:region', getNewRegion)
newRegionsRoutes.get('/find/:query', findNewRegions)

newRegionsRoutes.get('/geolocation/all', getAllNewRegionsGeolocations)
newRegionsRoutes.get('/geolocation/:region', getNewRegionGeolocation)

newRegionsRoutes.get('/geolocation/:latitude/:longitude/', findNewRegionByCoordinates)

export default newRegionsRoutes;