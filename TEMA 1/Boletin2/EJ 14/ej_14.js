let a = "   "
let array = ["manzana", " pera", " platano", " sandia"]

array.forEach(espaciado)

document.getElementById("salida1").innerHTML = "Este es el array original: " +array;
document.getElementById("salida2").innerHTML = "Este es el array en líneas distintas: <br>" +a;

function espaciado(item)
    {
        a += item + "<br>";
    }   