formulario.boton.addEventListener("click", mostrarDatos);

function mostrarDatos()
    {
        let texto = formulario.provincias.options[formulario.provincias.selectedIndex].text;
        let value = formulario.provincias.options[formulario.provincias.selectedIndex].value;
        document.getElementById("salida").innerHTML = ("Provincia: "+texto+ " - Valor: " +value);
    }