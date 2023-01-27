import LocationModel from "./location.api.model.js"
import LocationGeoJSONModel from './location.geojson.api.model.js'

/**
 * Get all locations
 */

export const getAllLocations = (req, res) => {
    LocationModel.find({}, (err, docs) => {
        if (!err)
            res.send(docs)
        else console.log('Error to get data => ' + err)
    })
}

/**
 * Get location by name
 * @param {*} location Name of the location
 */

export const getLocation = (req, res) => {
    LocationModel.findOne({
        "fields.com_nom": {
            $regex: encodeURI(req.params.location),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('fields.com_nom')
        .select()
}

/**
 * Find location from query
 * @param {*} query Query to find locations
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findLocation = (req, res) => {
    const queries = {
        limit: req.query.limit ?  Number(req.query.limit) : 15,
        sort: req.query.sort ?  (req.query.sort).toString() : 'fields.com_nom'
    }

    LocationModel.find({
        "fields.com_nom": {
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
 * Find location from coordinates
 * @param {*} latitude Latitude coord
 * @param {*} longitude Longitude coord
 * @param {*} max_distance Max distance around location point (?max_distance=)
 * @param {*} min_distance Min distance arounded location point (?min_distance=)
 * @param {*} limit Limit the number of element returned (?limit=)
 * @param {*} sort Sort the response by this field (?sort=)
 */

export const findLocationByCoordinates = (req, res) => {
    const latitude = Number(req.params.latitude)
    const longitude = Number(req.params.longitude)

    const queries = {
        max_distance: req.query.max_distance ?  Number(req.query.max_distance) : 10000,
        min_distance: req.query.min_distance ?  Number(req.query.min_distance) : 0,
        limit: req.query.limit ?  Number(req.query.limit) : 100,
        sort: req.query.sort ?  (req.query.sort).toString() : 'fields.com_nom'
    }

    LocationModel.aggregate([
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

/****************************************************************************/
/****************************************************************************/
/****************************************************************************/

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
 * @param {*} location Name of the location
 */

export const getGeolocation = (req, res) => {
    LocationGeoJSONModel.findOne({
        'properties.nom': {
            $regex: encodeURI(req.params.location),
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