import mongoose from 'mongoose'

const GeolocationApiModel = new mongoose.Schema(
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
    }
)

export default mongoose.model("france_cities_geojson", GeolocationApiModel)