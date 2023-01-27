import express from 'express'
const departmentsRoutes = express.Router()
import { getAllDepartments, getDepartment, findDepartments } from './departments.api.controller.js';

departmentsRoutes.get('/', getAllDepartments)
departmentsRoutes.get('/:department', getDepartment)
departmentsRoutes.get('/find/:query', findDepartments)

export default departmentsRoutes;