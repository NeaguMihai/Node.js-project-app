var dbCon = require('../lib/db');
var sqlStmt = require('./genericFunctionsDAO');

exports.selectAll = () => sqlStmt.selectAll('tema');

exports.deleteById = (id) => sqlStmt.deleteById(id, 'tema', 'id_tema');


exports.selectAllWithoutElev = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT DISTINCT tema.id, tema.nume_tema, tema.nume_culegere, tema.numar_tema FROM tema LEFT JOIN elev_tema "
        +"ON tema.id = elev_tema.id_tema "
        +"WHERE elev_tema.id_tema NOT IN "
        +"(SELECT elev_tema.id_tema FROM elev_tema WHERE id_elev = " + id + ") "
        +"OR elev_tema.id_tema IS NULL;"
            , (err, rows) => {
                        if(err)
                        reject(err)
                        resolve(rows)
                    })
    })
}

exports.returnTemePentruElev = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT DISTINCT tema.id, tema.nume_tema, tema.nume_culegere, tema.numar_tema "
                    +"FROM tema LEFT JOIN elev_tema "
                    +"ON tema.id = elev_tema.id_tema "
                    +"where elev_tema.id_elev = "+id+";", (err, rows) => {
                        if(err)
                        reject(err)
                        resolve(rows)
                    })
    })
}