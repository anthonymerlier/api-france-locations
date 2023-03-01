import express from 'express'
const departmentsRoutes = express.Router()
import {
    getAllDepartments,
    getDepartment,
    findDepartments,
    getAllDepartmentsGeolocations,
    getDepartmentGeolocation,
    findDepartmentByCoordinates,
    findDepartmentsGeolocations
} from './departments.api.controller.js';

// Root => search/departments

departmentsRoutes.get('/geolocation', findDepartmentByCoordinates)

departmentsRoutes.get('/geolocation/all', getAllDepartmentsGeolocations)
departmentsRoutes.get('/geolocation/:query', getDepartmentGeolocation)
departmentsRoutes.get('/geolocation/find/:query', findDepartmentsGeolocations)

departmentsRoutes.get('/', getAllDepartments)
departmentsRoutes.get('/:query', getDepartment)
departmentsRoutes.get('/find/:query', findDepartments)

export default departmentsRoutes;