import RegionModel from "./regions.api.model.js"
import NewRegionModel from "./new_regions.api.model.js"
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
 * @param {*} region Name of the region
 */

export const getRegion = (req, res) => {
    RegionModel.findOne({
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
 * Find regions from query
 * @param {*} query Query to find regions
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findRegions = (req, res) => {
    const queries = {
        limit: req.query.limit ?  Number(req.query.limit) : 15,
        sort: req.query.sort ?  (req.query.sort).toString() : 'nom_region'
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

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

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
 * @param {*} region Name of the new region
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
 * @param {*} query Query to find new regions
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findNewRegions = (req, res) => {
    const queries = {
        limit: req.query.limit ?  Number(req.query.limit) : 15,
        sort: req.query.sort ?  (req.query.sort).toString() : 'nom_region'
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
 * @param {*} region of the region
 */

export const getRegionGeolocation = (req, res) => {
    RegionGeoJSONModel.findOne({
        'properties.nom': {
            $regex: encodeURI(req.params.region),
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
 * Find regions from coordinates
 * @param {*} latitude Latitude coord
 * @param {*} longitude Longitude coord
 * @param {*} max_distance Max distance around location point (?max_distance=)
 * @param {*} min_distance Min distance arounded location point (?min_distance=)
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findRegionByCoordinates = (req, res) => {
    const latitude = Number(req.params.latitude)
    const longitude = Number(req.params.longitude)

    const queries = {
        max_distance: req.query.max_distance ?  Number(req.query.max_distance) : 10000,
        min_distance: req.query.min_distance ?  Number(req.query.min_distance) : 0,
        limit: req.query.limit ?  Number(req.query.limit) : 100,
        sort: req.query.sort ?  (req.query.sort).toString() : 'properties.nom'
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