var dbCon = require('../lib/db');


exports.insertInstance = (data) => {

    return new Promise((resolve, reject) => {        
        dbCon.query('INSERT INTO elev_tema SET ?', data, (err) =>{
            if(err) {
                reject(err)
            }else{
                resolve(err)
            }        
        });
    })
};

exports.deleteInstance = (idElev, idTema) => {

    return new Promise((resolve, reject) => {        
        dbCon.query('DELETE FROM elev_tema WHERE id_elev = ' + idElev + ' AND id_tema = ' + idTema, (err) =>{
            if(err) {
                reject(err)
            }else{
                resolve(err)
            }        
        });
    })
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        dbCon.query('SELECT elev.id idElev, tema.id idTema, elev.nume nume, elev.prenume prenume, elev.clasa clasa, elev.scoala scoala, elev.puncte puncteElev,'
        + 'tema.nume_tema numeTema, tema.numar_tema numarTema, tema.nume_culegere numeCulegere, tema.dificultate dificultate, tema.puncte puncteTema, elev_tema.link_tema linkTema'
        + ' FROM elev JOIN elev_tema ON elev.id = elev_tema.id_elev JOIN tema ON tema.id = elev_tema.id_tema', (err, rows) => {
            if(err)
            reject(err)
            resolve(rows)
        })
    })
}

exports.update = (idElev, idTema, link) => {

    return new Promise((resolve, reject) => {
        dbCon.query("UPDATE elev_tema SET link_tema = '"+link+"' WHERE id_elev = "+idElev+" AND id_tema = "+idTema, (err) => {
            if(err)
            console.log(err);
            reject({status:'eroare'})
            resolve({status:'ok'})
        })
    })
}