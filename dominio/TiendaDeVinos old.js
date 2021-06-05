// NOTAS IMPORTANTES:
// - No se puede modificar el ID.
// - No se puede ingresar vinos con ID repetidos.
// - El código deberá incluir comentarios.

// ESTADISTICAS:
// 1. Mostrar el nombre de la bodega que tiene el vino más barato.
// 2. Mostrar el nombre de la cepa del vino más caro.
// 3. Dado el nombre de una cepa y una bodega mostrar cuantas hay en stock.
//      Se ingresa el nombre de la cepa se debe mostrar la cantidad que hay en stock.

var vinos = new Array()     // id, nombre, stock, precio, cepa, bodega.. <IMG>
                            // Se pide una bodega, desde ABM bodegas agregar vino a otras por ID,
                            // no se necesita duplicarlo, es necesario que no se dupliquen para
                            // seleccionarlo y mostrar todas las bodegas que lo tienen.


// Las ids de vinos que se utilizan o quedaron en desuso se almacenan aqui.
var ids = new Array()

// Las ids de vinos eliminadas se almacenan en este array, con el fin de que el usuario pueda
// volver a colocar un vino eliminado en una posicion anterior a la asignada automaticamente.
var deletedIds = new Array()


// Se declaran variables globales para ser utilizadas por diferentes funciones.
var Name = '';
var Price = 0;
var Cepa = '';
var Stock = 0;

// Funcion empleada para actualizar las variables globales de los datos que se ingresan en tabla.
function getDataWine() {
    Name = document.getElementById("nameWine").value;
    Price = parseInt(document.getElementById("priceWine").value);
    Cepa =  document.getElementById("cepaWine").value;
    Stock = parseInt(document.getElementById("stockWine").value);
}   


// Funcion de alta, llama a getDataWine() para actualizar datos y los coloca dentro del array vinos,
// colocando la siguiente ID que sigue en la lista.
function add() {
    getDataWine()
    Id = ids.length;
    ids.push(Id);

    if (verifyEmpty()) {
        alert('Faltan algunos datos a ingresar');
    } else {
        if (verifyInteger()) {
            alert('El precio y stock deben ser numeros.')
        } else {
            vinos.push({
                id      : Id,
                nombre  : Name,
                precio  : Price,
                cepa    : Cepa,
                stock   : Stock,
                bodegas : [undefined]
            })
            displayDataOnSelect()
            eraseDataOnTable()
        }
    }
}

// Esta funcion es empleada para verificar si el valor colocado dentro de las casillas de 
// precio y stock son realmente numeros.
function verifyInteger() {
    let p = document.getElementById("priceWine").value;
    let s = document.getElementById("stockWine").value;
    if (p != p * 2 / 2 || s != s * 2 / 2) {
        return true;
    } else {
        return false;
    }
}

function verifyOtherInteger(b) {
    if (b != b * 2 / 2) {
        return true;
    } else {
        return false;
    }
}


