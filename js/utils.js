function formatoMoneda(valor) {
  return "S/. " + valor.toFixed(2);
}

function hoyISO() {
  const hoy = new Date();
  return hoy.toISOString().split("T")[0];
}

// Función para normalizar métodos de pago
function normalizarMetodoPago(metodo) {
  if (!metodo) return "efectivo";

  const metodoLower = metodo.toLowerCase().trim();

  if (metodoLower === "efectivo" || metodoLower === "cash") {
    return "efectivo";
  } else if (metodoLower === "yape") {
    return "yape";
  } else if (
    metodoLower === "tarjeta" ||
    metodoLower === "card" ||
    metodoLower === "visa" ||
    metodoLower === "mastercard"
  ) {
    return "tarjeta";
  } else {
    // Si no reconoce el método, por defecto efectivo
    return "efectivo";
  }
}

// Función para formatear fecha y hora para mostrar
function formatearFechaHora(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Función para validar entrada numérica
function validarNumero(valor) {
  const numero = parseFloat(valor);
  return !isNaN(numero) && numero > 0 ? numero : 0;
}
