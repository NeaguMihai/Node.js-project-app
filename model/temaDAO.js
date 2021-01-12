var dbCon = require('../lib/db');
var sqlStmt = require('./genericFunctionsDAO');

exports.selectAll = () => sqlStmt.selectAll('tema');

exports.deleteById = (id) => sqlStmt.deleteById(id, 'tema', 'id_tema');

exports.selectById = (id) => sqlStmt.selectById(id, 'tema');


exports.selectAllWithoutElev = (id) => {

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

exports.checkExistance = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT * FROM tema WHERE numar_tema = " +data.numarTema + " AND nume_culegere = '" + data.numeCulegere+"'" , (err, rows) => {
            if(err)
                reject(err)

            if(rows.length != 0)
                reject({status:'duplicat'});
            resolve({status:'ok'});
        })

    })
}

exports.insertTema = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("INSERT INTO tema SET ?", data, (err) => {
            if(err)
                reject(err)
            resolve('success')
        })
    })
}

exports.checkExistanceId = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT * FROM tema WHERE id != "+ data.id +" AND numar_tema = " + data.numar_tema + " AND nume_culegere = '" + data.nume_culegere +"'", (err, rows) => {
            if(err)
                reject(err)

            if(rows != 0)
                reject({status:'duplicat'});
            resolve({status:'ok'});
        })

    }) 
}

exports.updateTema = (data, id) => {
    return new Promise((resolve, reject) => {
        dbCon.query("UPDATE tema SET ? WHERE id = "+id, data, (err) => {
            if(err)
                reject(err)
            resolve('success')
        })
    })
}