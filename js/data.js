// Carta completa y dinámica de la cafetería
const carta = [
  // ☕ BEBIDAS CALIENTES
  {
    nombre: "Espresso",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "Simple - 8 oz", precio: 10.0 },
      { tamaño: "Doble - 12 oz", precio: 12.50 },
    ],
  },
  {
    nombre: "Americano",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "8 oz", precio: 10.0 },
      { tamaño: "12 oz", precio: 11.50 },
      { tamaño: "16 oz", precio: 14.0 },
    ],
  },
  {
    nombre: "Affogato",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "8 oz", precio: 13.0 },
    ],
  },
  {
    nombre: "Latte",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "8 oz", precio: 12.50 },
      { tamaño: "12 oz", precio: 14.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Cappuccino",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "8 oz", precio: 12.50 },
      { tamaño: "12 oz", precio: 14.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Caramel Machiato",
    categoria: "Bebidas Calientes",
    icono: "☕",
    opciones: [
      { tamaño: "8 oz", precio: 13.50 },
      { tamaño: "12 oz", precio: 15.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Moka Latte",
    categoria: "Bebidas Calientes",
    icono: "🍵",
    opciones: [
      { tamaño: "8 oz", precio: 13.0 },
      { tamaño: "12 oz", precio: 15.0 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Caramel Capuccino",
    categoria: "Bebidas Calientes",
    icono: "🍵",
    opciones: [
      { tamaño: "8 oz", precio: 13.50 },
      { tamaño: "12 oz", precio: 15.00 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "White Choco Canela",
    categoria: "Bebidas Calientes",
    icono: "🍵",
    opciones: [
      { tamaño: "8 oz", precio: 13.50 },
      { tamaño: "12 oz", precio: 15.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },

  // 🧊 BEBIDAS FRÍAS
  {
    nombre: "Mojito",
    categoria: "Bebidas Frías",
    icono: "🧊",
    opciones: [
      { tamaño: "8 oz", precio: 13.00 },
      { tamaño: "12 oz", precio: 14.50 },
      { tamaño: "16 oz", precio: 15.50 },
    ],
  },
  {
    nombre: "Blue Mojito",
    categoria: "Bebidas Frías",
    icono: "🧊",
    opciones: [
      { tamaño: "8 oz", precio: 13.50 },
      { tamaño: "12 oz", precio: 15.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Curazao",
    categoria: "Bebidas Frías",
    icono: "🧊",
    opciones: [
      { tamaño: "8 oz", precio: 14.00 },
      { tamaño: "12 oz", precio: 15.50 },
      { tamaño: "16 oz", precio: 16.50 },
    ],
  },
  {
    nombre: "Snow Flake",
    categoria: "Bebidas Frías con café",
    icono: "🥤",
    opciones: [
      { tamaño: "8 oz", precio: 14.00 },
      { tamaño: "12 oz", precio: 16.00 },
      { tamaño: "16 oz", precio: 17.00 },
    ],
  },
  {
    nombre: "Susurro de Caramelo",
    categoria: "Bebidas Frías con café",
    icono: "🥤",
    opciones: [
      { tamaño: "8 oz", precio: 14.50 },
      { tamaño: "12 oz", precio: 16.50 },
      { tamaño: "16 oz", precio: 17.50 },
    ],
  },
  {
    nombre: "Nube de Caramelo",
    categoria: "Bebidas Frías con café",
    icono: "🥤",
    opciones: [
      { tamaño: "8 oz", precio: 15.00 },
      { tamaño: "12 oz", precio: 16.50 },
      { tamaño: "16 oz", precio: 17.50 },
    ],
  },

  // 🍰 POSTRES
  {
    nombre: "Cuchareable de chocolate",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Porcion", precio: 12.50 }],
  },
  {
    nombre: "Cupcake de chocolate",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Porcion", precio: 5.50 }],
  },
  {
    nombre: "Cupcake red velvet",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Porcion", precio: 5.50 }],
  },
  {
    nombre: "Galletas con chispas chocolate",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Unidad", precio: 4.00 }],
  },
  {
    nombre: "Waffles",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Unidad", precio: 10.00 }],
  },
  {
    nombre: "Cuchareable de chocofresa",
    categoria: "Postres",
    icono: "🍰",
    opciones: [{ tamaño: "Porcion", precio: 12.00 }],
  },

  // 🧃 JUGOS
  {
    nombre: "Fresa",
    categoria: "Jugos",
    icono: "🧃",
    opciones: [
      { tamaño: "12 oz", precio: 10.00 },
      { tamaño: "16 oz", precio: 15.50 },
    ] 
  },
  {
    nombre: "Mango",
    categoria: "Jugos",
    icono: "🧃",
    opciones: [
      { tamaño: "12 oz", precio: 10.00 },
      { tamaño: "16 oz", precio: 15.50 },
    ] 
  },
  {
    nombre: "Piña",
    categoria: "Jugos",
    icono: "🧃",
    opciones: [
      { tamaño: "12 oz", precio: 10.00 },
      { tamaño: "16 oz", precio: 13.00 },
    ] 
  },
  {
    nombre: "Arándano",
    categoria: "Jugos",
    icono: "🧃",
    opciones: [
      { tamaño: "12 oz", precio: 11.00 },
      { tamaño: "16 oz", precio: 14.00 },
    ] 
  },
  {
    nombre: "Melón",
    categoria: "Jugos",
    icono: "🧃",
    opciones: [
      { tamaño: "12 oz", precio: 10.00 },
      { tamaño: "16 oz", precio: 13.00 },
    ] 
  },
  

  // 🥪 PANES
  {
    nombre: "Queso",
    categoria: "Panes",
    icono: "🥪",
    opciones: [{ tamaño: "Completo", precio: 12.0 }],
  },
  {
    nombre: "Queso con cabanossi",
    categoria: "Panes",
    icono: "🥪",
    opciones: [{ tamaño: "Completo", precio: 10.5 }],
  },
  {
    nombre: "Queso, jamón y orégano",
    categoria: "Panes",
    icono: "🥪",
    opciones: [{ tamaño: "Completo", precio: 10.5 }],
  },
  {
    nombre: "Aceituna",
    categoria: "Panes",
    icono: "🥪",
    opciones: [{ tamaño: "Completo", precio: 8.5 }],
  },
];

// Funciones para gestionar la carta dinámicamente
const CARTA_STORAGE_KEY = "carta_cafeteria";
const STORAGE_KEY = "ventas_cafeteria";

// Función para cargar carta desde localStorage o usar la predeterminada
function obtenerCarta() {
  const cartaGuardada = localStorage.getItem(CARTA_STORAGE_KEY);
  if (cartaGuardada) {
    try {
      return JSON.parse(cartaGuardada);
    } catch (error) {
      console.warn(
        "Error al cargar carta guardada, usando carta predeterminada",
      );
      return carta;
    }
  }
  return carta;
}

// Función para guardar carta personalizada
function guardarCarta(cartaPersonalizada) {
  localStorage.setItem(CARTA_STORAGE_KEY, JSON.stringify(cartaPersonalizada));
}

// Función para restaurar carta original
function restaurarCartaOriginal() {
  localStorage.removeItem(CARTA_STORAGE_KEY);
  return carta;
}

// Función para agregar nuevo producto
function agregarProducto(producto) {
  const cartaActual = obtenerCarta();
  cartaActual.push(producto);
  guardarCarta(cartaActual);
  return cartaActual;
}

// Función para eliminar producto por nombre
function eliminarProducto(nombreProducto) {
  const cartaActual = obtenerCarta();
  const cartaFiltrada = cartaActual.filter((p) => p.nombre !== nombreProducto);
  guardarCarta(cartaFiltrada);
  return cartaFiltrada;
}

// Función para actualizar producto existente
function actualizarProducto(nombreOriginal, productoActualizado) {
  const cartaActual = obtenerCarta();
  const indice = cartaActual.findIndex((p) => p.nombre === nombreOriginal);
  if (indice !== -1) {
    cartaActual[indice] = productoActualizado;
    guardarCarta(cartaActual);
  }
  return cartaActual;
}

// Función para obtener productos por categoría
function obtenerProductosPorCategoria(categoria) {
  const cartaActual = obtenerCarta();
  return cartaActual.filter((p) => p.categoria === categoria);
}

// Función para obtener todas las categorías únicas
function obtenerCategorias() {
  const cartaActual = obtenerCarta();
  const categorias = [...new Set(cartaActual.map((p) => p.categoria))];
  return categorias.sort();
}

// Función para buscar productos por nombre
function buscarProductos(termino) {
  const cartaActual = obtenerCarta();
  const terminoLower = termino.toLowerCase();
  return cartaActual.filter(
    (p) =>
      p.nombre.toLowerCase().includes(terminoLower) ||
      p.categoria.toLowerCase().includes(terminoLower),
  );
}

// Funciones originales para ventas
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

// Función para exportar carta a JSON
function exportarCarta() {
  const cartaActual = obtenerCarta();
  const dataStr = JSON.stringify(cartaActual, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "carta_cafeteria.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

// Función para importar carta desde archivo JSON
function importarCarta(archivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const cartaImportada = JSON.parse(e.target.result);
        if (Array.isArray(cartaImportada)) {
          guardarCarta(cartaImportada);
          resolve(cartaImportada);
        } else {
          reject(new Error("El archivo no contiene una carta válida"));
        }
      } catch (error) {
        reject(new Error("Error al leer el archivo JSON"));
      }
    };
    reader.readAsText(archivo);
  });
}

// Asegurar que la carta inicial se use si no hay nada guardado
if (!localStorage.getItem(CARTA_STORAGE_KEY)) {
  console.log("Inicializando carta predeterminada");
}