// Esta funcion sirve para validar que todos los valores estan llenos.
function verifyEmpty() {
    if (document.getElementById("nameWine").value  == "" ||
        document.getElementById("priceWine").value == "" ||
        document.getElementById("cepaWine").value  == "" ||
        document.getElementById("stockWine").value == "" )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function verifyRefillEmpty()
{
    if(document.getElementById('txtCantidadASumar').value == "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function verifyOtherEmpty(txt)
{
    if(txt == "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Funcion empleada para limpiar los datos colocados en la tabla.
function eraseDataOnTable() {
    document.getElementById("nameWine").value = "";
    document.getElementById("priceWine").value = "";
    document.getElementById("cepaWine").value = "";
    document.getElementById("stockWine").value = "";
    resetSelectedWineSellAndRefill()
}

// Funcion empleada para limpiar los datos colocados en el select.
function eraseDataOnSelect() {
    var data = document.getElementById("dbWine");
    data.innerHTML = "";
}

// Esta funcion muestra toda la base de datos de los vinos, dandole tambien un espaciado
// para que se vea mas esteticamente agradable y no tan complejo a la hora de leer.
function displayDataOnSelect() {
    var data = document.getElementById("dbWine");
    eraseDataOnSelect()

    // Definimos cual es el espacio que cada elemento va a ocupar.
    const spaId = 4
    const spaName = 30
    const spaPrice = 10
    const spaCepa = 30
    const spaStock = 10

    // Y los definimos para luego modificarlos.
    var ID = '';
    var NAME = '';
    var PRICE = '';
    var CEPA = '';
    var STOCK = '';
    var space = '\xa0'

    // Este bucle coloca junto a cada valor, una cantidad de espacios determinada.
    for (var i = 0; i < vinos.length; i++) {
        ID = vinos[i].id;
        NAME = vinos[i].nombre;
        PRICE = vinos[i].precio;
        CEPA = vinos[i].cepa;
        STOCK = vinos[i].stock;

        // ID SPACING
        ID = ID + space.repeat(spaId - ID.length)

        // NAME SPACING
        NAME = NAME + space.repeat(spaName - NAME.length)

        // PRICE SPACING
        PRICE = PRICE + space.repeat(spaPrice - PRICE.length)

        // CEPA SPACING
        CEPA = CEPA + space.repeat(spaCepa - CEPA.length)

        // STOCK SPACING
        STOCK = STOCK + space.repeat(spaStock - STOCK.length)

        var linea = document.createElement("option");
        linea.text = `${ID} | ${NAME} | ${PRICE} | ${CEPA} | ${STOCK}`
        // linea.text = ID + "  |  " + NAME + "  |  " + PRICE + "  |  " + CEPA + "  |  " + STOCK;
        data.add(linea);
        refreshRelateData()
    }
}

// Funcion que al ser llamada lee el elemento seleccionado, extrayendo el id, buscandolo en la
// base de datos y mostrando sos propiedades en la tabla.
function select() {
    eraseDataOnTable()

    var dataDisplayer = document.getElementById("dbWine");
    txt = dataDisplayer.options[dataDisplayer.selectedIndex].value;
    
    let id = ''

    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }

    // Esta funcion devuelve el indice del array en donde se encuentra el id requerido.
    var index = vinos.indexOf(vinos.find(vino => vino.id == id))

    document.getElementById("nameWine").value = vinos[index].nombre;
    document.getElementById("priceWine").value = vinos[index].precio;
    document.getElementById("cepaWine").value = vinos[index].cepa;
    document.getElementById("stockWine").value = vinos[index].stock;

    document.getElementById("selectedWineDisplayer").innerHTML = 'Vino: ' + vinos[index].nombre
    document.getElementById("selectedWineDisplayer2").innerHTML = 'Vino: ' + vinos[index].nombre
}

// Funcion que al ser llamada elimina el elemento seleccionado del array y la opcion del select.
function remove() {
    var dataDisplayer = document.getElementById("dbWine");

    // Guardamos la linea en una variable
    txt = dataDisplayer.options[dataDisplayer.selectedIndex].value;
    
    // Y luego es eliminada.
    dataDisplayer.remove[dataDisplayer.selectedIndex];
    
    // Extraemos el id del texto almacenado y posteriormente eliminado.
    let id = '';

    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }

    // Empleamos este metodo para almacenar los ids eliminados, por si se desea volver a emplearse.
    deletedIds.push(parseInt(id))
    
    // Esta funcion devuelve el indice del array en donde se encuentra el id requerido.
    var index = vinos.indexOf(vinos.find(vino => vino.id == id))

    // Eliminamos del array de vinos el elemento correspondiente a la opcion elegida.
    vinos.splice(index, 1);

    displayDataOnSelect()
    eraseDataOnTable()
    resetSelectedWineSellAndRefill()
}



function modify() {
    var dataDisplayer = document.getElementById("dbWine");

    // Guardamos la linea en una variable
    txt = dataDisplayer.options[dataDisplayer.selectedIndex].value;
    
    // Extraemos el id del texto almacenado y posteriormente eliminado.
    let id = '';

    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }
    
    // Esta funcion devuelve el indice del array en donde se encuentra el id requerido.
    var index = vinos.indexOf(vinos.find(vino => vino.id == id))

    getDataWine()

    if (verifyEmpty()) {
        alert('Faltan algunos datos a ingresar');
    } else {
        if (verifyInteger()) {
            alert('El precio y stock deben ser numeros.')
        } else {
            vinos[index] = ({
                id      : vinos[index].id,
                nombre  : Name,
                precio  : Price,
                cepa    : Cepa,
                stock   : Stock,
                bodegas : vinos[index].bodegas
            })
            displayDataOnSelect()
            eraseDataOnTable()
        }
    }
    resetSelectedWineSellAndRefill()
}

function resetSelectedWineSellAndRefill() {
    document.getElementById("selectedWineDisplayer").innerHTML = 'No hay seleccion'
    document.getElementById("selectedWineDisplayer2").innerHTML = 'No hay seleccion'
}

function sellWine()
{
    var cantidad = parseInt(document.getElementById('txtCantidadARestar').value); 
    var dataDisplayer = document.getElementById("dbWine");
    var txt = dataDisplayer.options[dataDisplayer.selectedIndex].value;
    
    let id = ''
    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }

    var index = vinos.indexOf(vinos.find(vino => vino.id == id))
    getDataWine()
    var newStock = Stock - cantidad

    if (verifyOtherEmpty(cantidad))
    {
        alert("Falta ingresar la cantidad a vender")
    }
    else
    {
        if(verifyOtherInteger(cantidad))
        {
            alert("La cantidad a vernder debe ser numerica")
        }
        else
        {
            vinos[index] = ({
                id      : vinos[index].id,
                nombre  : vinos[index].nombre,
                precio  : vinos[index].precio,
                cepa    : vinos[index].cepa,
                stock   : newStock,
                bodegas : vinos[index].bodegas
            })
            displayDataOnSelect()
            eraseDataOnTable()
        }
    }
    document.getElementById('txtCantidadARestar').value = ''
    resetSelectedWineSellAndRefill()
}

function refillWine() {
    var cantidad = parseInt(document.getElementById('txtCantidadASumar').value);
    var dataDisplayer = document.getElementById("dbWine");
    var txt = dataDisplayer.options[dataDisplayer.selectedIndex].value;
    
    let id = ''
    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }

    var index = vinos.indexOf(vinos.find(vino => vino.id == id))
    getDataWine()
    var newStock = Stock + cantidad

    if (verifyOtherEmpty(cantidad))
    {
        alert("No se registraron datos.")
    }
    else
    {
        if(verifyOtherInteger(cantidad))
        {
            alert("Solo se aceptan datos numericos.")
        }
        else
        {
            vinos[index] = ({
                id      : vinos[index].id,
                nombre  : vinos[index].nombre,
                precio  : vinos[index].precio,
                cepa    : vinos[index].cepa,
                stock   : newStock,
                bodegas : vinos[index].bodegas
            })
            displayDataOnSelect()
            eraseDataOnTable()
        }
    }
    document.getElementById('txtCantidadASumar').value = ''
    resetSelectedWineSellAndRefill()
}

