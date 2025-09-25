function esPrimo (num)
{
    if (num < 2) 
        return false;
    for (let i = 2; i <= Math.sqrt(num); i++)
    {
        if (num % i === 0) 
            return false; 
    }
    return true;
}
let contador = 0;
let numero = 2;

while (contador < 100)
{
    if (esPrimo(numero))
    {
        console.log(numero);
        contador++;
    }
    numero++;
}
