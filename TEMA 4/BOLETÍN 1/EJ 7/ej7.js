const sumar = (...numeros) => {
    return numeros.reduce((num, suma) => num + 2 * suma, 10);
}

console.log (sumar(1,2,3,4,10));