import mongoose from 'mongoose'

const LocationModel = new mongoose.Schema(
    {
        datasetid: {
            type: String
        },
        recordid: {
            type: String
        },
        fields: {
            geolocalisation: {
                type: []
            },
            uu_id_10: {
                type: String
            },
            fr_id: {
                type: String
            },
            dep_num_nom: {
                type: String
            },
            com_nom_maj_court: {
                type: String
            },
            au_id: {
                type: String
            },
            auc_id: {
                type: String
            },
            dep_nom: {
                type: String
            },
            uucr_id: {
                type: String
            },
            aca_id: {
                type: String
            },
            reg_nom: {
                type: String
            },
            dep_code: {
                type: String
            },
            com_code2: {
                type: String
            },
            fe_id: {
                type: String
            },
            dep_nom_num: {
                type: String
            },
            com_code: {
                type: String
            },
            reg_code_old: {
                type: String
            },
            uu_id_99: {
                type: String
            },
            dep_id: {
                type: String
            },
            fd_id: {
                type: String
            },
            com_nom: {
                type: String
            },
            regrgp_nom: {
                type: String
            },
            com_nom_maj: {
                type: String
            },
            reg_nom_old: {
                type: String
            },
            reg_id_old: {
                type: String
            },
            reg_id: {
                type: String
            },
            aca_nom: {
                type: String
            },
            com_code1: {
                type: String
            },
            uucr_nom: {
                type: String
            },
            ze_id: {
                type: String
            },
            uu_id: {
                type: String
            },
            auc_nom: {
                type: String
            },
            aca_code: {
                type: String
            },
            com_id: {
                type: String
            },
            reg_code: {
                type: String
            }
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
        record_timestamp: {
            type: {
                type: String
            }
        }
    },
    {
        collection: 'france_cities',
        timestamps: true
    }
);

export default mongoose.model("france_cities", LocationModel)