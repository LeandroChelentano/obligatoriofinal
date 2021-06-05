// NOTAS IMPORTANTES:
// - No se puede modificar el ID.
// - No se puede ingresar vinos con ID repetidos.
// - El código deberá incluir comentarios.

// ESTADISTICAS:
// 1. Mostrar el nombre de la bodega que tiene el vino más barato.
// 2. Mostrar el nombre de la cepa del vino más caro.
// 3. Dado el nombre de una cepa y una bodega mostrar cuantas hay en stock.
//      Se ingresa el nombre de la cepa se debe mostrar la cantidad que hay en stock.
// 
// Para el extra del grupo de 3 extudiantes:
// 4. Dada una bodega, mostrar todas las cepas que tiene (en stock). Se mostrará la bodega y las cepas.
// 5. Dado una cepa mostrar las bodegas que venden dicha cepa.
//       - Se elige cepa y se mostra el nombre de las bodegas que tienen esta cepa en stock.

// Se puede experimentar con una suerte de alert() artificial cambiando la visibilidad de un <div>

var vinos = new Array()     // id, nombre, stock, precio, cepa, bodega.. <IMG>
                            // Se pide una bodega, desde ABM bodegas agregar vino a otras por ID,
                            // no se necesita duplicarlo, es necesario que no se dupliquen para
                            // seleccionarlo y mostrar todas las bodegas que lo tienen.


var bodegas = new Array()   // id, nombre, telefono, localidad, vinos

var cepas = ['Cabernet Sauvignon', 'Tanat', 'Malbec']

var ids = new Array()

var deletedIds = new Array()

var Name = '';
var Price = 0;
var Cepa = '';
var Stock = 0;

function getDataWine(){
    Name = document.getElementById("nameWine").value;
    Price = document.getElementById("priceWine").value;
    Cepa =  document.getElementById("cepaWine").value;
    Stock = document.getElementById("stockWine").value;
}   

function add() { // Alta
    getDataWine()
    Id = ids.length;
    ids.push(Id);

    if (noData()) {
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
        
            // alert(`works`)
            showDataSelect()
        }
    }
}

function verifyInteger() {
    let p = parseInt(document.getElementById("priceWine").value);
    let s = parseInt(document.getElementById("stockWine").value);
    if (p != p * 2 / 2 || s != s * 2 / 2) {
        return true;
    } else {
        return false;
    }
}

function noData(){
    if (document.getElementById("nameWine").value  == "" ||
        document.getElementById("priceWine").value == "" ||
        document.getElementById("cepaWine").value  == "" ||
        document.getElementById("stockWine").value == "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function clean() {
    document.getElementById("nameWine").value  = "";
    document.getElementById("priceWine").value = "";
    document.getElementById("cepaWine").value  = "";
    document.getElementById("stockWine").value = "";
}

function clearDataSelect() {
    var data = document.getElementById("dbWine");
    data.innerHTML = "";
}

function showDataSelect()
{
    var data = document.getElementById("dbWine");
    clearDataSelect()

    const spaId = 4
    const spaName = 30
    const spaPrice = 10
    const spaCepa = 30
    const spaStock = 10

    for (var i = 0; i < vinos.length; i++) {
        let ID = vinos[i].id;
        let NAME = vinos[i].nombre;
        let PRICE = vinos[i].precio;
        let CEPA = vinos[i].cepa;
        let STOCK = vinos[i].stock;

        // ID SPACING
        for (i = 0; i < (spaId - ID.length); i++) {
            ID = ID + '\xa0'
        }

        // NAME SPACING
        for (i = 0; i < (spaName - NAME.length); i++) {
            NAME = NAME + '\xa0'
        }

        // PRICE SPACING
        for (i = 0; i < (spaPrice - PRICE.length); i++) {
            PRICE = PRICE + '\xa0'
        }

        // CEPA SPACING
        for (i = 0; i < (spaCepa - CEPA.length); i++) {
            CEPA = CEPA + '\xa0'
        }

        // STOCK SPACING
        for (i = 0; i < (spaStock - STOCK.length); i++) {
            STOCK = STOCK + '\xa0'
        }





        var linea = document.createElement("option");
        // linea.text = `${ID} | ${NAME} | ${PRICE} | ${CEPA} | ${STOCK}`
        linea.text = ID + "  |  " + NAME + "  |  " + PRICE + "  |  " + CEPA + "  |  " + STOCK;
        data.add(linea);
    }
}

function select() {
    clean()

    var sel = document.getElementById("dbWine");
    txt = sel.options[sel.selectedIndex].value;
    
    let id = ''

    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }
    /*alert(`
    ${txt}
    ${id}
    `)*/
    document.getElementById("nameWine").value = vinos[id].nombre;
    document.getElementById("priceWine").value = vinos[id].precio;
    document.getElementById("cepaWine").value = vinos[id].cepa;
    document.getElementById("stockWine").value = vinos[id].stock;
}

function remove() {
    var sel = document.getElementById("dbWine");
    txt = sel.options[sel.selectedIndex].value;
    deletedIds.push(txt)
    sel.remove[sel.selectedIndex];
       
    let id = '';

    for(i = 0; i < txt.length; i++){
        if(txt[i] != ' ') {
            id = id + txt[i]
        } else {
            i = 999;
        }
    }
    
    var index = vinos.indexOf(vinos.some(vinos => vinos.id = id))

    vinos.splice(index, 1);
}

function editWine()
{
    getDataWine()
}

