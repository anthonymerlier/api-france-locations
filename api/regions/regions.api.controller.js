import RegionModel from "./regions.api.model.js"
import RegionGeoJSONModel from "./regions.geojson.api.model.js"

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
 * @param {string} region - Name of the region
 */

export const getRegion = (req, res) => {
    RegionModel.findOne({
        "nom_region": {
            $regex: `\\b(^|\\s|[^\\W])${encodeURI(req.params.region)}(\\s|[^\\W]|$)\\b`,
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
 * Find regions from query
 * @param {string} query - Query to find regions
 * @param {number} limit - Limit the number of element returned (?limit=)
 * @param {string} sort - Sort the response by this field (?sort=)
 */

export const findRegions = (req, res) => {
    const queries = {
        limit: req.query.limit ? Number(req.query.limit) : 15,
        sort: req.query.sort ? (req.query.sort).toString() : 'nom_region'
    }

    RegionModel.find({
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
 * Find regions by coordinates
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

export const findRegionByCoordinates = (req, res) => {
    const latitude = Number(req.params.latitude)
    const longitude = Number(req.params.longitude)

    const queries = {
        max_distance: req.query.max_distance ? Number(req.query.max_distance) : 0,
        min_distance: req.query.min_distance ? Number(req.query.min_distance) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 1,
        sort: req.query.sort ? (req.query.sort).toString() : 'properties.nom',
        return: req.query.return ? req.query.return : "both"
    }

    RegionGeoJSONModel.aggregate([
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
                distanceMultiplier: 0.001
            }
        }
    ],
        (err, docs) => {
            if (!err) {
                switch (queries.return) {
                    case 'geojson':
                        res.send(docs[0])
                        break;
                    case 'region':
                        RegionModel.findOne({
                            "nom_region": {
                                $regex: docs[0].properties.nom,
                                $options: "i"
                            }
                        },
                            (err, result) => {
                                if (!err)
                                    res.send(result)
                                else console.error(err)
                            })
                            .sort('nom_region')
                            .select()
                        break;
                    default:
                        RegionModel.findOne({
                            "nom_region": {
                                $regex: docs[0].properties.nom,
                                $options: "i"
                            }
                        },
                            (err, result) => {
                                if (!err)
                                    res.send(Object.assign(docs[0], { region: result }))
                                else console.error(err)
                            })
                            .sort('nom_region')
                            .select()
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
 * @param {string} region - Name of the region
 */

export const getRegionGeolocation = (req, res) => {
    RegionGeoJSONModel.findOne({
        'properties.nom': {
            $regex: `\\b(^|\\s|[^\\W])${encodeURI(req.params.region)}(\\s|[^\\W]|$)\\b`,
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