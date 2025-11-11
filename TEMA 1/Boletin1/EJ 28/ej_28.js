let suma = 0;
let promedio = 0;

for (let i = 1; i <= 5; i++) {
  let altura = parseFloat(prompt("Introduce la altura " + i + ":"));
  suma += altura;
}

promedio = suma / 5;

document.getElementById("salida").innerHTML = "La altura promedio es " + promedio;
