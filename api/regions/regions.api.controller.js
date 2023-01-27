import RegionApiModel from "./regions.api.model.js"

/**
 * Get all regions
 */

export const getAllRegions = (req, res) => {
    RegionApiModel.find((err, docs) => {
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
    RegionApiModel.findOne({
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
    RegionApiModel.find({
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