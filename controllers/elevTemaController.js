var elevTemaDAO = require('../model/elevTemaDAO');

exports.insertRequest = (req, res, next) => {
    let idElev = req.params.id;
    let idTema = req.params.idTema;

    elevTemaDAO.insertInstance({id_elev: idElev, id_tema:idTema, link_tema:''})
    .then((reuslt) => {
        res.json({status:'success'})
    })
    .catch((err) => {
        console.log(err);
        res.json({status:'failed'})
    })
}


exports.deleteRequest = (req, res, next) => {
    let idElev = req.params.id;
    let idTema = req.params.idTema;

    elevTemaDAO.deleteInstance(idElev, idTema)
    .then((reuslt) => {
        res.json({status:'success'})
    })
    .catch((err) => {
        console.log(err);
        res.json({status:'failed'})
    })
}