let contraseña = prompt("Introduzca la contraseña: ");

let longitudCorrecta = contraseña.length >= 8 && contraseña.length <= 16;
let tieneMayuscula = /[A-Z]/.test(contraseña);
let tieneMinuscula = /[a-z]/.test(contraseña);
let tieneDigito = /[0-9]/.test(contraseña);
let tieneEspecial = /[-_@#$%&]/.test(contraseña);

if (longitudCorrecta && tieneMayuscula && tieneMinuscula && tieneDigito && tieneEspecial)
    {
        document.getElementById("salida").innerHTML = "La contraseña es CORRECTA, cumple todos los requisitos.";
    }
else 
    {
        let mensaje = "La contraseña es INCORRECTA: <br>"; 

        if (!longitudCorrecta)
            {
                mensaje += " - La longitud tiene que ser entre 8-16 caracteres <br>"
            }
        if (!tieneMayuscula)
            {
                mensaje += " - Tiene que tener una mayúscula [A-Z] <br>"
            }
        if (!tieneMinuscula)
            {
                mensaje += " - Tiene que tener una minúscula [a-z] <br>"
            }
        if (!tieneDigito)
            {
                mensaje += " - Tiene que tener un dígito [0-9] <br>"
            }
        if (!tieneEspecial)
            {
                mensaje += " - Tiene que tener un carácter especial [-_@#$%&] <br>"
            }
        
        document.getElementById("salida").innerHTML = mensaje;    
    }