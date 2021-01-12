
var getElevi = (id) => {

    return jQuery.ajax({
                url : 'http://localhost:3000/elevi/api/search/'+id,
                method: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }

            })
}

var getEleviiTemei = (id) => {
    return jQuery.ajax({
                url : 'http://localhost:3000/elevi/api/search/pentrutema/'+id,
                method: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
    })
}

var getTemeleElevului = (id) => {
    return jQuery.ajax({
                url : 'http://localhost:3000/teme/api/search/pentruelev/'+id,
                method: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
    })
}



var getTeme = (id) => {

    return jQuery.ajax({
                url : 'http://localhost:3000/teme/api/search/'+id,
                method: 'get',
                dataType : 'JSON',
                success : (data) => {
                    return data;
                }
        
             })
}  

var insertTema = (idElev, idTema) => {

    return jQuery.ajax({
            url : 'http://localhost:3000/elevTema/api/insert/'+idElev+'/'+idTema,
            method: 'get',
            dataType : 'JSON',
            success : (data) => {
                return data;
            }
    })
}

var deleteTema = (idElev, idTema) => {

    return jQuery.ajax({
            url : 'http://localhost:3000/elevTema/api/delete/'+idElev+'/'+idTema,
            method: 'get',
            dataType : 'JSON',
            success : (data) => {
                return data;
            }
    })
}


var updateLink = (idElev, idTema, link) => {

    return jQuery.ajax({
                url : 'http://localhost:3000/elevTema/api/update/',
                method: 'put',
                dataType : 'JSON',
                data: {idElev:idElev, idTema:idTema, link:link},
                success : (data) => {
                    return data;
                }

            })
}