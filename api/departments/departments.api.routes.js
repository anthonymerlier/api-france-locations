import express from 'express'
const departmentsRoutes = express.Router()
import { getAllDepartments, getDepartment, findDepartments, getAllDepartmentsGeolocations, getDepartmentGeolocation, findDepartmentByCoordinates } from './departments.api.controller.js';

// Root => api/departments

departmentsRoutes.get('/geolocation/', getAllDepartmentsGeolocations)
departmentsRoutes.get('/geolocation/:department', getDepartmentGeolocation)

departmentsRoutes.get('/geolocation/:latitude/:longitude/', findDepartmentByCoordinates)

departmentsRoutes.get('/', getAllDepartments)
departmentsRoutes.get('/:department', getDepartment)
departmentsRoutes.get('/find/:query', findDepartments)

export default departmentsRoutes;