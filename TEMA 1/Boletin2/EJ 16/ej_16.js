let intervalo = setTimeout(() => 
    {
        fecha = new Date();
        document.getElementById("salida").innerHTML= fecha;
        clearInterval(intervalo); 
    }, 20000);
