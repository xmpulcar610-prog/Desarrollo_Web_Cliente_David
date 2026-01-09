const ToogleButton = texto => ({
  tag: "button",
  type: "button",
  className: "toggle-btn",
  textContent: texto,
  attributes: { "aria-pressed": "false" },
  onClick: () => "¡Click! (simulado)"
});
