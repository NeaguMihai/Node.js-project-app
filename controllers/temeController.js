var temaDAO = require('../model/temaDAO');

exports.returnSearch = (req, res, next) => {
    
    temaDAO.selectAll()
    .then((result) =>{

        res.render("teme/searchTeme",{teme:result});
    }).catch((err)=>{

        res.render("teme/searchTeme",{teme:''});
    });
    
};

exports.returnTemaWithoutElev = (req, res, next) => {
    
    let id = req.params.id;

    temaDAO.selectAllWithoutElev(id)
    .then((result) =>{

        res.json({teme:result});
    }).catch((err)=>{

        res.json({teme:''});
    });
    
};

exports.returnTemePentruElev = (req, res, next) => {
    let id = req.params.id;

    temaDAO.returnTemePentruElev(id)
    .then((result) =>{

        res.json({teme:result});
    }).catch((err)=>{

        res.json({teme:''});
    });
}

exports.deleteRequest = (req, res, next) => {
    let id = req.params.id;
    temaDAO.deleteById(id)
    .then((result) => {
        res.redirect('/teme/search')
    })
    .catch((err)=>{
        res.redirect('/teme/search')
    })
    
}

exports.insertRequest = (req, res, next) => {
    res.render("teme/saveOrUpdateForm",{tema:{numeTema:'',numarTema:0,numeCulegere:'',cerintaTema:'',dificultate:'',puncte:''},update:''});
}


exports.insertProcess = (req, res, next) => {

    let numeTema = req.body.numeTema;
    let numarTema = req.body.numarTema;
    let numeCulegere = req.body.numeCulegere;
    let cerintaTema = req.body.cerintaTema;
    let dificultate = req.body.dificultate;
    let puncte = req.body.puncte;
   

    if(numeTema.length <=2 || (!parseInt(numarTema) || numarTema < 0) || numeCulegere.length <= 2 || cerintaTema.length <= 2 || (dificultate in ['GREU', 'MEDIU', 'USOR']) || ( !parseInt(puncte) || puncte < 0)) {

        req.flash('error', "Introduceti informatii valide");
        res.render("teme/saveOrUpdateForm", {tema:{numeTema:numeTema,numarTema:numarTema,numeCulegere:numeCulegere,cerintaTema:cerintaTema,dificultate:dificultate,puncte:puncte},update:'false'});
        
    }else{
        console.log('else');

        temaDAO.checkExistance({numarTema:numarTema,numeCulegere:numeCulegere})
        .then(() => {
            
                temaDAO.insertTema({nume_tema:numeTema,numar_tema:numarTema,nume_culegere:numeCulegere,cerinta_tema:cerintaTema,dificultate:dificultate,puncte:puncte})
            .then(() => {
                res.redirect('/teme/search')
            })
            .catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
            req.flash('error', "Introduceti informatii valide");
            res.render("teme/saveOrUpdateForm", {elev:{numeTema:numeTema,numarTema:numarTema,numeCulegere:numeCulegere,cerintaTema:cerintaTema,dificultate:dificultate,puncte:puncte}, update:'false'});
        })
        

    }
}


exports.updateRequest = (req, res, next) => {

    let id = req.params.id;

    temaDAO.selectById(id)
    .then((result) => {

        res.render("teme/saveOrUpdateForm",{tema:{
                                                    id:id,
                                                    numeTema:result.nume_tema,
                                                    numarTema:result.numar_tema,
                                                    numeCulegere:result.nume_culegere,
                                                    cerintaTema:result.cerinta_tema,
                                                    dificultate:result.dificultate,
                                                    puncte:result.puncte}, 
                                                    update:'true'});
    })
    .catch((err) => {
        console.log(error);
        res.redirect("teme/search");
    })

    
}


exports.updateProcess = (req, res, next) => {
    let id = req.params.id;
    let numeTema = req.body.numeTema;
    let numarTema = req.body.numarTema;
    let numeCulegere = req.body.numeCulegere;
    let cerintaTema = req.body.cerintaTema;
    let dificultate = req.body.dificultate;
    let puncte = req.body.puncte;
   

    if(numeTema.length <=2 || (!parseInt(numarTema) || numarTema < 0) || numeCulegere.length <= 2 || cerintaTema.length <= 2 || (dificultate in ['GREU', 'MEDIU', 'USOR']) || ( !parseInt(puncte) || puncte < 0)) {

        req.flash('error', "Introduceti informatii valide");
        res.render("teme/saveOrUpdateForm", {tema:{id:id,numeTema:numeTema,numarTema:numarTema,numeCulegere:numeCulegere,cerintaTema:cerintaTema,dificultate:dificultate,puncte:puncte},update:'false'});
        
    }else{
        

        temaDAO.checkExistanceId({id:id, numar_tema:numarTema,nume_culegere:numeCulegere})
        .then(() => {
            
            temaDAO.updateTema({nume_tema:numeTema,numar_tema:numarTema,nume_culegere:numeCulegere,cerinta_tema:cerintaTema,dificultate:dificultate, puncte:puncte}, id)
            .then(() => {
                res.redirect('/teme/search')
            })
            .catch((err) => {
                console.log(err);
                req.flash('error', "eroare la update");
                res.render("teme/saveOrUpdateForm", {tema:{id:id,numeTema:numeTema,numarTema:numarTema,numeCulegere:numeCulegere,cerintaTema:cerintaTema,dificultate:dificultate,puncte:puncte}, update:'true'});            
            })
        }).catch((err) => {
            console.log(err);
            req.flash('error', "Introduceti informatii valide");
            res.render("teme/saveOrUpdateForm", {tema:{id:id,numeTema:numeTema,numarTema:numarTema,numeCulegere:numeCulegere,cerintaTema:cerintaTema,dificultate:dificultate,puncte:puncte}, update:'true'});
        })
        

    }
}