import mongoose from 'mongoose'

const RegionModel = new mongoose.Schema(
    {
        code_region: {
            type: Number
        },
        nom_region: {
            type: String
        },
        geometry: {
            type: Object,
            type: {
                type: String
            },
            coordinates: {
                type: Array
            }
        },
    },
    {
        collection: 'france_regions',
        timestamps: true
    }
);

export default mongoose.model("france_regions", RegionModel)