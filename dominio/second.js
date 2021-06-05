var bodegas = new Array() // id, nombre, telefono, localidad, idDeVinosContenidos
var idsBodegas = new Array() // Se guardan los ids utilizados en las bodegas.

var cepas = new Array() // id, nombre

var toValidate = new Array()

var NOMBRE = '';
var TELEFONO = '';
var LOCALIDAD = '';

function refreshData() {
    NOMBRE = document.getElementById('nombreBodega').value
    TELEFONO = document.getElementById('telefonoBodega').value
    LOCALIDAD = document.getElementById('localidadBodega').value
}

function validateEmpty() {
    let sthWrong = 0
    for (var i = 0; i < toValidate.length; i++) {
        if (toValidate[i] == '') {
            sthWrong++
        }
    }
    toValidate.splice(0, toValidate.length)
    if (sthWrong > 0) {
        return true
    } else {
        return false
    }
}

function clearBodegasTable() {
    document.getElementById('nombreBodega').value = ''
    document.getElementById('telefonoBodega').value = ''
    document.getElementById('localidadBodega').value = ''
}

function showData() {
    var displayerBodegas = document.getElementById('dbBodegas')
    displayerBodegas.innerHTML = ''

    // Definimos cual es el espacio que cada elemento va a ocupar.
    const spaId = 4
    const spaName = 30
    const spaPhone = 15
    const spaLocation = 30
    // const spaWines = 20

    // Y los definimos para luego modificarlos.
    var ID = '';
    var NAME = '';
    var PHONE = '';
    var LOCATION = '';
    // var WINES = '';
    var space = '\xa0'

    // Este bucle coloca junto a cada valor, una cantidad de espacios determinada.
    for (var i = 0; i < bodegas.length; i++) {
        ID = bodegas[i].id;
        NAME = bodegas[i].nombre;
        PHONE = bodegas[i].telefono;
        LOCATION= bodegas[i].localidad;
        // WINES = bodegas[i].stock;

        // ID SPACING
        ID = ID + space.repeat(spaId - ID.length)

        // NAME SPACING
        NAME = NAME + space.repeat(spaName - NAME.length)

        // PHONE SPACING
        PHONE = PHONE + space.repeat(spaPhone - PHONE.length)

        // LOCATION SPACING
        LOCATION = LOCATION + space.repeat(spaLocation - LOCATION.length)

        // WINES SPACING
        // WINES = WINES + space.repeat(spaWines - WINES.length)

        var line = document.createElement("option");
        line.text = `${ID} | ${NAME} | ${PHONE} | ${LOCATION}`// | ${STOCK}`
        displayerBodegas.add(line);
    }
}

function addBodegas() {
    refreshData()
    toValidate.splice(0, 0, NOMBRE, TELEFONO, LOCALIDAD)
    if (validateEmpty()) {
        alert('Hay elementos vacios.')
    } else {
        newId = idsBodegas.length;
        idsBodegas.push(newId)

        bodegas.push({
            id:              newId,
            nombre:          NOMBRE,
            telefono:        TELEFONO,
            localidad:       LOCALIDAD,
            vinosContenidos: [undefined],
            enUso: 0
        })
        clearBodegasTable()
        showData()
    }
}

function bodegasSelection() {
    var displayerBodegas = document.getElementById('dbBodegas')
    var selection = displayerBodegas.selectedIndex

    document.getElementById('nombreBodega').value = bodegas[selection].nombre
    document.getElementById('telefonoBodega').value = bodegas[selection].telefono
    document.getElementById('localidadBodega').value = bodegas[selection].localidad
}

function modifyBodegas() {
    var displayerBodegas = document.getElementById('dbBodegas')
    var selection = displayerBodegas.selectedIndex
    refreshData()

    toValidate.splice(0, 0, NOMBRE, TELEFONO, LOCALIDAD)
    if (validateEmpty()) {
        alert('Hay elementos vacios.')
    } else {
        bodegas[selection] = ({
            id: bodegas[selection].id,
            nombre: NOMBRE,
            telefono: TELEFONO,
            localidad: LOCALIDAD,
            vinosContenidos: bodegas[selection].vinosContenidos,
            enUso: bodegas[selection].enUso
        })
    }
    clearBodegasTable()
    showData()
}

function removeBodega() {
    var displayerBodegas = document.getElementById('dbBodegas')
    var selection = displayerBodegas.selectedIndex

    if (bodegas[selection].enUso > 0) {
        alert('No se puede eliminar una bodega que contiene vinos.')
    } else {
        bodegas.splice(selection, 1)

        showData()
        clearBodegasTable()
    }
}

////////////////////////////////

var NAME_CEPA = '';

var idsCepas = new Array();

function refreshCepa() {
    NAME_CEPA = document.getElementById('tblNombreCepa').value
}

function addCepa() {
    refreshCepa()

    nextId = idsCepas.length
    idsCepas.push(nextId)

    toValidate.splice(0, 0, NAME_CEPA)
    if (validateEmpty()) {
        alert('El elemento se encuentra vacio.')
    } else {
        cepas.push({
            id: nextId,
            nombre: NAME_CEPA,
            enUso: 0
        })
    }
    clearCepasTable()
    showCepas()
}

function showCepas() {
    var displayerCepas = document.getElementById('dbCepas')
    displayerCepas.innerHTML = ''

    // Definimos cual es el espacio que cada elemento va a ocupar.
    const spaId = 4
    const spaName = 30

    // Y los definimos para luego modificarlos.
    var ID = '';
    var NAME = '';

    var space = '\xa0'

    // Este bucle coloca junto a cada valor, una cantidad de espacios determinada.
    for (var i = 0; i < cepas.length; i++) {
        ID = cepas[i].id;
        NAME = cepas[i].nombre;

        // ID SPACING
        ID = ID + space.repeat(spaId - ID.length)

        // NAME SPACING
        NAME = NAME + space.repeat(spaName - NAME.length)

        var line = document.createElement("option");
        line.text = `${ID} | ${NAME}`
        displayerCepas.add(line);
    }
}

function clearCepasTable() {
    document.getElementById('tblNombreCepa').value = ''
}

function selectCepa() {
    var index = document.getElementById('dbCepas').selectedIndex
    document.getElementById('tblNombreCepa').value = cepas[index].nombre
}

function removeCepa() {
    var index = document.getElementById('dbCepas').selectedIndex
    
    if (cepas[index].enUso > 0) {
        alert('No se puede eliminar una cepa en uso.')
    } else {
        cepas.splice(index, 1)
        clearCepasTable()
        showCepas()
    }
}

function modifyCepa() {
    var index = document.getElementById('dbCepas').selectedIndex

    refreshCepa()

    toValidate.splice(0, 0, NAME_CEPA)
    if (validateEmpty()) {
        alert('El elemento se encuentra vacio.')
    } else {
        cepas[index] = ({
            id: cepas[index].id,
            nombre: NAME_CEPA,
            enUso: cepas[index].enUso
        })
    }
    clearCepasTable()
    showCepas()
}