
var getElevi = (id) => {

    return jQuery.ajax({
                url : 'http://localhost:3000/elevi/api/search/'+id,
                type: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }

            })
}

var getEleviiTemei = (id) => {
    return jQuery.ajax({
                url : 'http://localhost:3000/elevi/api/search/pentrutema/'+id,
                type: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
    })
}

var getTemeleElevului = (id) => {
    return jQuery.ajax({
                url : 'http://localhost:3000/teme/api/search/pentruelev/'+id,
                type: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
    })
}



var getTeme = (id) => {

    return jQuery.ajax({
                url : 'http://localhost:3000/teme/api/search/'+id,
                type: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
        
             })
}  

var insertTema = (idElev, idTema) => {

    return jQuery.ajax({
            url : 'http://localhost:3000/elevTema/api/insert/'+idElev+'/'+idTema,
            type: 'get',
            dataType : 'JSON',
            success : (data) => {
                return data;
            }
    })
}

var deleteTema = (idElev, idTema) => {

    return jQuery.ajax({
            url : 'http://localhost:3000/elevTema/api/delete/'+idElev+'/'+idTema,
            type: 'get',
            dataType : 'JSON',
            success : (data) => {
                return data;
            }
    })
}