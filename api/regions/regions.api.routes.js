import express from 'express'
const regionsRoutes = express.Router()
import { getAllRegions, getRegion, findRegions, getAllRegionsGeolocations, getRegionGeolocation, findRegionByCoordinates } from './regions.api.controller.js';

// Root => api/regions

regionsRoutes.get('/', getAllRegions)
regionsRoutes.get('/:region', getRegion)
regionsRoutes.get('/find/:query', findRegions)

regionsRoutes.get('/geolocation/', getAllRegionsGeolocations)
regionsRoutes.get('/geolocation/:region', getRegionGeolocation)

regionsRoutes.get('/geolocation/:latitude/:longitude/', findRegionByCoordinates)

export default regionsRoutes;