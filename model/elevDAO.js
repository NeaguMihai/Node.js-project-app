var dbCon = require('../lib/db');
var sqlStmt = require('./genericFunctionsDAO');


exports.selectAll = () => sqlStmt.selectAll('elev');

exports.selectAllWithoutTema = (id) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT DISTINCT elev.id, elev.nume, elev.prenume, elev.clasa, elev.scoala "
                    +"FROM elev LEFT JOIN elev_tema "
                    +"ON elev.id = elev_tema.id_elev "
                    +"where elev_tema.id_elev NOT IN "
                    +"(SELECT elev_tema.id_elev FROM elev_tema WHERE id_tema = "+id+") "
                    +"OR elev_tema.id_elev IS NULL;"
        , (err, rows) => {
                        if(err)
                        reject(err)
                        resolve(rows)
                    })
    })
}


exports.selectEleviPentruTema = (id) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT DISTINCT elev.id, elev.nume, elev.prenume, elev.clasa, elev.scoala "
                    +"FROM elev LEFT JOIN elev_tema "
                    +"ON elev.id = elev_tema.id_elev "
                    +"where elev_tema.id_tema = "+id+";"
        , (err, rows) => {
                        if(err)
                        reject(err)
                        resolve(rows)
                    })
    })
}

exports.deleteById = (id) => sqlStmt.deleteById(id, 'elev', 'id_elev');

exports.insertElev = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("INSERT INTO elev SET ?", data, (err) => {
            if(err)
                reject(err)
            resolve('success')
        })
    })
}

exports.updateElev = (data, id) => {
    return new Promise((resolve, reject) => {
        dbCon.query("UPDATE elev SET ? WHERE id = "+id, data, (err) => {
            if(err)
                reject(err)
            resolve('success')
        })
    })
}

exports.checkExistance = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT * FROM elev WHERE nume = '"+data.nume+"' AND prenume = '" +data.prenume + "' AND clasa = '" + data.clasa +"' AND scoala = '" + data.scoala +"'", (err, rows) => {
            if(err)
                reject(err)
            if(rows.length != 0)
                reject({status:'duplicat'});
            resolve({status:'ok'});
        })

    })
}

exports.checkExistanceId = (data) => {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT * FROM elev WHERE id != "+ data.id +" AND nume = '"+data.nume+"' AND prenume = '" +data.prenume + "' AND clasa = '" + data.clasa +"' AND scoala = '" + data.scoala +"'", (err, rows) => {
            if(err)
                reject(err)

            if(rows != 0)
                reject({status:'duplicat'});
            resolve({status:'ok'});
        })

    }) 
}

exports.selectById = (id) => sqlStmt.selectById(id,'elev');