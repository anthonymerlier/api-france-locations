import NewRegionApiModel from "./new_regions.api.model.js"

/**
 * Get all new regions
 */

export const getAllNewRegions = (req, res) => {
    console.log('first')
    NewRegionApiModel.find((err, docs) => {
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
    NewRegionApiModel.findOne({
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
    NewRegionApiModel.find({
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