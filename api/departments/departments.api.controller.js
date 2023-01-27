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
 * @param {*} department Name of the department
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
 * @param {*} query Query to find departments
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findDepartments = (req, res) => {
    const queries = {
        limit: req.query.limit ?  Number(req.query.limit) : 15,
        sort: req.query.sort ?  (req.query.sort).toString() : 'nom_departement'
    }

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
        .sort(queries.sort)
        .limit(queries.limit)
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
 * @param {*} department Name of the department
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

/**
 * Find departments by coordinates
 * @param {*} latitude Latitude coord
 * @param {*} longitude Longitude coord
 * @param {*} max_distance Max distance around location point (?max_distance=)
 * @param {*} min_distance Min distance arounded location point (?min_distance=)
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findDepartmentByCoordinates = (req, res) => {
    const latitude = Number(req.params.latitude)
    const longitude = Number(req.params.longitude)

    const queries = {
        max_distance: req.query.max_distance ?  Number(req.query.max_distance) : 10000,
        min_distance: req.query.min_distance ?  Number(req.query.min_distance) : 0,
        limit: req.query.limit ?  Number(req.query.limit) : 100,
        sort: req.query.sort ?  (req.query.sort).toString() : 'properties.nom'
    }

    DepartmentGeoJSONModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: queries.max_distance,
                minDistance: queries.min_distance,
                distanceMultiplier : 0.001
            }
        }
    ],
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort(queries.sort)
        .limit(queries.limit)
}