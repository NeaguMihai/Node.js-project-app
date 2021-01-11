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