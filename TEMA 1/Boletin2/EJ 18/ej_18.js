let primosPalindromos = [];

function esPrimo(n) 
    {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let d = 3; d * d <= n; d += 2) 
            {
                if (n % d === 0) return false;
            }
        return true;
    }

function esPalindromo(n) 
    {
        const s = String(n);

        for (let i = 0, j = s.length - 1; i < j; i++, j--) 
            {
                if (s[i] !== s[j]) return false;
            }
        return true;
    }

for (let n = 2; n <= 100000; n++) 
    {
        if (esPrimo(n) && esPalindromo(n)) 
            {
                primosPalindromos.push(n);
            }
    }

document.getElementById("salida1").innerHTML = "Cantidad de primos palíndromos entre 1 y 100000: " + primosPalindromos.length;

document.getElementById("salida2").innerHTML = "Listado: " + primosPalindromos.join(", ");
