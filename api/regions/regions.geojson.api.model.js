import mongoose from 'mongoose'

const RegionGeoJSONModel = new mongoose.Schema(
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
        collection: 'france_regions_geojson',
        timestamps: true
    }
);

export default mongoose.model("france_regions_geojson", RegionGeoJSONModel)