let mayores = 0;
let menores = 0;

for (let i = 1; i <= 5; i++) {
  let nota = parseFloat(prompt("Introduce la nota del alumno " + i + ":"));

  if (nota >= 7) {
    mayores++;
  } else {
    menores++;
  }
}

document.getElementById("salida1").innerHTML = "Cantidad de alumnos con nota mayor o igual a 7: " + mayores;
document.getElementById("salida2").innerHTML = "Cantidad de alumnos con nota menor a 7: " + menores;
