const carta = [
  {
    nombre: "Café Americano",
    categoria: "Café",
    opciones: [
      { tamaño: "8 oz", precio: 4.00 },
      { tamaño: "12 oz", precio: 5.00 },
      { tamaño: "16 oz", precio: 6.00 }
    ]
  },
  {
    nombre: "Latte",
    categoria: "Café",
    opciones: [
      { tamaño: "8 oz", precio: 5.50 },
      { tamaño: "12 oz", precio: 6.50 },
      { tamaño: "16 oz", precio: 7.50 }
    ]
  }
];

const STORAGE_KEY = "ventas_cafeteria";

function guardarVenta(venta) {
  const ventas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  ventas.push(venta);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ventas));
}

function obtenerVentas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function limpiarVentas() {
  localStorage.removeItem(STORAGE_KEY);
}