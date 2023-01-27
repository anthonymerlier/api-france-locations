import mongoose from 'mongoose'

const NewRegionGeoJSONModel = new mongoose.Schema(
    {
        type: {
            type: String
        },
        geometry: {
            coordinates: {
                type: [],
            }
        },
        properties: {
            code: {
                type: String
            },
            nom: {
                type: String
            }
        }
    },
    {
        collection: 'france_new_regions_geojson',
        timestamps: true
    }
);

export default mongoose.model("france_new_regions_geojson", NewRegionGeoJSONModel)