import express from 'express'
const departmentsRoutes = express.Router()
import {
    getAllDepartments,
    getDepartment,
    findDepartments,
    getAllDepartmentsGeolocations,
    getDepartmentGeolocation,
    findDepartmentByCoordinates
} from './departments.api.controller.js';

// Root => api/departments

departmentsRoutes.get('/geolocation', findDepartmentByCoordinates)

departmentsRoutes.get('/geolocation/all', getAllDepartmentsGeolocations)
departmentsRoutes.get('/geolocation/:department', getDepartmentGeolocation)

departmentsRoutes.get('/', getAllDepartments)
departmentsRoutes.get('/:department', getDepartment)
departmentsRoutes.get('/find/:query', findDepartments)

export default departmentsRoutes;