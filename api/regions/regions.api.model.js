import mongoose from 'mongoose'

const RegionApiModel = new mongoose.Schema(
    {
        code_region: {
            type: Number
        },
        nom_region: {
            type: String
        }
    }
);

export default mongoose.model("france_regions", RegionApiModel)