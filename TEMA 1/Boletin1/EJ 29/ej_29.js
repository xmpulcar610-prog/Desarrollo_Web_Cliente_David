let contador_sueldo1 = 0; // Sueldos entre 100 y 300
let contador_sueldo2 = 0; // Sueldos mayores a 300
let suma_sueldos = 0;

for (let trabajador = 1; trabajador <= 5; trabajador++) {
  let sueldo = parseFloat(prompt("Introduce el sueldo del trabajador " + trabajador + ":"));

    if (sueldo >= 100 && sueldo <= 500) 
        {
            suma_sueldos += sueldo;
            if (sueldo <= 300) 
                {
                    contador_sueldo1++;
                } 
            else 
                {
                    contador_sueldo2++;
                }
        } 
    else 
        {
            document.getElementById("salida1").innerHTML= "El sueldo debe estar entre 100 y 500. Vuelve a intentarlo.";
            trabajador--;
        }
}

document.getElementById("salida1").innerHTML= "Empleados que cobran entre 100 y 300 euros: " + contador_sueldo1;
document.getElementById("salida2").innerHTML= "Empleados que cobran más de 300 euros: " + contador_sueldo2;
document.getElementById("salida3").innerHTML= "Gasto total en sueldos: " + suma_sueldos + " €";
