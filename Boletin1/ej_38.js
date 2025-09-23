let num = Number(prompt("Introduce el número"));
let numPrimo = true;

if (num <= 1)
    {
        numPrimo = false;
    }
else 
    {
        for (let i = 2; i <= num; i++)
        {
            if (num % 1 === 0)
                numPrimo = false;
        }
    }

if (numPrimo)
    {
        document.getElementById("salida").innerHTML = "El número " + num + " es número primo";
    }
else
    {
         document.getElementById("salida").innerHTML = "El número " + num + " NO es número primo";
    }
