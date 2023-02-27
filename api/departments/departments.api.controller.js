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
 * @param {string} department - Name of the department
 */

export const getDepartment = (req, res) => {
    DepartmentModel.findOne({
        "nom_departement": {
            $regex: `\\b(^|\\s|[^\\W])${encodeURI(req.params.department)}(\\s|[^\\W]|$)\\b`,
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
 * @param {string} query - Query to find departments
 * @param {number} limit - Limit the number of element returned (?limit=)
 * @param {string} sort - Sort the response by this field (?sort=)
 */

export const findDepartments = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'nom_departement'
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

/**
 * Find departments by coordinates
 * @param {number} latitude - Latitude coord
 * @param {number} longitude - Longitude coord
 * @param {number} max_distance - Max distance around location point in meters (?max_distance=), default to 0.
 * @param {number} min_distance - Min distance arounded location point in meters (?min_distance=), default to 0.
 * @param {number} limit - Limit the number of element returned (?limit=), default to 1.
 * @param {string} sort - Sort the response by this field (?sort=)
 * @param {string} return - Choose the element that should be returned. Default to `both` (?return=).
 * - `geojson` will return department geojson only
 * - `department` will return the department informations only
 * - `both` will return an object containing geojson and department informations
 */

export const findDepartmentByCoordinates = (req, res) => {
    const queries = {
        lat: Number(req.query.lat),
        lon: Number(req.query.lon),
        max_distance: req.query.max_distance ? Number(req.query.max_distance) : 0,
        min_distance: req.query.min_distance ? Number(req.query.min_distance) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom',
        return: req.query.return ? (req.query.return).toString() : "both"
    }

    DepartmentGeoJSONModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [queries.lon, queries.lat]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: queries.max_distance,
                distanceMultiplier: 0.001
            }
        }
    ],
        (err, docs) => {
            if (!err) {
                let array = []
                let results = []
                switch (queries.return) {
                    case 'geojson':
                        res.send(docs)
                        break;
                    case 'department':
                        array = docs.map(value => { return new RegExp(value.properties.nom) });
                        array.forEach((word, i) => {
                            DepartmentModel.findOne({
                                "nom_departement": {
                                    $regex: word,
                                    $options: "i"
                                }
                            },
                                (err, result) => {
                                    if (!err) {
                                        results = [...results, result]
                                        if (i === docs.length - 1) {
                                            res.send(results)
                                        }
                                    }
                                    else console.error(err)
                                })
                                .sort('nom_departement')
                                .select()
                        })
                        break;
                    default:
                        array = docs.map(value => { return new RegExp(value.properties.nom) });
                        array.forEach((word, i) => {
                            DepartmentModel.findOne({
                                "nom_departement": {
                                    $regex: word,
                                    $options: "i"
                                }
                            },
                                (err, result) => {
                                    if (!err) {
                                        results = [...results, Object.assign(docs[i], { department: result })]
                                        if (i === docs.length - 1) {
                                            res.send(results)
                                        }
                                    }
                                    else console.error(err)
                                })
                                .sort('nom_departement')
                                .select()
                        })
                        break;
                }
            }
            else {
                console.error(err)
            }
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
 * @param {string} department - Name of the department
 */

export const getDepartmentGeolocation = (req, res) => {
    DepartmentGeoJSONModel.findOne({
        'properties.nom': {
            $regex: `\\b(^|\\s|[^\\W])${encodeURI(req.params.department)}(\\s|[^\\W]|$)\\b`,
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
 * Find departments from query
 * @param {*} query - Query to find departments
 * @param {*} limit - Limit the number of element returned (?limit=)
 * @param {*} sort - Sort the response by this field (?sort=)
 */

export const findDepartmentsGeolocations = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 10,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom'
    }

    DepartmentGeoJSONModel.find({
        "properties.nom": {
            $regex: encodeURI(req.params.query),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                return res.send(docs)
            else console.error(err)
        })
        .sort(queries.sort)
        .limit(queries.limit)
}