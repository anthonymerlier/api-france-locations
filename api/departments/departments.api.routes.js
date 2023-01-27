import express from 'express'
const departmentsRoutes = express.Router()
import { getAllDepartments, getDepartment, findDepartments, getAllDepartmentsGeolocations, getDepartmentGeolocation, findDepartmentByCoordinates } from './departments.api.controller.js';

// Root => api/departments

departmentsRoutes.get('/', getAllDepartments)
departmentsRoutes.get('/:department', getDepartment)
departmentsRoutes.get('/find/:query', findDepartments)

departmentsRoutes.get('/geolocation/all', getAllDepartmentsGeolocations)
departmentsRoutes.get('/geolocation/:department', getDepartmentGeolocation)

departmentsRoutes.get('/geolocation/:latitude/:longitude/', findDepartmentByCoordinates)

export default departmentsRoutes;