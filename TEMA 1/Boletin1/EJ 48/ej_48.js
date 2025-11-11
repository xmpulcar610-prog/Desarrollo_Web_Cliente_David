let suma = 0;
let resta = 0;
let division = 0;
let multiplicacion = 0;

function sumaNumeros()
    {
        const num1 = Number(frmNum.num1.value);
        const num2 = Number(frmNum.num2.value);

        suma = num1 + num2;

        document.getElementById("salida").innerHTML = "La suma de los 2 números es " +suma;
    }

function restaNumeros()
    {
        const num1 = Number(frmNum.num1.value);
        const num2 = Number(frmNum.num2.value);

        resta = num1 - num2;

        document.getElementById("salida").innerHTML = "La resta de los 2 números es " +resta;
    }

function multiplicacionNumeros()
    {
        const num1 = Number(frmNum.num1.value);
        const num2 = Number(frmNum.num2.value);

        multiplicacion = num1 * num2;

        document.getElementById("salida").innerHTML = "La multiplicacion de los 2 números es " +multiplicacion;
    }

function divisionNumeros()
    {
        const num1 = Number(frmNum.num1.value);
        const num2 = Number(frmNum.num2.value);

        division = num1 / num2;

        document.getElementById("salida").innerHTML = "La division de los 2 números es " +division;
    }