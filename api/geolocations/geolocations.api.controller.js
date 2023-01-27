import GeolocationApiModel from './geolocations.api.model.js'

/**
 * Get all locations
 */

export const getAllGeolocations = (req, res) => {
    GeolocationApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data => ' + err)
        }
    })
}

/**
 * Get location by name
 */

export const findGeolocation = (req, res) => {
    GeolocationApiModel.find({
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

export const findLocationByCoordinates = (req, res) => {
    GeolocationApiModel.find(
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [{
                            '0': req.params.longitude,
                            '1': req.params.latitude
                        }]
                    ]
                ]
            }
        })
}