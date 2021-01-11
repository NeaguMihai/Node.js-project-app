var elevDAO = require('../model/elevDAO');

exports.returnSearch = (req, res, next) => {
    
    elevDAO.selectAll()
    .then((result) =>{
        console.log(result[1]);
        res.render("elevi/searchElevi",{elevi:result});
    }).catch((err)=>{

        res.render("elevi/searchElevi",{elevi:''});
    });
    
};

exports.returnEleviWithout = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    elevDAO.selectAllWithoutTema(id)
    .then((result) => {
        res.json({elevi:result});
    })
    .catch((err) => {
        console.log(err);
        res.json({elevi:[]});
    })
}

exports.returnEleviPentruTema = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    elevDAO.selectEleviPentruTema(id)
    .then((result) => {
        res.json({elevi:result});
    })
    .catch((err) => {
        console.log(err);
        res.json({elevi:[]});
    })
}

exports.deleteRequest = (req, res, next) => {
    let id = req.params.id;
    elevDAO.deleteById(id)
    .then((result) => {
        res.redirect('/elevi/search')
    })
    .catch((err)=>{
        res.redirect('/elevi/search')
    })
    
}

exports.insertRequest = (req, res, next) => {
        
    res.render("elevi/saveOrUpdateForm",{elev:{nume:'',prenume:'',data_nastere:'',clasa:'',scoala:''},update:''});
}

exports.updateRequest = (req, res, next) => {

    let id = req.params.id;
    console.log(id);
    elevDAO.selectById(id)
    .then((result) => {
        res.render("elevi/saveOrUpdateForm",{elev:{
                                                    id:id,
                                                    nume:result.nume,
                                                    prenume:result.prenume,
                                                    data_nastere:(result.data_nastere.getDate()
                                                        +'-'
                                                        +(result.data_nastere.getMonth()+1)
                                                        +'-'
                                                        +result.data_nastere.getFullYear()),
                                                    clasa:result.clasa,
                                                    scoala:result.scoala,
                                                    puncte:result.puncte}, 
                                                    update:'true'});
    })
    .catch((err) => {
        console.log(error);
        res.redirect("elevi/search");
    })

    
}

exports.insertProcess = (req, res, next) => {

    let nume = req.body.nume;
    let prenume = req.body.prenume;
    let dataNastere = req.body.dataNastere;
    let clasa = req.body.clasa;
    let scoala = req.body.scoala;
   
    console.log(!!dataNastere.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/));
    if(nume.length <=2 || prenume.length<=2 || scoala.length <= 2 || !dataNastere.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/) || !clasa.match(/(^[1-9][A-Z]{1}$|(^[1][0-9][A-Z]{1}$))/)) {


        console.log('here');
        req.flash('error', "Introduceti informatii valide");
        res.render("elevi/saveOrUpdateForm", {elev:{nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala},update:'false'});
        
    }else{
        console.log('else');

        elevDAO.checkExistance({nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala})
        .then(() => {
            
            dataNastere = dataNastere.split('-').reverse().join('-');
            console.log(dataNastere);
                elevDAO.insertElev({nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala, puncte:0})
            .then(() => {
                res.redirect('/elevi/search')
            })
            .catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
            req.flash('error', "Introduceti informatii valide");
            res.render("elevi/saveOrUpdateForm", {elev:{nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala}, update:'false'});
        })
        

    }
}

exports.updateProcess = (req, res, next) => {

    let id = req.body.id
    let nume = req.body.nume;
    let prenume = req.body.prenume;
    let dataNastere = req.body.dataNastere;
    let clasa = req.body.clasa;
    let scoala = req.body.scoala;
    let puncte = req.body.puncte;
    
    console.log(puncte);

    if(nume.length <=2 || prenume.length<=2 || scoala.length <= 2 || ! dataNastere.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/) || !clasa.match(/(^[1-9][A-Z]{1}$|(^[1][0-9][A-Z]{1}$))/)) {

        console.log('here');
        req.flash('error', "Introduceti informatii valide");
        res.render("elevi/saveOrUpdateForm", {elev:{id:id,nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala, puncte:puncte}, update:'true'});
        
    }else{
        

        elevDAO.checkExistanceId({id:id, nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala})
        .then(() => {
            dataNastere = dataNastere.split('-').reverse().join('-');
            elevDAO.updateElev({nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala, puncte:puncte}, id)
            .then(() => {
                res.redirect('/elevi/search')
            })
            .catch((err) => {
                console.log(err);
                req.flash('error', "eroare la update");
                res.render("elevi/saveOrUpdateForm", {elev:{id:id,nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala, puncte:puncte}, update:'true'});            
            })
        }).catch((err) => {
            console.log(err);
            req.flash('error', "Introduceti informatii valide");
            res.render("elevi/saveOrUpdateForm", {elev:{id:id,nume:nume,prenume:prenume,data_nastere:dataNastere,clasa:clasa,scoala:scoala, puncte:puncte}, update:'true'});
        })
        

    }
}