import mongoose from 'mongoose'

const NewRegionApiModel = new mongoose.Schema(
    {
        code_region: {
            type: Number
        },
        nom_region: {
            type: String
        }
    }
);

export default mongoose.model("france_new_regions", NewRegionApiModel)