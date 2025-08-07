document.addEventListener("DOMContentLoaded", () => {
  cargarProductosVenta();
});

function cargarProductosVenta() {
  const contenedor = document.getElementById("formulario");
  contenedor.innerHTML = "";

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Selecciona un producto";
  titulo.style.textAlign = "center";
  titulo.style.marginBottom = "1.5rem";
  contenedor.appendChild(titulo);

  // Obtener carta dinámica (esto era lo que faltaba)
  const cartaActual = obtenerCarta();
  const categorias = obtenerCategorias();

  // Si no hay productos
  if (cartaActual.length === 0) {
    const mensaje = document.createElement("div");
    mensaje.style.cssText = `
      text-align: center;
      color: #be185d;
      padding: 2rem;
      background: linear-gradient(135deg, #fdf2f8, #fce7f3);
      border-radius: 15px;
      border: 2px dashed #f9a8d4;
      margin: 2rem 0;
    `;
    mensaje.innerHTML = "🌸 No hay productos disponibles.";
    contenedor.appendChild(mensaje);
    return;
  }

  // Mostrar productos organizados por categoría
  categorias.forEach((categoria) => {
    const productosCategoria = obtenerProductosPorCategoria(categoria);

    if (productosCategoria.length === 0) return;

    // Título de la categoría con icono
    const tituloCategoria = document.createElement("div");
    tituloCategoria.style.cssText = `
      background: linear-gradient(135deg, #fdf2f8, #fce7f3);
      border: 2px solid #f9a8d4;
      border-radius: 15px;
      padding: 1rem;
      margin: 2rem 0 1rem 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);
    `;

    // Usar el icono del primer producto de esta categoría
    const iconoCategoria = productosCategoria[0].icono || "🌸";
    tituloCategoria.innerHTML = `
      <h3 style="color: #be185d; margin: 0; font-size: 1.3rem;">
        ${iconoCategoria} ${categoria}
      </h3>
      <p style="color: #9d174d; margin: 0.5rem 0 0 0; font-size: 0.9rem;">
        ${productosCategoria.length} productos
      </p>
    `;
    contenedor.appendChild(tituloCategoria);

    // Grid de productos de esta categoría
    const gridProductos = document.createElement("div");
    gridProductos.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    `;

    productosCategoria.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.style.marginBottom = "1rem";

      const icono = producto.icono || iconoCategoria;
      const productoTitulo = document.createElement("h4");
      productoTitulo.innerHTML = `${icono} ${producto.nombre} <span style='color: #f9a8d4; font-size: 0.8rem; font-weight: normal;'>(${producto.categoria})</span>`;
      div.appendChild(productoTitulo);

      const opcionesContainer = document.createElement("div");
      opcionesContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.5rem;
        margin-top: 1rem;
      `;

      producto.opciones.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.textContent = `${opcion.tamaño} - S/. ${opcion.precio.toFixed(2)}`;
        btn.style.cssText = `
          width: 100%;
          min-height: 50px;
          padding: 0.8rem;
          border-radius: 10px;
        `;
        btn.onclick = () => mostrarModalPago(producto, opcion);
        opcionesContainer.appendChild(btn);
      });

      div.appendChild(opcionesContainer);
      gridProductos.appendChild(div);
    });

    contenedor.appendChild(gridProductos);
  });
}

function mostrarModalPago(producto, opcion) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(253, 242, 248, 0.9), rgba(251, 207, 232, 0.9));
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(253, 242, 248, 0.9));
    border: 2px solid rgba(248, 187, 217, 0.3);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(190, 24, 93, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
    backdrop-filter: blur(10px);
    max-height: 90vh;
    overflow-y: auto;
  `;

  const icono = producto.icono || "🌸";
  modal.innerHTML = `
    <h3 style="color: #be185d; margin-bottom: 1rem;">Confirmar Venta</h3>
    <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 1px solid #f9a8d4; padding: 1rem; border-radius: 15px; margin-bottom: 1.5rem;">
      <p><strong>${icono} ${producto.nombre}</strong></p>
      <p>Tamaño: ${opcion.tamaño}</p>
      <p style="font-size: 1.2rem; color: #be185d;"><strong>Total: S/. ${opcion.precio.toFixed(2)}</strong></p>
    </div>
    <p style="margin-bottom: 1rem; color: #9d174d;">¿Método de pago?</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.8rem; margin-bottom: 1.5rem;">
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'efectivo')"
              style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 1rem; border-radius: 15px; cursor: pointer; font-weight: 600;">
        💵 Efectivo
      </button>
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'yape')"
              style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); color: #be185d; border: 2px solid #c084fc; padding: 1rem; border-radius: 15px; cursor: pointer; font-weight: 600;">
        📱 Yape
      </button>
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'tarjeta')"
              style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #be185d; border: 2px solid #fbbf24; padding: 1rem; border-radius: 15px; cursor: pointer; font-weight: 600;">
        💳 Tarjeta
      </button>
    </div>
    <button onclick="cerrarModal()" style="background: linear-gradient(135deg, #f8bbd9, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 0.8rem 1.5rem; border-radius: 20px; cursor: pointer; font-weight: 600;">
      ✕ Cancelar
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  window.cerrarModal = () => {
    document.body.removeChild(overlay);
    delete window.cerrarModal;
    delete window.procesarVenta;
  };

  window.procesarVenta = (nombreProducto, tamaño, precio, metodo) => {
    try {
      const metodoNormalizado = normalizarMetodoPago(metodo);
      const precioValidado = validarNumero(precio);

      const venta = {
        producto: nombreProducto,
        tamaño: tamaño,
        precio: precioValidado,
        metodo: metodoNormalizado,
        fecha: new Date().toISOString(),
      };

      guardarVenta(venta);

      modal.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🌸</div>
          <h3 style="color: #be185d; margin-bottom: 1rem;">¡Venta Registrada!</h3>
          <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 2px solid #f9a8d4; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
            <p style="color: #be185d; font-weight: 600;"><strong>${icono} ${nombreProducto}</strong> - ${tamaño}</p>
            <p style="color: #be185d;">Método: ${metodoNormalizado.charAt(0).toUpperCase() + metodoNormalizado.slice(1)}</p>
            <p style="font-size: 1.3rem; color: #be185d; font-weight: bold;">S/. ${precioValidado.toFixed(2)}</p>
          </div>
          <button onclick="cerrarModal()" style="background: linear-gradient(135deg, #f9a8d4, #be185d); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
            ✨ Continuar
          </button>
        </div>
      `;

      setTimeout(() => {
        if (document.body.contains(overlay)) {
          cerrarModal();
        }
      }, 2000);
    } catch (error) {
      alert("Error al procesar la venta: " + error.message);
    }
  };

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      cerrarModal();
    }
  });
}
