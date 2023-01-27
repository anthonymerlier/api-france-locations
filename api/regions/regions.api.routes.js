import express from 'express'
const regionsRoutes = express.Router()
import { getAllRegions, getRegion, findRegions, getAllNewRegions, getNewRegion, findNewRegions, getAllRegionsGeolocations, getRegionGeolocation, findRegionByCoordinates } from './regions.api.controller.js';

// Root => api/regions

regionsRoutes.get('/geolocation/', getAllRegionsGeolocations)
regionsRoutes.get('/geolocation/:region', getRegionGeolocation)

regionsRoutes.get('/geolocation/:latitude/:longitude/', findRegionByCoordinates)

regionsRoutes.get('/new', getAllNewRegions)
regionsRoutes.get('/new/:region', getNewRegion)
regionsRoutes.get('/new/find/:query', findNewRegions)

regionsRoutes.get('/', getAllRegions)
regionsRoutes.get('/:region', getRegion)
regionsRoutes.get('/find/:query', findRegions)

export default regionsRoutes;