let a = parseFloat(prompt("Introduce el valor de a:"));
let b = parseFloat(prompt("Introduce el valor de b:"));
let c = parseFloat(prompt("Introduce el valor de c:"));

let mas_menos = Math.pow(b, 2) - 4 * a * c;

if (mas_menos < 0) 
    {
        document.getElementById("salida").innerHTML = "La ecuación no tiene soluciones reales.";
    } 
else 
    {
        let x1 = (-b + Math.sqrt(mas_menos)) / (2 * a);
        let x2 = (-b - Math.sqrt(mas_menos)) / (2 * a);

        document.getElementById("salida").innerHTML = "Las soluciones son:<br> x₁ = " + x1.toFixed(2) + "<br> x₂ = " + x2.toFixed(2);
    }
