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
 */

export const findRegions = (req, res) => {
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
        .sort('nom_region')
        .limit(15)
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
 * Find regions from query
 */

export const findNewRegions = (req, res) => {
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
        .sort('nom_region')
        .limit(15)
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
 * Get regions geolocation by region name
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