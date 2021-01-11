var dbCon = require('../lib/db');

exports.selectAll = function(type) {
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM ' + type;
        dbCon.query(sql, (err,result, fields)=>{
        if(err){
            console.log(err)
            
            return reject(err)
        }else{
            

            return resolve(result);

        }
    })
});
}

exports.deleteById = function(id, type, idType){
    return new Promise((resolve,reject)=>{
        let sql = 'DELETE FROM elev_tema WHERE ' + idType + ' = ' + id
         dbCon.query(sql, function(err){
        
        if(err) {
            throw err;

        }else {

            let sql = 'DELETE FROM ' + type + ' WHERE id =' + id;

            dbCon.query(sql, (err) =>{
                if(err) {
                    throw err;
                }
                return resolve({status:'ok'})
                        
            });
        }
    });
});
}