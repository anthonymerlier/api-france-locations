import mongoose from 'mongoose'

const DepartmentGeoJSONModel = new mongoose.Schema(
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
        collection: 'france_departments_geojson',
        timestamps: true
    }
);

export default mongoose.model("france_departments_geojson", DepartmentGeoJSONModel)