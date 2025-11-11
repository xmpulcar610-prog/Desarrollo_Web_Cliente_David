function mostrarDatos() {
      let nombre = document.getElementById("nombre").value;
      let edad = document.getElementById("edad").value;
      
      document.getElementById("resultado").innerHTML = "Tu nombre es: " + nombre + "<br>Tu edad es: " + edad + " años";
    }