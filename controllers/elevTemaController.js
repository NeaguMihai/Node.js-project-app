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

exports.showAppRequest = (req, res, next) => {
    
    elevTemaDAO.getAll()
    .then((result) => {
        console.log(result);
        res.render('legaturi',{data:result})
    })
    .catch((err) => {
        console.log(err);
        req.flash('error', 'Eroare la conectare')
        res.render('legaturi',{data:[]});
    })
}

exports.updateProcess = (req, res, next) => {

    let idElev = req.body.idElev;
    let idTema = req.body.idTema;
    let link = req.body.link;

    elevTemaDAO.update(idElev, idTema, link)
    .then((reuslt) => {
        res.json({result:result});
    })
    .catch((err) => {
        res.json({result:err});
    })
}