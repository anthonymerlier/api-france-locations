import DepartmentApiModel from "./departments.api.model.js"

/**
 * Get all departments
 */

export const getAllDepartments = (req, res) => {
    DepartmentApiModel.find((err, docs) => {
        if (!err)
            res.send(docs)
        else console.log('Error to get data => ' + err)
    })
        .sort('nom_departement')
}

/**
 * Get department by name
 */

export const getDepartment = (req, res) => {
    DepartmentApiModel.findOne({
        "nom_departement": {
            $regex: encodeURI(req.params.department),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('nom_departement')
        .select()
}

/**
 * Find departments from query
 */

export const findDepartments = (req, res) => {
    DepartmentApiModel.find({
        "nom_departement": {
            $regex: encodeURI(req.params.query),
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err)
                res.send(docs)
            else console.error(err)
        })
        .sort('nom_departement')
        .limit(15)
}