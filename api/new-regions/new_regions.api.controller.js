import NewRegionModel from "./new_regions.api.model.js"
import NewRegionGeoJSONModel from "./new_regions.geojson.api.model.js"

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
 * @param {string} region - Name of the new region
 */

export const getNewRegion = (req, res) => {
    NewRegionModel.findOne({
        "nom_region": {
            $regex: encodeURI(req.params.region),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('nom_region')
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

    NewRegionModel.find({
        "nom_region": {
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
 * Find new regions by coordinates
 * @param {number} latitude - Latitude coord
 * @param {number} longitude - Longitude coord
 * @param {number} max_distance - Max distance around location point in meters (?max_distance=), default to 0.
 * @param {number} min_distance - Min distance arounded location point in meters (?min_distance=), default to 0.
 * @param {number} limit - Limit the number of element returned (?limit=), default to 1.
 * @param {string} sort - Sort the response by this field (?sort=)
 * @param {string} return - Choose the element that should be returned. Default to `both` (?return=).
 * - `geojson` will return region geojson only
 * - `department` will return the region informations only
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
                let array = []
                let results = []
                switch (queries.return) {
                    case 'geojson':
                        res.send(docs[0])
                        break;
                    case 'region':
                        array = docs.map(value => { return new RegExp(value.properties.nom) });
                        array.forEach((word, i) => {
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
                        array = docs.map(value => { return new RegExp(value.properties.nom) });
                        array.forEach((word, i) => {
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

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

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
 * @param {string} region - Name of the region
 */

export const getNewRegionGeolocation = (req, res) => {
    NewRegionGeoJSONModel.findOne({
        'properties.nom': {
            $regex: req.params.region,
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

    NewRegionGeoJSONModel.find({
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