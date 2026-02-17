

const btn = document.getElementById("theme-toggle");

// 1) Al cargar la página, miro si hay preferencia guardada
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  btn.textContent = "☀️ Modo Claro";
} else {
  // Si es "light" o no hay nada guardado, dejamos modo claro por defecto
  document.body.classList.remove("dark-mode");
  btn.textContent = "🌙 Modo Oscuro";
}

// 2) Al pulsar el botón, alterno el modo y guardo preferencia
btn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");

  if (isDark) {
    btn.textContent = "☀️ Modo Claro";
    localStorage.setItem("theme", "dark");
  } else {
    btn.textContent = "🌙 Modo Oscuro";
    localStorage.setItem("theme", "light");
  }
});
