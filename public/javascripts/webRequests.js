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

    $('.buttonElevTema').off('click').on('click', (e) => {
        var element = $(e.target).parent().parent().parent();
        var idElev = $(e.target).parent().find('#idElev').attr('value');
        var idTema = $(e.target).parent().find('#idTema').attr('value');

        $('div').remove('.removable')
        var cont = $('<div></div>');
        cont.attr('class','removable');
        var input = $('<input>');
        input.attr('type', 'text');
        input.attr('name', 'link');
        input.attr('id','inputLink');
        input.addClass('space-1');

        cont.append(contain(input));

        var button = $('<button></button>');
        button.addClass('btn btn-outline-secondary space-1');
        button.text('Salveaza linkul')
        button.attr('value', idElev+'/'+idTema);
        button.off('click').on('click', (e) => {
            let tok = $(e.target).attr('value').split('/')
            let link = $(e.target).parent().parent().parent().find('#inputLink').val();

            updateLink(tok[0],tok[1],link)
            .then((result) => {
                console.log(result);
                alert('Success!');
                location.reload()
            })
            .catch(() => {
                alert('Eroare la procesare');
            })

        })
        
        cont.append(contain(button));
        element.append(cont);

        
    })

    function contain(elem) {
        
        var colContainer = $('<div></div>');
        colContainer.addClass('col');

        var rowContainer = $('<div></div>');
        rowContainer.addClass('row');

        colContainer.append(elem);
        rowContainer.append(colContainer);

        return rowContainer;
    }
})