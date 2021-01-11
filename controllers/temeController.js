var temaDAO = require('../model/temaDAO');

exports.returnSearch = (req, res, next) => {
    
    temaDAO.selectAll()
    .then((result) =>{
        console.log(result);
        res.render("teme/searchTeme",{teme:result});
    }).catch((err)=>{

        res.render("teme/searchTeme",{teme:''});
    });
    
};

exports.returnTemaWithoutElev = (req, res, next) => {
    
    let id = req.params.id;
    console.log(id);
    temaDAO.selectAllWithoutElev(id)
    .then((result) =>{

        res.json({teme:result});
    }).catch((err)=>{

        res.json({teme:''});
    });
    
};

exports.returnTemePentruElev = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    temaDAO.returnTemePentruElev(id)
    .then((result) =>{
        console.log(result);
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