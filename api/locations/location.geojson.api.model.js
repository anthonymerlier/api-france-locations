import mongoose from 'mongoose'

const LocationGeoJSONModel = new mongoose.Schema(
    {
        type: {
            type: String
        },
        geometry: {
            type: {
                type: String
            },
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
        collection: 'france_cities_geojson',
        timestamps: true
    }
)

export default mongoose.model("france_cities_geojson", LocationGeoJSONModel)