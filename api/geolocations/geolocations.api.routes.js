import express from 'express'
const geolocationsRoutes = express.Router()
import { getAllGeolocations, findGeolocation, findLocationByCoordinates } from './geolocations.api.controller.js';

geolocationsRoutes.get('/', getAllGeolocations)
geolocationsRoutes.get('/:location', findGeolocation)
geolocationsRoutes.get('/:latitude/:longitude/', findLocationByCoordinates)

export default geolocationsRoutes;