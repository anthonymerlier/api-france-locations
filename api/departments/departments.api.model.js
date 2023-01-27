import mongoose from 'mongoose'

const DepartmentApiModel = new mongoose.Schema(
    {
        code_departement: {
            type: Number
        },
        nom_departement: {
            type: String
        },
        code_nouvelle_region: {
            type: Number
        },
        nom_nouvelle_region: {
            type: String
        },
        code_ancienne_region: {
            type: Number
        },
        nom_ancienne_region: {
            type: String
        }
    }
);

export default mongoose.model("france_departments", DepartmentApiModel)