import RegionModel from "./regions.api.model.js"
import RegionGeoJSONModel from "./regions.geojson.api.model.js"
import { containsOnlyNumbers, containsSpecialChars, convertStringToRegexp, isDecimalDegreeLatitude, isDecimalDegreeLongitude, sanitize } from "../../utils/validation.utils.js"

/**
 * Get all regions
 */

export const getAllRegions = (req, res) => {
    RegionModel.find({}, (err, docs) => {
        if (!err)
            res.send(docs)
        else console.log('Error to get data => ' + err)
    })
        .sort('nom_region')
}

/**
 * Get region by name
 * @param {string} query - Name of the region
 */

export const getRegion = (req, res) => {
    const query = sanitize(req.params.query)

    RegionModel.find({
        $text: {
            $search: query,
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
 * Find regions from query
 * @param {string} query - Query to find regions
 * @param {number} limit - Limit the number of element returned (?limit=)
 * @param {string} sort - Sort the response by this field (?sort=)
 */

export const findRegions = (req, res) => {
    const queries = {
        limit: req.query.limit ? sanitize(Number(req.query.limit)) : 15,
        sort: req.query.sort ? sanitize((req.query.sort).toString()) : 'nom_region'
    }

    const sanitized = sanitize(req.params.query)
    const query = convertStringToRegexp(sanitized)

    RegionModel.find({
        "nom_region": {
            $regex: query
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
 * Get all regions geolocations
 */

export const getAllRegionsGeolocations = (req, res) => {
    RegionGeoJSONModel.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data => ' + err)
        }
    })
}

/**
 * Get region geolocation by region name
 * @param {string} query - Name of the region
 */

export const getRegionGeolocation = (req, res) => {
    const query = sanitize(req.params.query)

    RegionGeoJSONModel.find({
        $text: {
            $search: query,
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

export const findRegionsGeolocations = (req, res) => {
    const queries = {
        limit: req.query.limit ? sanitize(Number(req.query.limit)) : 10,
        sort: req.query.sort ? sanitize((req.query.sort).toString()) : 'properties.nom'
    }

    const sanitized = sanitize(req.params.query)
    const query = convertStringToRegexp(sanitized)

    RegionGeoJSONModel.find({
        "properties.nom": {
            $regex: query
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
 * Find regions by coordinates
 * @param {number} latitude - Latitude coord
 * @param {number} longitude - Longitude coord
 * @param {number} max_distance - Max distance around location point in meters `&max_distance=`, default to 0.
 * @param {number} min_distance - Min distance arounded location point in meters `&min_distance=`, default to 0.
 * @param {number} limit - Limit the number of element returned `&limit=`, default to 1.
 * @param {string} sort - Sort the response by this field `&sort=`
 * @param {string} return - Choose the element that should be returned `&return=`. Default to `both`.
 * - `geojson` will return region geojson only
 * - `informations` will return the region informations only
 * - `both` will return an object containing geojson and region informations
 */

export const findRegionByCoordinates = (req, res) => {
    const queries = {
        lat: Number(req.query.lat),
        lon: Number(req.query.lon),
        max_distance: req.query.max_distance ? Number(req.query.max_distance) : 0,
        min_distance: req.query.min_distance ? Number(req.query.min_distance) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom',
        return: req.query.return ? (req.query.return).toString() : "both"
    }

    for (const [key,value] of Object.entries(req.query)) {
        if (typeof value !== 'string' && typeof value !== 'number') {
            if (Array.isArray(value)) {
                return res.status(400).json({ error: `Le paramètre '${key}' ne peut pas être spécifié deux fois.` })
            } else {
                return res.status(400).json({ error: `Le paramètre '${key}' n\'est pas valide.` })
            }
        } else {
            if (containsSpecialChars(value)) {
                return res.status(400).json({ error: `Le paramètre '${key}' n\'est pas valide.` })
            }
        }
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

    if (req.query.limit) {
        if (!containsOnlyNumbers(req.query.limit)) {
            return res.status(400).json({ error: 'Le paramètre `limit` n\'est pas valide.' })
        }
    }

    if (req.query.max_distance) {
        if (!containsOnlyNumbers(req.query.max_distance)) {
            return res.status(400).json({ error: 'Le paramètre `max_distance` n\'est pas valide.' })
        }
    }

    if (req.query.return) {
        if (req.query.return !== 'both' && req.query.return !== 'informations' && req.query.return !== 'geojson') {
            return res.status(400).json({ error: `La valeur du paramètre 'return' n\'est pas valide.` })
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

    RegionGeoJSONModel.aggregate([
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
                let localities = []
                let results = []
                switch (queries.return) {
                    case 'geojson':
                        res.send(docs[0])
                        break;
                    case 'informations':
                        localities = docs.map(value => { return new RegExp(value.properties.nom) });
                        localities.forEach((word, i) => {
                            RegionModel.findOne({
                                "nom_region": {
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
                                .sort('nom_region')
                                .select()
                        })
                        break;
                    default:
                        localities = docs.map(value => { return new RegExp(value.properties.nom) });
                        localities.forEach((word, i) => {
                            RegionModel.findOne({
                                "nom_region": {
                                    $regex: word,
                                    $options: "i"
                                }
                            },
                                (err, result) => {
                                    if (!err) {
                                        results = [...results, Object.assign(docs[i], { region: result })]
                                        if (i === docs.length - 1) {
                                            res.send(results)
                                        }
                                    }
                                    else console.error(err)
                                })
                                .sort('nom_region')
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