function showDeletedIds() {
    var displayerDeletedIds = document.getElementById('displayerDeletedIds')
}

// function showAndHideStatistics() {
//     var statisticsBox = document.getElementById('statisticsBox')
//     if (statisticsBox.style.dispay == 'block') {
//         statisticsBox.style.dispay = 'none'
//     } else {
//         statisticsBox.style.dispay = 'block'
//     }
// }




// CODIGO DE CEPAS Y BODEGAS
// CODIGO DEFINITIVO
// NO MODIFICAR NO REFACTORIZAR

var bodegas = new Array() // id, nombre, telefono, localidad, idDeVinosContenidos, enUso
var idsBodegas = new Array() // Se guardan los ids utilizados en las bodegas.

var cepas = new Array() // id, nombre, enUso

var toValidate = new Array() // Almacena variables para verificar que no estan vacias.

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
        refreshRelateData()
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

function refreshRelateData() {
    var selectWine = document.getElementById('selectWine')
    var selectStore = document.getElementById('selectStore')

    selectWine.innerHTML = ''
    selectStore.innerHTML = ''

    // Wines
    for (var i = 0; i < vinos.length; i++) {
        var lineWines = document.createElement('option')
        lineWines.text = vinos[i].nombre
        selectWine.add(lineWines)
    }

    // Stores
    for (var i = 0; i < bodegas.length; i++) {
        var lineStores = document.createElement('option')
        lineStores.text = bodegas[i].nombre
        selectStore.add(lineStores)
    }
}

function relateWineStock() {
    refreshRelateData()

    var selectWine = document.getElementById('selectWine')
    var selectStore = document.getElementById('selectStore')
    var cantidadRelate = document.getElementById('cantidadRelate')
}



// ESTADISTICAS
// function getStatistics() {
    // Bodega con el vino mas barato


    // Cepa mas cara


// }