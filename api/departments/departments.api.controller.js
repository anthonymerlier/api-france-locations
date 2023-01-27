import DepartmentModel from "./departments.api.model.js"
import DepartmentGeoJSONModel from "./departments.geojson.api.model.js"

/**
 * Get all departments
 */

export const getAllDepartments = (req, res) => {
    DepartmentModel.find({},
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.log('Error to get data => ' + err)
        })
        .sort('nom_departement')
}

/**
 * Get department by name
 */

export const getDepartment = (req, res) => {
    DepartmentModel.findOne({
        "nom_departement": {
            $regex: encodeURI(req.params.department),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('nom_departement')
        .select()
}

/**
 * Find departments from query
 */

export const findDepartments = (req, res) => {
    DepartmentModel.find({
        "nom_departement": {
            $regex: encodeURI(req.params.query),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('nom_departement')
        .limit(15)
}

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

/**
 * Get all departments geolocations
 */

export const getAllDepartmentsGeolocations = (req, res) => {
    DepartmentGeoJSONModel.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data => ' + err)
        }
    })
}

/**
 * Get departments geolocation by department name
 */

export const getDepartmentGeolocation = (req, res) => {
    DepartmentGeoJSONModel.findOne({
        'properties.nom': {
            $regex: encodeURI(req.params.department),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('properties.nom')
        .select()
}