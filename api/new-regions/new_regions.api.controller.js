import NewRegionModel from "./new_regions.api.model.js"
import NewRegionGeoJSONModel from "./new_regions.geojson.api.model.js"
import { convertStringToRegexp, isDecimalDegreeLatitude, isDecimalDegreeLongitude } from "../../utils/validation.utils.js"

/**
 * Get all new regions
 */

export const getAllNewRegions = (req, res) => {
    NewRegionModel.find({}, (err, docs) => {
        if (!err)
            res.send(docs)
        else console.log('Error to get data => ' + err)
    })
        .sort('nom_region')
}

/**
 * Get new region by name
 * @param {string} query - Name of the new region
 */

export const getNewRegion = (req, res) => {
    NewRegionModel.findOne({
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
 * Find new regions from query
 * @param {string} query - Query to find new regions
 * @param {number} limit - Limit the number of element returned (?limit=)
 * @param {string} sort - Sort the response by this field (?sort=)
 */

export const findNewRegions = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'nom_region'
    }

    const query = convertStringToRegexp(req.params.query)

    NewRegionModel.find({
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

export const getAllNewRegionsGeolocations = (req, res) => {
    NewRegionGeoJSONModel.find({}, (err, docs) => {
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

export const getNewRegionGeolocation = (req, res) => {
    NewRegionGeoJSONModel.findOne({
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
 * Find regions from query
 * @param {*} query - Query to find regions
 * @param {*} limit - Limit the number of element returned (?limit=)
 * @param {*} sort - Sort the response by this field (?sort=)
 */

export const findNewRegionsGeolocations = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 10,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom'
    }

    const query = convertStringToRegexp(req.params.query)

    NewRegionGeoJSONModel.find({
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
 * Find new regions by coordinates
 * @param {number} latitude - Latitude coord
 * @param {number} longitude - Longitude coord
 * @param {number} max_distance - Max distance around location point in meters `&max_distance=`, default to 0.
 * @param {number} min_distance - Min distance arounded location point in meters `&min_distance=`, default to 0.
 * @param {number} limit - Limit the number of element returned `&limit=`, default to 1.
 * @param {string} sort - Sort the response by this field `&sort=`.
 * @param {string} return - Choose the element that should be returned `&return=`. Default to `both`.
 * - `geojson` will return region geojson only
 * - `informations` will return the region informations only
 * - `both` will return an object containing geojson and region informations
 */

export const findNewRegionByCoordinates = (req, res) => {

    const queries = {
        lat: Number(req.query.lat),
        lon: Number(req.query.lon),
        max_distance: req.query.max_distance ? Number(req.query.max_distance) : 0,
        min_distance: req.query.min_distance ? Number(req.query.min_distance) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 15,
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

    NewRegionGeoJSONModel.aggregate([
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
                            NewRegionModel.findOne({
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
                            NewRegionModel.findOne({
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