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
 */

export const findLocation = (req, res) => {
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
        .sort('fields.com_nom')
        .limit(15)
}

/**
 * Find location from query
 */

export const findLocationByCoordinates = (req, res) => {
    const latitude = Number(req.params.latitude)
    const longitude = Number(req.params.longitude)

    // const unitValue = req.params?.unit === "km" ? 1000 : 1609.3;
    // const distance = req.params?.distance ? req.params?.distance : 100;

    LocationModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: 50000
            }
        }
    ],
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
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