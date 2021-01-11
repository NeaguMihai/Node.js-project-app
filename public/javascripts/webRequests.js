var jq = jQuery.noConflict();


jq(($) =>{

    $('.elevi-api-search').off('click').on("click", (e) => {
        let element = $(e.target).parent().find(("#dropdown-add"))

        getElevi(element.parent().parent().parent().find('#idTema').attr('value'))
            .then((result) => {
                console.log(result.teme);

                addElementsElevi(result, element);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    $('.teme-api-search').off('click').on("click", (e) => {
        let element = $(e.target).parent().find(("#dropdown-add"))

        getTeme(element.parent().parent().parent().find('#idElev').attr('value'))
            .then((result) => {
                addElementsTeme(result, element);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    //request pentru elevii temei si adaugarea elementelor
    $('.elevii-temei-api-search').off('click').on('click', (e) => {
        let element = $(e.target).parent().find(("#dropdown-add"))

        getEleviiTemei(element.parent().parent().parent().find('#idTema').attr('value'))
            .then((result) => {
                addElementsEleviPropri(result, element);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    //request pentru temele elevului si adaugarea elementelor
    $('.temele-elevului-api-search').off('click').on('click', (e) => {
        let element = $(e.target).parent().find(("#dropdown-add"))

        getTemeleElevului(element.parent().parent().parent().find('#idElev').attr('value'))
            .then((result) => {
                addElementsTemePropri(result, element);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    
    function addElementsElevi(data, element) {
        
        element.empty();
    
    
        let add = (elev) => {
            let cont = $("<li></li>")
            let child = $("<button></button>").addClass("dropdown-item");
            child.attr("value",elev.id+"/"+element.parent().parent().parent().find('#idTema').attr('value'))
            child.addClass("add-to");
            child.off('click').on('click', insertRequest)
            child.text(elev.nume + ' ' + elev.prenume + ' ' + elev.clasa + ' ' + elev.scoala);
            cont.append(child);
            return cont;
        };
    
        
        for(elev of data.elevi) {
            console.log(elev.id);
            element.append(add(elev));
            element.append($("<hr>"));
        }
    }
    

    function addElementsTeme(data, element) {
        element.empty();
    
        let add = (tema) => {
            let cont = $("<li></li>")
            let child = $("<button></button>").addClass("dropdown-item");
            child.addClass("add-to");
       
            child.attr("value",element.parent().parent().parent().find('#idElev').attr('value') + "/" + tema.id)
            child.off('click').on('click', insertRequest)
            child.text(tema.nume_tema + ' ' + tema.nume_culegere + ' ' + tema.numar_tema );
            cont.append(child);
            return cont;
        };
    
        
        for(tema of data.teme) {
            element.append(add(tema));
            element.append($("<hr>"));
        }
    }

    function addElementsTemePropri(data, element) {
        element.empty();
    
        let add = (tema) => {
            let cont = $("<li></li>")
            let child = $("<button></button>").addClass("dropdown-item");
            child.addClass("add-to");
            
            child.attr("value",element.parent().parent().parent().find('#idElev').attr('value') + "/" + tema.id)
            child.off('click').on('click', deleteRequest)
            child.text(tema.nume_tema + ' ' + tema.nume_culegere + ' ' + tema.numar_tema );
            cont.append(child);
            return cont;
        };
    
        
        for(tema of data.teme) {
            element.append(add(tema));
            element.append($("<hr>"));
        }
    }

    function addElementsEleviPropri(data, element) {
        element.empty();
    
        let add = (elev) => {
            let cont = $("<li></li>")
            let child = $("<button></button>").addClass("dropdown-item");
            child.addClass("add-to");

            child.attr("value",elev.id + "/" + element.parent().parent().parent().find('#idTema').attr('value') + "/" )
            child.off('click').on('click', deleteRequest)
            child.text(elev.nume + ' ' + elev.prenume + ' ' + elev.clasa + ' ' + elev.scoala );
            cont.append(child);
            return cont;
        };
    
        
        for(elev of data.elevi) {
            element.append(add(elev));
            element.append($("<hr>"));
        }
    }

    function insertRequest(e) {
        let ids = $(e.target).attr('value').split('/');

        insertTema(ids[0], ids[1])
        .then(() => {
            alert("Success!")
        })
        .catch((err) => {
            alert("S-a produs o eroare in procesarea operatiunii")
        })
    }

    function deleteRequest(e) {
        let ids = $(e.target).attr('value').split('/');

        deleteTema(ids[0], ids[1])
        .then(() => {
            alert("Success!")
        })
        .catch((err) => {
            alert("S-a produs o eroare in procesarea operatiunii")
        })
    }

})