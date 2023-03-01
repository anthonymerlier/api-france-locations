import LocationModel from "./location.api.model.js"
import LocationGeoJSONModel from './location.geojson.api.model.js'
import { convertStringToRegexp, isDecimalDegreeLatitude, isDecimalDegreeLongitude } from "../../utils/validation.utils.js"

/**
 * Get all locations
 */

export const getAllLocations = (req, res) => {
    // LocationModel.find({}, (err, docs) => {
    //     if (!err)
    //         res.send(docs)
    //     else console.log('Error to get data => ' + err)
    // })
    return res.status(400).json({ error: 'Cette requête n\'est pas possible, le nombre de documents demandés est trop important.' })
}

/**
 * Get location by name
 * @param {*} location - Name of the location
 */

export const getLocation = (req, res) => {
    LocationModel.find({
        $text: {
            $search: req.params.query,
        },
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort({ score: { $meta: "textScore" } })
        .limit(1)
        .select()
}

/**
 * Find location from query
 * @param {*} query - Query to find locations
 * @param {*} limit - Limit the number of element returned (?limit=)
 * @param {*} sort - Sort the response by this field (?sort=)
 */

export const findLocations = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'fields.com_nom'
    }

    if (req.query.limit > 100) {
        queries['limit'] = 100
    }

    const query = convertStringToRegexp(req.params.query)

    LocationModel.find({
        "fields.com_nom": {
            $regex: query
        },
    },
        (err, docs) => {
            if (!err)
                return res.send(docs)
            else console.error(err)
        })
        .sort(queries.sort)
        .limit(queries.limit)
}

/**
 * Get all locations geolocations
 */

export const getAllGeolocations = (req, res) => {
    LocationGeoJSONModel.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data => ' + err)
        }
    })
}

/**
 * Get location geolocation by location name
 * @param {*} location - Name of the location
 */

export const getGeolocation = (req, res) => {
    LocationGeoJSONModel.find({
        $text: {
            $search: req.params.query,
        },
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort({ score: { $meta: "textScore" } })
        .limit(1)
        .select()
}

/**
 * Find location from query
 * @param {*} query - Query to find locations
 * @param {*} limit - Limit the number of element returned (?limit=)
 * @param {*} sort - Sort the response by this field (?sort=)
 */

export const findGeolocations = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 10,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom'
    }

    if (req.query.limit > 100) {
        queries['limit'] = 100
    }

    const query = convertStringToRegexp(req.params.query)

    LocationGeoJSONModel.find({
        "properties.nom": {
            $regex: query,
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

/**
 * Find locations by coordinates
 * @param {number} latitude - Latitude coord
 * @param {number} longitude - Longitude coord
 * @param {number} max_distance - Max distance around location point in meters `?max_distance=`, default to 0.
 * @param {number} min_distance - Min distance arounded location point in meters `?min_distance=`, default to 0.
 * @param {number} limit - Limit the number of element returned `?limit=`, default to 20.
 * @param {string} sort - Sort the response by this field `?sort=`.
 * @param {string} return - Choose the element that should be returned `&return=`. Default to `both`.
 * - `geojson` will return location geojson only
 * - `informations` will return the location informations only
 * - `both` will return an object containing geojson and location informations
 */

export const findLocationByCoordinates = (req, res) => {
    const queries = {
        lat: Number(req.query.lat),
        lon: Number(req.query.lon),
        max_distance: req.query.max_distance ? Number(req.query.max_distance) : 0,
        min_distance: req.query.min_distance ? Number(req.query.min_distance) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 20,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom',
        return: req.query.return ? (req.query.return).toString() : "both"
    }

    if (!req.query.lat) {
        return res.status(400).json({ error: 'Le paramètre `lat` (latitude) est obligatoire pour effectuer une recherche géographique.' })
    } else {
        if (!isDecimalDegreeLatitude(req.query.lat)) {
            return res.status(400).json({ error: 'Le paramètre `lat` n\'est pas valide.' })
        }
    }

    if (!req.query.lon) {
        return res.status(400).json({ error: 'Le paramètre `lon` (longitude) est obligatoire pour effectuer une recherche géographique.' })
    } else {
        if (!isDecimalDegreeLongitude(req.query.lon)) {
            return res.status(400).json({ error: 'Le paramètre `lon` n\'est pas valide.' })
        }
    }

    const timer = setTimeout(() => {
        if (!res.headersSent) {
            return res.status(400).json({ error: 'Aucun résultat trouvé. Les coordonnées ne correspondent peut-être pas au territoire français.' })
        }
    }, 15000)

    if (res.headersSent) {
        return () => clearTimeout(timer)
    }

    LocationGeoJSONModel.aggregate([
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
            },
        }
    ],
        (err, docs) => {
            if (!err) {
                let results = []
                switch (queries.return) {
                    case 'geojson':
                        res.send(docs)
                        break;
                    case 'informations':
                        docs.forEach((doc, i) => {
                            LocationModel.findOne({
                                "fields.com_nom": {
                                    $regex: doc.properties.nom,
                                    $options: "i"
                                },
                                "fields.com_code": doc.properties.code,
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
                                .sort('fields.com_nom')
                                .select()
                        })
                        break;
                    default:
                        docs.forEach((doc, i) => {
                            LocationModel.findOne({
                                "fields.com_nom": {
                                    $regex: doc.properties.nom,
                                    $options: "m"
                                },
                                "fields.com_code": doc.properties.code,
                            },
                                (err, result) => {
                                    if (!err) {
                                        results = [...results, Object.assign(docs[i], { location: result })]
                                        if (i === docs.length - 1) {
                                            res.send(results)
                                        }
                                    }
                                    else console.error(err)
                                })
                                .sort('fields.com_nom')
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