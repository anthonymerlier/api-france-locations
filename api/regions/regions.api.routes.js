import express from 'express'
const regionsRoutes = express.Router()
import { getAllRegions, getRegion, findRegions } from './regions.api.controller.js';
import { getAllNewRegions, getNewRegion, findNewRegions } from './new_regions.api.controller.js';

regionsRoutes.get('/new', getAllNewRegions)
regionsRoutes.get('/new/:region', getNewRegion)
regionsRoutes.get('/new/find/:query', findNewRegions)

regionsRoutes.get('/', getAllRegions)
regionsRoutes.get('/:region', getRegion)
regionsRoutes.get('/find/:query', findRegions)

export default regionsRoutes;